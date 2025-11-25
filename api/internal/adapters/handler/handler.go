package handler

import (
	"context"
	"net/http"
	"strconv"

	"portfolio-api/internal/core/domain"
	"portfolio-api/internal/core/ports"

	"github.com/danielgtaylor/huma/v2"
)

type HTTPHandler struct {
	service  ports.UserService
	security ports.SecurityService
}

func NewHTTPHandler(service ports.UserService, security ports.SecurityService) *HTTPHandler {
	return &HTTPHandler{
		service:  service,
		security: security,
	}
}

func (h *HTTPHandler) RegisterRoutes(api huma.API) {
	// Auth Routes
	huma.Register(api, huma.Operation{
		OperationID: "login",
		Method:      http.MethodPost,
		Path:        "/api/auth/login",
		Summary:     "User Login",
		Description: "Login with email and password to get a JWT token.",
		Tags:        []string{"Auth"},
	}, h.Login)

	huma.Register(api, huma.Operation{
		OperationID: "register",
		Method:      http.MethodPost,
		Path:        "/api/auth/register",
		Summary:     "Register User",
		Description: "Register a new user.",
		Tags:        []string{"Auth"},
	}, h.Register)

	// Protected Routes
	// We use a security scheme "bearer"

	huma.Register(api, huma.Operation{
		OperationID: "get-me",
		Method:      http.MethodGet,
		Path:        "/api/auth/me",
		Summary:     "Get Current User",
		Security:    []map[string][]string{{"bearer": {}}},
		Tags:        []string{"Auth"},
	}, h.GetMe)

	huma.Register(api, huma.Operation{
		OperationID: "change-password",
		Method:      http.MethodPut,
		Path:        "/api/auth/change-password",
		Summary:     "Change Password",
		Security:    []map[string][]string{{"bearer": {}}},
		Tags:        []string{"Auth"},
	}, h.ChangePassword)

	// Admin Routes
	huma.Register(api, huma.Operation{
		OperationID: "list-users",
		Method:      http.MethodGet,
		Path:        "/api/users",
		Summary:     "List Users",
		Security:    []map[string][]string{{"bearer": {}}},
		Tags:        []string{"Users"},
	}, h.ListUsers)

	huma.Register(api, huma.Operation{
		OperationID: "create-user",
		Method:      http.MethodPost,
		Path:        "/api/users",
		Summary:     "Create User",
		Security:    []map[string][]string{{"bearer": {}}},
		Tags:        []string{"Users"},
	}, h.CreateUser)

	huma.Register(api, huma.Operation{
		OperationID: "get-user",
		Method:      http.MethodGet,
		Path:        "/api/users/{id}",
		Summary:     "Get User",
		Security:    []map[string][]string{{"bearer": {}}},
		Tags:        []string{"Users"},
	}, h.GetUser)

	huma.Register(api, huma.Operation{
		OperationID: "update-user",
		Method:      http.MethodPut,
		Path:        "/api/users/{id}",
		Summary:     "Update User",
		Security:    []map[string][]string{{"bearer": {}}},
		Tags:        []string{"Users"},
	}, h.UpdateUser)

	huma.Register(api, huma.Operation{
		OperationID: "delete-user",
		Method:      http.MethodDelete,
		Path:        "/api/users/{id}",
		Summary:     "Delete User",
		Security:    []map[string][]string{{"bearer": {}}},
		Tags:        []string{"Users"},
	}, h.DeleteUser)
}

func (h *HTTPHandler) Login(ctx context.Context, input *LoginInput) (*LoginOutput, error) {
	user, token, err := h.service.Login(ctx, input.Body.Email, input.Body.Password)
	if err != nil {
		return nil, huma.Error401Unauthorized(err.Error())
	}

	return &LoginOutput{
		Body: struct {
			Token string       `json:"token" doc:"JWT Token"`
			User  UserResponse `json:"user"`
		}{
			Token: token,
			User:  toUserResponse(user),
		},
	}, nil
}

func (h *HTTPHandler) Register(ctx context.Context, input *RegisterInput) (*LoginOutput, error) {
	user, token, err := h.service.Register(ctx, input.Body.Name, input.Body.Email, input.Body.Password, input.Body.AdminCode)
	if err != nil {
		return nil, huma.Error400BadRequest(err.Error())
	}

	return &LoginOutput{
		Body: struct {
			Token string       `json:"token" doc:"JWT Token"`
			User  UserResponse `json:"user"`
		}{
			Token: token,
			User:  toUserResponse(user),
		},
	}, nil
}

// AuthContext contains the authenticated user ID and Role
// This assumes a middleware populates the context value "user"
// But Huma handles this differently if we use Security Schemes.
// For now, I'll implement a helper to get user from context assuming Fiber middleware ran before.
// OR I can use Huma's way. To keep it simple with Fiber + Huma, let's rely on Fiber's Locals which humafiber might not propagate to Context automatically?
// Huma docs say: context is passed through.
// Fiber's context is not `context.Context`. Huma adapter wraps it.
// We need to make sure the User info is available in `ctx`.
// I will implement a Security Helper function that Huma uses.

