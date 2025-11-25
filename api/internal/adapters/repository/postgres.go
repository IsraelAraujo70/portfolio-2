package repository

import (
	"context"
	"errors"
	"time"

	"portfolio-api/internal/core/domain"
	"portfolio-api/internal/core/ports"

	"gorm.io/gorm"
)

// UserGorm represents the database schema for users
type UserGorm struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"not null"`
	Email     string `gorm:"unique;not null"`
	Password  string `gorm:"not null"`
	Role      string `gorm:"default:user"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

// TableName overrides the table name
func (UserGorm) TableName() string {
	return "users"
}

// toDomain converts Gorm model to Domain entity
func (u *UserGorm) toDomain() *domain.User {
	var deletedAt *time.Time
	if u.DeletedAt.Valid {
		deletedAt = &u.DeletedAt.Time
	}
	return &domain.User{
		ID:        u.ID,
		Name:      u.Name,
		Email:     u.Email,
		Password:  u.Password,
		Role:      domain.Role(u.Role),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
		DeletedAt: deletedAt,
	}
}

// fromDomain converts Domain entity to Gorm model
func fromDomain(u *domain.User) *UserGorm {
	var deletedAt gorm.DeletedAt
	if u.DeletedAt != nil {
		deletedAt = gorm.DeletedAt{Time: *u.DeletedAt, Valid: true}
	}
	return &UserGorm{
		ID:        u.ID,
		Name:      u.Name,
		Email:     u.Email,
		Password:  u.Password,
		Role:      string(u.Role),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
		DeletedAt: deletedAt,
	}
}

type PostgresUserRepository struct {
	db *gorm.DB
}

func NewPostgresUserRepository(db *gorm.DB) ports.UserRepository {
	return &PostgresUserRepository{db: db}
}

func (r *PostgresUserRepository) Create(ctx context.Context, user *domain.User) error {
	userGorm := fromDomain(user)
	result := r.db.WithContext(ctx).Create(userGorm)
	if result.Error != nil {
		return result.Error
	}
	user.ID = userGorm.ID
	return nil
}

func (r *PostgresUserRepository) GetByID(ctx context.Context, id uint) (*domain.User, error) {
	var userGorm UserGorm
	result := r.db.WithContext(ctx).First(&userGorm, id)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, result.Error
	}
	return userGorm.toDomain(), nil
}

func (r *PostgresUserRepository) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	var userGorm UserGorm
	result := r.db.WithContext(ctx).Where("email = ?", email).First(&userGorm)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, result.Error
	}
	return userGorm.toDomain(), nil
}

func (r *PostgresUserRepository) List(ctx context.Context) ([]domain.User, error) {
	var usersGorm []UserGorm
	result := r.db.WithContext(ctx).Find(&usersGorm)
	if result.Error != nil {
		return nil, result.Error
	}

	users := make([]domain.User, len(usersGorm))
	for i, u := range usersGorm {
		users[i] = *u.toDomain()
	}
	return users, nil
}

func (r *PostgresUserRepository) Update(ctx context.Context, user *domain.User) error {
	userGorm := fromDomain(user)
	result := r.db.WithContext(ctx).Save(userGorm)
	return result.Error
}

func (r *PostgresUserRepository) Delete(ctx context.Context, id uint) error {
	result := r.db.WithContext(ctx).Delete(&UserGorm{}, id)
	return result.Error
}
