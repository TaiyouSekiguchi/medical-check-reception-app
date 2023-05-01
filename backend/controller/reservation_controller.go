package controller

import (
	"backend/model"
	"backend/usecase"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type IReservationController interface {
	CreateReservation(c echo.Context) error
	DeleteReservation(c echo.Context) error
	UpdateReservation(c echo.Context) error
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

	reservations := []model.Reservation{}
	if err := c.Bind(&reservations); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	reservationResponse, err := rc.ru.CreateReservation(reservations)
	if err != nil {

		if _, ok := err.(*model.ReservationLimitError); ok {
			return c.JSON(http.StatusConflict, err.Error())
		}

		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, reservationResponse)
}

func (rc *reservationController) DeleteReservation(c echo.Context) error {

	insuredIDParam := c.Param("insured-id")

	// TODO ここらへんはusecaseに移動するべきかも
	insuredID, err := strconv.Atoi(insuredIDParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if insuredID < 1 {
		return c.JSON(http.StatusBadRequest, "insured-id is too short")
	}

	err = rc.ru.DeleteReservation(uint(insuredID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (rc *reservationController) UpdateReservation(c echo.Context) error {
	// TODO: 後でReservationのモデルに作成者のIDを追加できたらよりよい
	// user := c.Get("user").(*jwt.Token)
	// claims := user.Claims.(jwt.MapClaims)
	// userId := claims["user_id"]

	reservations := []model.Reservation{}
	if err := c.Bind(&reservations); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	reservationResponse, err := rc.ru.UpdateReservation(reservations)
	if err != nil {

		if _, ok := err.(*model.ReservationLimitError); ok {
			return c.JSON(http.StatusConflict, err.Error())
		}

		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, reservationResponse)
}
