package controller

import (
	"github.com/golang-jwt/jwt/v4"
)

func getIsAdmin(user *jwt.Token) bool {
	claims := user.Claims.(jwt.MapClaims)
	isAdmin := claims["admin"]

	return isAdmin == true
}
