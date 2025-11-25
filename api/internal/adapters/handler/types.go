package handler

import "time"

// LoginInput defines the login request body
type LoginInput struct {
	Body struct {
		Email    string `json:"email" doc:"User email address" example:"user@example.com"`
		Password string `json:"password" doc:"User password" example:"secret"`
	}
}

// LoginOutput defines the login response
type LoginOutput struct {
	Body struct {
		Token string       `json:"token" doc:"JWT Token"`
		User  UserResponse `json:"user"`
	}
}

// RegisterInput defines the registration request body
type RegisterInput struct {
	Body struct {
		Name      string `json:"name" minLength:"2" maxLength:"100" doc:"User full name"`
		Email     string `json:"email" format:"email" doc:"User email"`
		Password  string `json:"password" minLength:"6" doc:"User password"`
		AdminCode string `json:"admin_code,omitempty" doc:"Code for admin registration"`
	}
}

// UserResponse defines the public user data
type UserResponse struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// ChangePasswordInput defines the password change request
type ChangePasswordInput struct {
	Body struct {
		CurrentPassword string `json:"current_password"`
		NewPassword     string `json:"new_password" minLength:"6"`
	}
}

// CreateUserInput (Admin)
type CreateUserInput struct {
	Body struct {
		Name  string `json:"name" minLength:"2" maxLength:"100"`
		Email string `json:"email" format:"email"`
	}
}

// UpdateUserInput
type UpdateUserInput struct {
	Body struct {
		Name  string `json:"name,omitempty" minLength:"2" maxLength:"100"`
		Email string `json:"email,omitempty" format:"email"`
	}
}
