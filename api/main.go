package main

import (
	"fmt"
	"log"
	"os"

	"portfolio-api/internal/adapters/handler"
	"portfolio-api/internal/adapters/repository"
	"portfolio-api/internal/adapters/security"
	"portfolio-api/internal/core/services"

	"github.com/danielgtaylor/huma/v2"
	"github.com/danielgtaylor/huma/v2/adapters/humafiber"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// 1. Infrastructure (Database)
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=portfolio port=5432 sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: gormlogger.Default.LogMode(gormlogger.Info),
	})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto Migrate
	// Note: Using golang-migrate for production-grade migrations
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("Failed to get underlying sql.DB:", err)
	}

	if err := repository.RunMigrations(sqlDB, "postgres"); err != nil {
		log.Fatal("Failed to run migrations:", err)
	}

	// 2. Adapters (Driven)
	userRepo := repository.NewPostgresUserRepository(db)
	securityService := security.NewSecurityService()

	// 3. Core Services (Driving Ports implementation)
	userService := services.NewUserService(userRepo, securityService)

	// 4. Framework (Fiber)
	app := fiber.New(fiber.Config{
		DisableStartupMessage: true,
	})

	app.Use(logger.New())
	app.Use(cors.New())

	// 5. API Adapter (Huma)
	config := huma.DefaultConfig("Portfolio API", "1.0.0")
	config.Components.SecuritySchemes = map[string]*huma.SecurityScheme{
		"bearer": {
			Type:         "http",
			Scheme:       "bearer",
			BearerFormat: "JWT",
		},
	}

	api := humafiber.New(app, config)

	// 6. Middlewares
	api.UseMiddleware(handler.AuthMiddleware(api))

	// 7. Handlers (Driving Adapters)
	h := handler.NewHTTPHandler(userService, securityService)
	h.RegisterRoutes(api)

	// Start
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on port %s\n", port)
	fmt.Printf("OpenAPI: http://localhost:%s/docs\n", port)
	log.Fatal(app.Listen(":" + port))
}
