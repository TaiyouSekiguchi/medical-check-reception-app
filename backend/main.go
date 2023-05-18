package main

import (
	"backend/controller"
	"backend/db"
	"backend/repository"
	"backend/router"
	"backend/usecase"
	"backend/validator"

	"github.com/sirupsen/logrus"
)

func main() {

	// Logger
	log := logrus.New()
	log.SetLevel(logrus.DebugLevel)
	log.SetFormatter(&logrus.TextFormatter{
		TimestampFormat: "2006-01-02 15:04:05",
		FullTimestamp:   true,
	})

	// DB
	db := db.NewDB()

	// Admin
	adminRepository := repository.NewAdminRepository(db)

	// User
	userValidator := validator.NewUserValidator()
	userRepository := repository.NewUserRepository(db)
	userUsecase := usecase.NewUserUsecase(userRepository, userValidator, adminRepository)
	userController := controller.NewUserController(log, userUsecase)

	// Insured
	insuredValidator := validator.NewInsuredValidator()
	insuredRepository := repository.NewInsuredRepository(db)
	insuredUsecase := usecase.NewInsuredUsecase(insuredRepository, insuredValidator)
	insuredController := controller.NewInsuredController(insuredUsecase)

	// ReservationSlot
	reservationSlotValidator := validator.NewReservationSlotValidator()
	reservationSlotRepository := repository.NewReservationSlotRepository(db)
	reservationSlotUsecase := usecase.NewReservationSlotUsecase(reservationSlotRepository, reservationSlotValidator)
	reservationSlotController := controller.NewReservationSlotController(reservationSlotUsecase)

	// Reservation
	reservationValidator := validator.NewReservationValidator()
	reservationRepository := repository.NewReservationRepository(db)
	reservationUsecase := usecase.NewReservationUsecase(reservationRepository, reservationValidator)
	reservationController := controller.NewReservationController(reservationUsecase)

	e := router.NewRouter(userController, insuredController, reservationSlotController, reservationController)

	e.Logger.Fatal(e.Start(":8080"))
}
