package main

import (
	"backend/db"
	"backend/model"
	"fmt"
	"log"
)

func main() {
	dbConn := db.NewDB()
	defer fmt.Println("Successfully Reset")
	defer db.CloseDB(dbConn)

	if err := dbConn.Migrator().DropTable(&model.User{}); err != nil {
		log.Fatalf("Failed to drop table: %v", err)
	}

	if err := dbConn.AutoMigrate(&model.User{}); err != nil {
		log.Fatalf("Failed to migrate table: %v", err)
	}
}
