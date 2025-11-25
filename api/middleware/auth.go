package middleware

import (
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

// JWTClaims representa as claims customizadas do JWT
type JWTClaims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// Protected é um middleware que verifica se o usuário está autenticado
// Extrai o token JWT do header Authorization e valida
// @Security ApiKeyAuth
// @param Authorization header string true "Bearer token"
func Protected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(401).JSON(fiber.Map{
				"error": "Authorization header required",
			})
		}

		// Extrair token do formato "Bearer <token>"
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return c.Status(401).JSON(fiber.Map{
				"error": "Invalid authorization format. Use: Bearer <token>",
			})
		}

		tokenString := tokenParts[1]
		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			jwtSecret = "your-secret-key" // Default para desenvolvimento
		}

		// Parse e validar token
		token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(jwtSecret), nil
		})

		if err != nil {
			return c.Status(401).JSON(fiber.Map{
				"error": "Invalid token",
			})
		}

		if !token.Valid {
			return c.Status(401).JSON(fiber.Map{
				"error": "Token is not valid",
			})
		}

		// Extrair claims e adicionar ao contexto
		if claims, ok := token.Claims.(*JWTClaims); ok {
			c.Locals("user_id", claims.UserID)
			c.Locals("user_email", claims.Email)
			c.Locals("user_role", claims.Role)
		}

		return c.Next()
	}
}

// AdminOnly é um middleware que verifica se o usuário tem role de admin
// Deve ser usado após o middleware Protected
func AdminOnly() fiber.Handler {
	return func(c *fiber.Ctx) error {
		userRole := c.Locals("user_role")
		if userRole != "admin" {
			return c.Status(403).JSON(fiber.Map{
				"error": "Admin access required",
			})
		}
		return c.Next()
	}
}