package routes

import (
	"portfolio-api/handlers/auth"
	"portfolio-api/handlers/users"
	"portfolio-api/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

// SetupRoutes configura todas as rotas da API
// @title Portfolio API
// @version 1.0
// @description API para sistema de contato do portfólio
// @host localhost:8080
// @BasePath /api
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func SetupRoutes(app *fiber.App) {
	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(middleware.CORS())

	// Health check endpoint
	// @Summary Health check
	// @Description Verifica se a API está funcionando
	// @Tags health
	// @Produce json
	// @Success 200 {object} map[string]string
	// @Router /health [get]
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "ok",
			"message": "API is running",
		})
	})

	api := app.Group("/api")

	// Rotas de autenticação (públicas)
	authRoutes := api.Group("/auth")
	authRoutes.Post("/register", auth.Register)
	authRoutes.Post("/login", auth.Login)

	// Rotas de autenticação (protegidas)
	authProtected := api.Group("/auth", middleware.Protected())
	authProtected.Get("/me", auth.Me)
	authProtected.Put("/change-password", auth.ChangePassword)

	// Rotas de usuários (protegidas)
	usersGroup := api.Group("/users", middleware.Protected())
	usersGroup.Get("/", users.GetUsers)
	usersGroup.Post("/", middleware.AdminOnly(), users.CreateUser)
	usersGroup.Get("/:id", users.GetUser)
	usersGroup.Put("/:id", users.UpdateUser)
	usersGroup.Delete("/:id", middleware.AdminOnly(), users.DeleteUser)
}