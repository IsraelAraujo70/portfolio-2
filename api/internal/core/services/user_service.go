package services

import (
	"context"
	"errors"
	"log"
	"os"

	"portfolio-api/internal/core/domain"
	"portfolio-api/internal/core/ports"
)

type UserService struct {
	repo     ports.UserRepository
	security ports.SecurityService
}

func NewUserService(repo ports.UserRepository, security ports.SecurityService) ports.UserService {
	return &UserService{
		repo:     repo,
		security: security,
	}
}

func (s *UserService) Register(ctx context.Context, name, email, password, adminCode string) (*domain.User, string, error) {
	// Check if user exists
	existing, _ := s.repo.GetByEmail(ctx, email)
	if existing != nil {
		return nil, "", errors.New("email already exists")
	}

	// Hash password
	hashedPassword, err := s.security.HashPassword(password)
	if err != nil {
		return nil, "", err
	}

	// Determine role
	role := domain.RoleUser
	envAdminCode := os.Getenv("ADMIN_REGISTRATION_CODE")
	if adminCode != "" && adminCode == envAdminCode && envAdminCode != "" {
		role = domain.RoleAdmin
		log.Printf("SECURITY: Admin account created for email: %s", email)
	}

	user := domain.NewUser(name, email, hashedPassword, role)

	if err := s.repo.Create(ctx, user); err != nil {
		return nil, "", err
	}

	// Generate Token
	token, err := s.security.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		// Rollback? For now just return error, user created but no token.
		return user, "", errors.New("user created but failed to generate token")
	}

	return user, token, nil
}

func (s *UserService) Login(ctx context.Context, email, password string) (*domain.User, string, error) {
	user, err := s.repo.GetByEmail(ctx, email)
	if err != nil {
		return nil, "", errors.New("invalid credentials")
	}

	if !s.security.CheckPassword(password, user.Password) {
		return nil, "", errors.New("invalid credentials")
	}

	token, err := s.security.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		return nil, "", err
	}

	return user, token, nil
}

func (s *UserService) GetUser(ctx context.Context, id uint) (*domain.User, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *UserService) ListUsers(ctx context.Context) ([]domain.User, error) {
	return s.repo.List(ctx)
}

func (s *UserService) UpdateUser(ctx context.Context, id uint, name, email string) (*domain.User, error) {
	user, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if name != "" {
		user.Name = name
	}
	if email != "" {
		user.Email = email
	}

	if err := s.repo.Update(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) ChangePassword(ctx context.Context, id uint, currentPassword, newPassword string) error {
	user, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return err
	}

	if !s.security.CheckPassword(currentPassword, user.Password) {
		return errors.New("current password is incorrect")
	}

	hashedPassword, err := s.security.HashPassword(newPassword)
	if err != nil {
		return err
	}

	user.Password = hashedPassword
	return s.repo.Update(ctx, user)
}

func (s *UserService) DeleteUser(ctx context.Context, id uint) error {
	// Check existence
	_, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return err
	}
	return s.repo.Delete(ctx, id)
}
