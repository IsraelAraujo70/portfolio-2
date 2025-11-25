package auth

import (
	"portfolio-api/config"
	"portfolio-api/models"
	"portfolio-api/utils"

	"github.com/gofiber/fiber/v2"
)

// Login autentica um usuário existente
// @Summary Login de usuário
// @Description Autentica usuário e retorna token JWT
// @Tags auth
// @Accept json
// @Produce json
// @Param credentials body models.LoginRequest true "Credenciais de login"
// @Success 200 {object} models.LoginResponse "Login realizado com sucesso"
// @Failure 400 {object} map[string]string "Dados inválidos"
// @Failure 401 {object} map[string]string "Credenciais inválidas"
// @Failure 500 {object} map[string]string "Erro interno"
// @Router /api/auth/login [post]
func Login(c *fiber.Ctx) error {
	var request models.LoginRequest

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

	// Buscar usuário por email
	var user models.User
	if err := config.DB.Where("email = ?", request.Email).First(&user).Error; err != nil {
		return c.Status(401).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Verificar senha
	if !utils.CheckPassword(request.Password, user.Password) {
		return c.Status(401).JSON(fiber.Map{
			"error": "Invalid credentials",
		})
	}

	// Gerar token JWT
	token, err := utils.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.JSON(models.LoginResponse{
		User:  user.ToResponse(),
		Token: token,
	})
}