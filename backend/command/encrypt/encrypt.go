package main

import (
	"fmt"
	"os"

	"golang.org/x/crypto/bcrypt"
)

func main() {

	if len(os.Args) < 2 {
		fmt.Println("Usage: go run encrypt.go <password>")
		os.Exit(1)
	}

	password := os.Args[1]

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		fmt.Println("Failed to hash password: ", err)
		os.Exit(1)
	}

	fmt.Println(string(hashedPassword))
}
