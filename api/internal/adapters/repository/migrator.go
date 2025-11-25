package repository

import (
	"database/sql"
	"errors"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

// RunMigrations executes the database migrations using golang-migrate
func RunMigrations(db *sql.DB, databaseName string) error {
	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return fmt.Errorf("could not create the postgres driver: %w", err)
	}

	// Point to the migrations folder
	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		databaseName,
		driver,
	)
	if err != nil {
		return fmt.Errorf("could not create the migrate instance: %w", err)
	}

	if err := m.Up(); err != nil {
		if errors.Is(err, migrate.ErrNoChange) {
			log.Println("Database migrations: No changes to apply.")
			return nil
		}
		return fmt.Errorf("could not run up migrations: %w", err)
	}

	log.Println("Database migrations applied successfully!")
	return nil
}
