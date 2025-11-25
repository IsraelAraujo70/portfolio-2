package users

import (
	"portfolio-api/config"
	"portfolio-api/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func DeleteUser(c *fiber.Ctx) error {
	id := c.Params("id")
	userId, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid user ID",
		})
	}

	var user models.User
	result := config.DB.First(&user, userId)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"error": "User not found",
		})
	}

	result = config.DB.Delete(&user)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to delete user",
		})
	}

	return c.JSON(fiber.Map{
		"message": "User deleted successfully",
	})
}