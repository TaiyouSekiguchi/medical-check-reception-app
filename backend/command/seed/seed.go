package main

import (
	"backend/db"
	"backend/model"
	"fmt"
	"log"
)

func main() {

	dbConn := db.NewDB()

	defer fmt.Println("Successfully Seeded")
	defer db.CloseDB(dbConn)

	// Insert seed data
	users := []model.User{
		{
			Username: "user1",
			Password: "password1",
		},
		{
			Username: "user2",
			Password: "password2",
		},
		{
			Username: "user3",
			Password: "password3",
		},
	}

	for _, user := range users {
		err := dbConn.Create(&user).Error
		if err != nil {
			log.Fatalf("Failed to insert user %s: %v", user.Username, err)
		}
	}
}
