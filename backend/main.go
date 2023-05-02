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

	// Admin
	adminRepository := repository.NewAdminRepository(db)

	// User
	userValidator := validator.NewUserValidator()
	userRepository := repository.NewUserRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository, userValidator, adminRepository)
	userController := controller.NewUserController(userUsecase)

	// Insured
	insuredValidator := validator.NewInsuredValidator()
	insuredRepository := repository.NewInsuredRepository(db)
	insuredUsecase := usecase.NewInsuredUsecase(insuredRepository, insuredValidator)
	insuredController := controller.NewInsuredController(insuredUsecase)

	// ReservationSlot
	// reservationSlotValidator := validator.NewReservationSlotValidator() ok
	reservationSlotRepository := repository.NewReservationSlotRepository(db)
	reservationSlotUsecase := usecase.NewReservationSlotUsecase(reservationSlotRepository)
	reservationSlotController := controller.NewReservationSlotController(reservationSlotUsecase)

	// Reservation
	reservationValidator := validator.NewReservationValidator()
	reservationRepository := repository.NewReservationRepository(db)
	reservationUsecase := usecase.NewReservationUsecase(reservationRepository, reservationValidator)
	reservationController := controller.NewReservationController(reservationUsecase)

	e := router.NewRouter(userController, insuredController, reservationSlotController, reservationController)

	e.Logger.Fatal(e.Start(":8080"))
}
