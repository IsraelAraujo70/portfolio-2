package services

import (
	"context"
	"testing"

	"portfolio-api/internal/core/domain"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// MockUserRepository
type MockUserRepository struct {
	mock.Mock
}

func (m *MockUserRepository) Create(ctx context.Context, user *domain.User) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func (m *MockUserRepository) GetByID(ctx context.Context, id uint) (*domain.User, error) {
	args := m.Called(ctx, id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.User), args.Error(1)
}

func (m *MockUserRepository) GetByEmail(ctx context.Context, email string) (*domain.User, error) {
	args := m.Called(ctx, email)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*domain.User), args.Error(1)
}

func (m *MockUserRepository) List(ctx context.Context) ([]domain.User, error) {
	args := m.Called(ctx)
	return args.Get(0).([]domain.User), args.Error(1)
}

func (m *MockUserRepository) Update(ctx context.Context, user *domain.User) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func (m *MockUserRepository) Delete(ctx context.Context, id uint) error {
	args := m.Called(ctx, id)
	return args.Error(0)
}

// MockSecurityService
type MockSecurityService struct {
	mock.Mock
}

func (m *MockSecurityService) HashPassword(password string) (string, error) {
	args := m.Called(password)
	return args.String(0), args.Error(1)
}

func (m *MockSecurityService) CheckPassword(password, hash string) bool {
	args := m.Called(password, hash)
	return args.Bool(0)
}

func (m *MockSecurityService) GenerateJWT(userID uint, email string, role domain.Role) (string, error) {
	args := m.Called(userID, email, role)
	return args.String(0), args.Error(1)
}

func TestUserService_Register(t *testing.T) {
	mockRepo := new(MockUserRepository)
	mockSecurity := new(MockSecurityService)
	service := NewUserService(mockRepo, mockSecurity)

	ctx := context.Background()
	name := "Test User"
	email := "test@example.com"
	password := "password123"
	hashedPassword := "hashed_password"
	token := "jwt_token"

	// Expectations
	mockRepo.On("GetByEmail", ctx, email).Return(nil, nil) // User not found (good)
	mockSecurity.On("HashPassword", password).Return(hashedPassword, nil)
	mockRepo.On("Create", ctx, mock.AnythingOfType("*domain.User")).Return(nil)
	mockSecurity.On("GenerateJWT", uint(0), email, domain.RoleUser).Return(token, nil)

	// Execute
	user, returnedToken, err := service.Register(ctx, name, email, password, "")

	// Assert
	assert.NoError(t, err)
	assert.NotNil(t, user)
	assert.Equal(t, token, returnedToken)
	assert.Equal(t, name, user.Name)
	assert.Equal(t, email, user.Email)
	assert.Equal(t, hashedPassword, user.Password)

	mockRepo.AssertExpectations(t)
	mockSecurity.AssertExpectations(t)
}
