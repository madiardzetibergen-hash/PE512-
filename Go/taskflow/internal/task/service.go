package task

import (
	"errors"
	"strings"
	"time"
)

type TaskService struct {
	repository *TaskRepository
}

func NewTaskService(repository *TaskRepository) *TaskService {
	return &TaskService{
		repository: repository,
	}
}

func (s *TaskService) GetByID(id int) (Task, error) {
	task, found := s.repository.GetById(id)
	if !found {
		return Task{}, errors.New("task not found")
	}
	return task, nil
}

func (s *TaskService) Create(input CreateTaskRequest) (Task, error) {
	title := strings.TrimSpace(input.Title)

	if title == "" {
		return Task{}, errors.New("title is required")
	}
	if !isValidPriority(input.Priority) {
		return Task{}, errors.New("invalid priority")
	}

	now := time.Now()

	task := Task{
		Title:       title,
		Description: input.Description,
		Status:      "TODO",
		Priority:    input.Priority,
		CreatedAt:   now,
		UpdatedAt:   now,
	}
	return s.repository.Create(task), nil
}

func (s *TaskService) Update(id int, input UpdateTaskRequest) (Task, error) {
	existingTask, found := s.repository.GetById(id)
	if !found {
		return Task{}, errors.New("task not found")
	}

	title := strings.TrimSpace(input.Title)
	if title == "" {
		return Task{}, errors.New("title is required")
	}

	if !isValidPriority(input.Priority) {
		return Task{}, errors.New("invalid priority")
	}

	existingTask.Title = title
	existingTask.Description = input.Description
	existingTask.Priority = input.Priority
	existingTask.UpdatedAt = time.Now()

	updatedTask, ok := s.repository.Update(existingTask)
	if !ok {
		return Task{}, errors.New("task not found")
	}

	return updatedTask, nil
}

func (s *TaskService) UpdateStatus(id int, input UpdateTaskStatusRequest) (Task, error) {
	existingTask, found := s.repository.GetById(id)
	if !found {
		return Task{}, errors.New("task not found")
	}

	status := strings.TrimSpace(input.Status)
	if !isValidStatus(status) {
		return Task{}, errors.New("invalid status")
	}

	existingTask.Status = status
	existingTask.UpdatedAt = time.Now()

	updatedTask, ok := s.repository.Update(existingTask)
	if !ok {
		return Task{}, errors.New("task not found")
	}

	return updatedTask, nil
}

func (s *TaskService) Delete(id int) error {
	success := s.repository.Delete(id)
	if !success {
		return errors.New("task not found")
	}
	return nil
}

// Хелперы валидации

func isValidPriority(priority string) bool {
	return priority == "LOW" || priority == "MEDIUM" || priority == "HIGH"
}

func isValidStatus(status string) bool {
	return status == "TODO" || status == "IN_PROGRESS" || status == "DONE"
}