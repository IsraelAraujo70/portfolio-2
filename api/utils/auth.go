package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// JWTClaims representa as claims do JWT
type JWTClaims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// HashPassword gera um hash seguro da senha usando bcrypt
// @param password string - Senha em texto plano
// @return string - Hash da senha
// @return error - Erro caso haja falha no processo
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// CheckPassword verifica se a senha fornecida corresponde ao hash
// @param password string - Senha em texto plano
// @param hash string - Hash armazenado no banco
// @return bool - true se a senha for válida
func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// GenerateJWT cria um token JWT para o usuário
// @param userID uint - ID do usuário
// @param email string - Email do usuário
// @param role string - Role do usuário (admin/user)
// @return string - Token JWT
// @return error - Erro caso haja falha na geração
func GenerateJWT(userID uint, email, role string) (string, error) {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "your-secret-key" // Default para desenvolvimento
	}

	claims := JWTClaims{
		UserID: userID,
		Email:  email,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)), // 24 horas
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   email,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtSecret))
}