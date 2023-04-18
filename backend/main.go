package main

import (
	"backend/controller"
	"backend/db"
	"backend/repository"
	"backend/router"
	"backend/usecase"
	"backend/validator"
)

func main() {
	db := db.NewDB()

	// User
	userValidator := validator.NewUserValidator()
	userRepository := repository.NewUserRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository, userValidator)
	userController := controller.NewUserController(userUsecase)

	// Insured
	// insuredValidator := validator.NewInsuredValidator() ok
	insuredRepository := repository.NewInsuredRepository(db)
	insuredUsecase := usecase.NewInsuredUsecase(insuredRepository)
	insuredController := controller.NewInsuredController(insuredUsecase)

	// ReservationSlot
	// reservationSlotValidator := validator.NewReservationSlotValidator() ok
	reservationSlotRepository := repository.NewReservationSlotRepository(db)
	reservationSlotUsecase := usecase.NewReservationSlotUsecase(reservationSlotRepository)
	reservationSlotController := controller.NewReservationSlotController(reservationSlotUsecase)

	// e := router.NewRouter(userController, insuredController)
	e := router.NewRouter(userController, insuredController, reservationSlotController)

	e.Logger.Fatal(e.Start(":8080"))
}
