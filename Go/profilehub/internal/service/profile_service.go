package service

import (
	"errors"
	"profilehub/internal/model"
	"profilehub/internal/repository"
)



type ProfileService struct {
	profileRepository *repository.ProfileRepository
}

func NewProfileService(profileRepository *repository.ProfileRepository) *ProfileService {
	return &ProfileService{
		profileRepository: profileRepository,
	}
}

// Create создает новый профиль пользователя
func (s *ProfileService) Create(userID int64, req *model.CreateProfileRequest) (int64, error) {
	profile := &model.Profile{
		UserID:    userID,
		Name:      req.Name,
		Username:  req.Username,
		Bio:       req.Bio,
		City:      req.City,
		AvatarURL: req.AvatarURL,
	}

	return s.profileRepository.Create(profile)
}

// Get получает профиль по ID пользователя
func (s *ProfileService) Get(userID int64) (*model.Profile, error) {
	profile, err := s.profileRepository.GetByUserID(userID)
	if err != nil {
		return nil, err
	}

	if profile == nil {
		return nil, ErrProfileNotFound
	}

	return profile, nil
}

// Update выполняет полное обновление профиля (перезаписывает все обязательные поля)
func (s *ProfileService) Update(userID int64, req *model.CreateProfileRequest) error {
	profile := &model.Profile{
		UserID:    userID,
		Name:      req.Name,
		Username:  req.Username,
		Bio:       req.Bio,
		City:      req.City,
		AvatarURL: req.AvatarURL,
	}

	return s.profileRepository.Update(profile)
}

// Patch выполняет частичное обновление профиля (обновляет только переданные поля)
func (s *ProfileService) Patch(userID int64, req *model.UpdateProfileRequest) error {
	// 1. Получаем текущие данные профиля
	existingProfile, err := s.Get(userID)
	if err != nil {
		return err // Вернет ErrProfileNotFound, если профиль не существует
	}

	// 2. Обновляем только те поля, которые были переданы в запросе (не nil)
	if req.Name != nil {
		existingProfile.Name = *req.Name
	}
	if req.Username != nil {
		existingProfile.Username = *req.Username
	}
	if req.Bio != nil {
		existingProfile.Bio = req.Bio
	}
	if req.City != nil {
		existingProfile.City = req.City
	}
	if req.AvatarURL != nil {
		existingProfile.AvatarURL = req.AvatarURL
	}

	// 3. Сохраняем изменения
	return s.profileRepository.Update(existingProfile)
}

// Delete удаляет профиль пользователя
func (s *ProfileService) Delete(userID int64) error {
	return s.profileRepository.Delete(userID)
}