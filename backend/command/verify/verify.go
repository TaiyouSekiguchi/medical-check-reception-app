package main

import (
	"fmt"
	"os"

	"golang.org/x/crypto/bcrypt"
)

func main() {

	if len(os.Args) < 3 {
		fmt.Println("Usage: go run verify.go <hashed_password> <password>")
		os.Exit(1)
	}

	hashedPassword := os.Args[1]
	password := os.Args[2]

	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		fmt.Println("Password verification failed")
		os.Exit(1)
	}

	fmt.Println("Password verified successfully")
}
