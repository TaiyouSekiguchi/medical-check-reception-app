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

	userValidator := validator.NewUserValidator()

	userRepository := repository.NewUserRepository(db)

	userUsecase := usecase.NewUserUsecase(userRepository, userValidator)

	userController := controller.NewUserController(userUsecase)

	e := router.NewRouter(userController)

	e.Logger.Fatal(e.Start(":8080"))
}
