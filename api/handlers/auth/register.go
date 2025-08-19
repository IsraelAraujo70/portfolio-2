package auth

import (
	"log"
	"os"
	"portfolio-api/config"
	"portfolio-api/models"
	"portfolio-api/utils"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

var validate = validator.New()

// Register cria uma nova conta de usuário
// @Summary Registrar novo usuário
// @Description Cria uma nova conta de usuário para contato do portfólio
// @Tags auth
// @Accept json
// @Produce json
// @Param user body models.CreateUserRequest true "Dados do usuário"
// @Success 201 {object} models.LoginResponse "Usuário criado com sucesso"
// @Failure 400 {object} map[string]string "Dados inválidos"
// @Failure 409 {object} map[string]string "Email já existe"
// @Failure 500 {object} map[string]string "Erro interno"
// @Router /api/auth/register [post]
func Register(c *fiber.Ctx) error {
	var request models.CreateUserRequest

	if err := c.BodyParser(&request); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	// Validar dados de entrada
	if err := validate.Struct(request); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Validation failed",
			"details": err.Error(),
		})
	}

	// Verificar se email já existe
	var existingUser models.User
	if err := config.DB.Where("email = ?", request.Email).First(&existingUser).Error; err == nil {
		return c.Status(409).JSON(fiber.Map{
			"error": "Email already exists",
		})
	}

	// Hash da senha
	hashedPassword, err := utils.HashPassword(request.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to process password",
		})
	}

	// Verificar código admin e definir role
	adminCode := os.Getenv("ADMIN_REGISTRATION_CODE")
	role := "user" // Padrão sempre user
	
	// Se código admin foi fornecido e está correto
	if request.AdminCode != "" && request.AdminCode == adminCode && adminCode != "" {
		role = "admin"
		log.Printf("SECURITY: Admin account created for email: %s", request.Email)
	}

	// Criar usuário
	user := models.User{
		Name:     request.Name,
		Email:    request.Email,
		Password: hashedPassword,
		Role:     role,
	}

	if err := config.DB.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}

	// Gerar token JWT
	token, err := utils.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.Status(201).JSON(models.LoginResponse{
		User:  user.ToResponse(),
		Token: token,
	})
}