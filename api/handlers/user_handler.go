package handlers

import (
	"portfolio-api/config"
	"portfolio-api/models"
	"strconv"

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

func GetUser(c *fiber.Ctx) error {
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

	return c.JSON(fiber.Map{
		"data":    user,
		"message": "User retrieved successfully",
	})
}

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

func UpdateUser(c *fiber.Ctx) error {
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

	var request models.UpdateUserRequest
	if err := c.BodyParser(&request); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if request.Name != "" {
		user.Name = request.Name
	}
	if request.Email != "" {
		user.Email = request.Email
	}

	result = config.DB.Save(&user)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": "Failed to update user",
		})
	}

	return c.JSON(fiber.Map{
		"data":    user,
		"message": "User updated successfully",
	})
}

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