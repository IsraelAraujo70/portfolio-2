package ports

import (
	"context"
	"portfolio-api/internal/core/domain"
)

// UserRepository defines the interface for user persistence
type UserRepository interface {
	Create(ctx context.Context, user *domain.User) error
	GetByID(ctx context.Context, id uint) (*domain.User, error)
	GetByEmail(ctx context.Context, email string) (*domain.User, error)
	List(ctx context.Context) ([]domain.User, error)
	Update(ctx context.Context, user *domain.User) error
	Delete(ctx context.Context, id uint) error
}

// SecurityService defines the interface for password hashing and token generation
// This is a Driven port (implemented by adapters or utils)
type SecurityService interface {
	HashPassword(password string) (string, error)
	CheckPassword(password, hash string) bool
	GenerateJWT(userID uint, email string, role domain.Role) (string, error)
}

// UserService defines the interface for user business logic
// This is a Driving port
type UserService interface {
	Register(ctx context.Context, name, email, password, adminCode string) (*domain.User, string, error)
	Login(ctx context.Context, email, password string) (*domain.User, string, error)
	GetUser(ctx context.Context, id uint) (*domain.User, error)
	ListUsers(ctx context.Context) ([]domain.User, error)
	UpdateUser(ctx context.Context, id uint, name, email string) (*domain.User, error)
	ChangePassword(ctx context.Context, id uint, currentPassword, newPassword string) error
	DeleteUser(ctx context.Context, id uint) error
}