func (h *HTTPHandler) GetMe(ctx context.Context, input *struct{}) (*struct{ Body UserResponse }, error) {
	userID, ok := ctx.Value("user_id").(uint)
	if !ok {
		return nil, huma.Error401Unauthorized("Unauthorized")
	}

	user, err := h.service.GetUser(ctx, userID)
	if err != nil {
		return nil, huma.Error404NotFound("User not found")
	}

	return &struct{ Body UserResponse }{Body: toUserResponse(user)}, nil
}

func (h *HTTPHandler) ChangePassword(ctx context.Context, input *ChangePasswordInput) (*struct {
	Body struct {
		Message string `json:"message"`
	}
}, error) {
	userID, ok := ctx.Value("user_id").(uint)
	if !ok {
		return nil, huma.Error401Unauthorized("Unauthorized")
	}

	err := h.service.ChangePassword(ctx, userID, input.Body.CurrentPassword, input.Body.NewPassword)
	if err != nil {
		return nil, huma.Error400BadRequest(err.Error())
	}

	return &struct {
		Body struct {
			Message string `json:"message"`
		}
	}{
		Body: struct {
			Message string `json:"message"`
		}{Message: "Password changed successfully"},
	}, nil
}

// Admin Check Helper
func isAdmin(ctx context.Context) bool {
	role, ok := ctx.Value("user_role").(string)
	return ok && role == "admin"
}

func (h *HTTPHandler) ListUsers(ctx context.Context, input *struct{}) (*struct{ Body []UserResponse }, error) {
	if !isAdmin(ctx) {
		return nil, huma.Error403Forbidden("Admin access required")
	}

	users, err := h.service.ListUsers(ctx)
	if err != nil {
		return nil, huma.Error500InternalServerError(err.Error())
	}

	resp := make([]UserResponse, len(users))
	for i, u := range users {
		resp[i] = toUserResponse(&u)
	}

	return &struct{ Body []UserResponse }{Body: resp}, nil
}

func (h *HTTPHandler) CreateUser(ctx context.Context, input *CreateUserInput) (*struct{ Body UserResponse }, error) {
	if !isAdmin(ctx) {
		return nil, huma.Error403Forbidden("Admin access required")
	}

	// Password default? Or generated?
	// For now using a default "password123" or similar logic as previous
	// Actually previous CreateUser handler didn't set password! It likely failed or used empty string.
	// GORM model default?
	// Let's set a default password "changeMe123!"

	user, _, err := h.service.Register(ctx, input.Body.Name, input.Body.Email, "changeMe123!", "")
	if err != nil {
		return nil, huma.Error400BadRequest(err.Error())
	}

	return &struct{ Body UserResponse }{Body: toUserResponse(user)}, nil
}

func (h *HTTPHandler) GetUser(ctx context.Context, input *struct {
	ID string `path:"id"`
}) (*struct{ Body UserResponse }, error) {
	if !isAdmin(ctx) {
		return nil, huma.Error403Forbidden("Admin access required")
	}

	id, err := strconv.ParseUint(input.ID, 10, 32)
	if err != nil {
		return nil, huma.Error400BadRequest("Invalid ID")
	}

	user, err := h.service.GetUser(ctx, uint(id))
	if err != nil {
		return nil, huma.Error404NotFound(err.Error())
	}

	return &struct{ Body UserResponse }{Body: toUserResponse(user)}, nil
}

func (h *HTTPHandler) UpdateUser(ctx context.Context, input *struct {
	ID   string `path:"id"`
	Body UpdateUserInput
}) (*struct{ Body UserResponse }, error) {
	if !isAdmin(ctx) {
		return nil, huma.Error403Forbidden("Admin access required")
	}

	id, err := strconv.ParseUint(input.ID, 10, 32)
	if err != nil {
		return nil, huma.Error400BadRequest("Invalid ID")
	}

	user, err := h.service.UpdateUser(ctx, uint(id), input.Body.Body.Name, input.Body.Body.Email)
	if err != nil {
		return nil, huma.Error500InternalServerError(err.Error())
	}

	return &struct{ Body UserResponse }{Body: toUserResponse(user)}, nil
}

func (h *HTTPHandler) DeleteUser(ctx context.Context, input *struct {
	ID string `path:"id"`
}) (*struct{ Status int }, error) {
	if !isAdmin(ctx) {
		return nil, huma.Error403Forbidden("Admin access required")
	}

	id, err := strconv.ParseUint(input.ID, 10, 32)
	if err != nil {
		return nil, huma.Error400BadRequest("Invalid ID")
	}

	err = h.service.DeleteUser(ctx, uint(id))
	if err != nil {
		return nil, huma.Error500InternalServerError(err.Error())
	}

	return &struct{ Status int }{Status: 204}, nil
}

func toUserResponse(u *domain.User) UserResponse {
	return UserResponse{
		ID:        u.ID,
		Name:      u.Name,
		Email:     u.Email,
		Role:      string(u.Role),
		CreatedAt: u.CreatedAt,
		UpdatedAt: u.UpdatedAt,
	}
}
