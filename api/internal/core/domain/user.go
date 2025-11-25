package domain

import (
	"time"
)

// Role type for user roles
type Role string

const (
	RoleAdmin Role = "admin"
	RoleUser  Role = "user"
)

// User represents the domain entity for a user
type User struct {
	ID        uint
	Name      string
	Email     string
	Password  string
	Role      Role
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

// NewUser creates a new user instance
func NewUser(name, email, password string, role Role) *User {
	return &User{
		Name:      name,
		Email:     email,
		Password:  password,
		Role:      role,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}
