package models

import (
	"time"

	"gorm.io/gorm"
)

// User representa um usuário do sistema de contato do portfólio
// Este modelo é usado para armazenar informações de contato
// e permitir autenticação para área administrativa
type User struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	Name      string         `json:"name" gorm:"not null" validate:"required,min=2,max=100"`
	Email     string         `json:"email" gorm:"unique;not null" validate:"required,email"`
	Password  string         `json:"-" gorm:"not null" validate:"required,min=6"`
	Role      string         `json:"role" gorm:"default:user" validate:"omitempty,oneof=admin user"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`
}

// CreateUserRequest representa os dados necessários para criar um novo usuário
// Usado principalmente para registro de contatos no portfólio
type CreateUserRequest struct {
	Name     string `json:"name" validate:"required,min=2,max=100"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=6"`
	Role     string `json:"role,omitempty" validate:"omitempty,oneof=admin user"`
}

// LoginRequest representa os dados necessários para autenticação
type LoginRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// UpdateUserRequest representa os dados que podem ser atualizados
// A senha não é incluída aqui, deve ter endpoint separado
type UpdateUserRequest struct {
	Name  string `json:"name,omitempty" validate:"omitempty,min=2,max=100"`
	Email string `json:"email,omitempty" validate:"omitempty,email"`
	Role  string `json:"role,omitempty" validate:"omitempty,oneof=admin user"`
}

// ChangePasswordRequest representa os dados para alterar senha
type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password" validate:"required"`
	NewPassword     string `json:"new_password" validate:"required,min=6"`
}

// UserResponse representa a resposta da API sem dados sensíveis
type UserResponse struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// LoginResponse representa a resposta após login bem-sucedido
type LoginResponse struct {
	User  UserResponse `json:"user"`
	Token string       `json:"token"`
}

// ToResponse converte User para UserResponse (sem dados sensíveis)
func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:        u.ID,
		Name:      u.Name,
		Email:     u.Email,
		Role:      u.Role,
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}