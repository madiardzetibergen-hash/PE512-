package service

import (
	"database/sql"
	"errors"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"profilehub/internal/repository"
)


type AuthService struct {
	userRepository *repository.UserRepository
	jwtSecret      string
}

func NewAuthService(
	userRepository *repository.UserRepository,
	jwtSecret string,
) *AuthService {
	return &AuthService{
		userRepository: userRepository,
		jwtSecret:      jwtSecret,
	}
}

// Register хеширует пароль и создает нового пользователя
func (s *AuthService) Register(email, password string) (int64, error) {
	email = strings.ToLower(strings.TrimSpace(email))

	// Хешируем пароль
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	// Сохраняем пользователя в БД через репозиторий
	id, err := s.userRepository.Create(email, string(hashedPassword))
	if err != nil {
		return 0, err
	}

	return id, nil
}

// Login проверяет учетные данные и возвращает JWT токен
func (s *AuthService) Login(email, password string) (string, error) {
	email = strings.ToLower(strings.TrimSpace(email))

	// Ищем пользователя по email
	user, err := s.userRepository.FindEmail(email)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return "", ErrInvalidCredentials
		}
		return "", err
	}

	// Сравниваем переданный пароль с хешем из БД
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return "", ErrInvalidCredentials
	}

	// Генерируем токен
	token, err := s.GenerateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}

// GenerateToken создает JWT токен с user_id в claims
func (s *AuthService) GenerateToken(userID int64) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(), // Токен валиден 24 часа
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, err := token.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}