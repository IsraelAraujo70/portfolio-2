package users

import (
	"portfolio-api/config"
	"portfolio-api/models"

	"github.com/gofiber/fiber/v2"
)

func GetUsers(c *fiber.Ctx) error {
	var users []models.User
	
	result := config.DB.Find(&users)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to fetch users",
		})
	}

	return c.JSON(fiber.Map{
		"data":    users,
		"message": "Users retrieved successfully",
	})
}