package repository

import (
	"database/sql"
	"errors"
	"profilehub/internal/model"
)

type ProfileRepository struct {
	db *sql.DB
}

func NewProfileRepository(db *sql.DB) *ProfileRepository {
	return &ProfileRepository{
		db: db,
	}
}

// Create создает новый профиль для пользователя
func (r *ProfileRepository) Create(p *model.Profile) (int64, error) {
	query := `
	INSERT INTO profile (user_id, name, username, bio, city, avatar_url)
	VALUES ($1, $2, $3, $4, $5, $6)
	RETURNING id
	`

	var id int64

	err := r.db.QueryRow(
		query,
		p.UserID,
		p.Name,
		p.Username,
		p.Bio,
		p.City,
		p.AvatarURL,
	).Scan(&id)

	if err != nil {
		return 0, checkConflict(err) // Используем вашу обертку для ошибок
	}

	return id, nil
}

// GetByUserID находит профиль по ID пользователя
func (r *ProfileRepository) GetByUserID(userID int64) (*model.Profile, error) {
	query := `
	SELECT id, user_id, name, username, bio, city, avatar_url, created_at, updated_at
	FROM profile
	WHERE user_id = $1
	`

	var profile model.Profile

	err := r.db.QueryRow(query, userID).Scan(
		&profile.ID,
		&profile.UserID,
		&profile.Name,
		&profile.Username,
		&profile.Bio,
		&profile.City,
		&profile.AvatarURL,
	
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil // Профиль не найден
		}
		return nil, err
	}

	return &profile, nil
}

// Update обновляет данные существующего профиля
func (r *ProfileRepository) Update(p *model.Profile) error {
	query := `
	UPDATE profile
	SET name = $1, username = $2, bio = $3, city = $4, avatar_url = $5, updated_at = CURRENT_TIMESTAMP
	WHERE user_id = $6
	`

	result, err := r.db.Exec(
		query,
		p.Name,
		p.Username,
		p.Bio,
		p.City,
		p.AvatarURL,
		p.UserID,
	)

	if err != nil {
		return checkConflict(err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

// Delete удаляет профиль пользователя
func (r *ProfileRepository) Delete(userID int64) error {
	query := `
	DELETE FROM profile
	WHERE user_id = $1
	`

	_, err := r.db.Exec(query, userID)
	if err != nil {
		return err
	}

	return nil
}