package auth

import (
	"portfolio-api/config"
	"portfolio-api/models"
	"portfolio-api/utils"

	"github.com/gofiber/fiber/v2"
)

// Me retorna informações do usuário autenticado
// @Summary Obter perfil do usuário
// @Description Retorna informações do usuário autenticado
// @Tags auth
// @Produce json
// @Security ApiKeyAuth
// @Success 200 {object} models.UserResponse "Informações do usuário"
// @Failure 401 {object} map[string]string "Não autenticado"
// @Router /api/auth/me [get]
func Me(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)

	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	return c.JSON(user.ToResponse())
}

// ChangePassword altera a senha do usuário autenticado
// @Summary Alterar senha
// @Description Altera a senha do usuário autenticado
// @Tags auth
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param passwords body models.ChangePasswordRequest true "Senhas atual e nova"
// @Success 200 {object} map[string]string "Senha alterada com sucesso"
// @Failure 400 {object} map[string]string "Dados inválidos"
// @Failure 401 {object} map[string]string "Senha atual incorreta"
// @Failure 500 {object} map[string]string "Erro interno"
// @Router /api/auth/change-password [put]
func ChangePassword(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)

	var request models.ChangePasswordRequest
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

	// Buscar usuário
	var user models.User
	if err := config.DB.First(&user, userID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	// Verificar senha atual
	if !utils.CheckPassword(request.CurrentPassword, user.Password) {
		return c.Status(401).JSON(fiber.Map{
			"error": "Current password is incorrect",
		})
	}

	// Hash da nova senha
	hashedPassword, err := utils.HashPassword(request.NewPassword)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to process new password",
		})
	}

	// Atualizar senha
	if err := config.DB.Model(&user).Update("password", hashedPassword).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to update password",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Password changed successfully",
	})
}