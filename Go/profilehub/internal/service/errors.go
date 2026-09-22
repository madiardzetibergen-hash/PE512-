package service

import "errors"

var(
	ErrInvalidInput = errors.New("invalid input")
	ErrEmailTaken = errors.New("email already exists")
	ErrInvalidCredentials = errors.New("invalid email or password")
	ErrProfileExists = errors.New("profile already exists")
	ErrProfileNotFound = errors.New("profile not found")
	ErrUsernameTaken = errors.New("username already exists")
)
