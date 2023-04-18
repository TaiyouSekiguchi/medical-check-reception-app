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

	models := []interface{}{&model.User{}, &model.Sex{}, &model.Insured{}, &model.ReservationSlot{}}

	for _, m := range models {
		if err := dbConn.Migrator().DropTable(m); err != nil {
			log.Fatalf("Failed to drop table: %v", err)
		}
	}

	if err := dbConn.AutoMigrate(&model.User{}, &model.Sex{}, &model.Insured{}, &model.ReservationSlot{}); err != nil {
		log.Fatalf("Failed to migrate table: %v", err)
	}
}
