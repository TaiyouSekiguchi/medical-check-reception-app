package controller

import (
	"backend/model"
	"backend/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IReservationController interface {
	CreateReservation(c echo.Context) error
}

type reservationController struct {
	ru usecase.IReservationUsecase
}

func NewReservationController(ru usecase.IReservationUsecase) IReservationController {
	return &reservationController{ru}
}

func (rc *reservationController) CreateReservation(c echo.Context) error {
	// TODO: 後でReservationのモデルに作成者のIDを追加できたらよりよい
	// user := c.Get("user").(*jwt.Token)
	// claims := user.Claims.(jwt.MapClaims)
	// userId := claims["user_id"]

	reservation := model.Reservation{}
	if err := c.Bind(&reservation); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	reservationResponse, err := rc.ru.CreateReservation(reservation)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, reservationResponse)
}
