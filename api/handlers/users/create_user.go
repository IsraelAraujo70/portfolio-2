package users

import (
	"portfolio-api/config"
	"portfolio-api/models"

	"github.com/gofiber/fiber/v2"
)

func CreateUser(c *fiber.Ctx) error {
	var request models.CreateUserRequest
	
	if err := c.BodyParser(&request); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	user := models.User{
		Name:  request.Name,
		Email: request.Email,
	}

	result := config.DB.Create(&user)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"data":    user,
		"message": "User created successfully",
	})
}