package controller

import (
	"backend/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IReservationSlotController interface {
	GetAllReservationSlots(c echo.Context) error
}

type reservationSlotController struct {
	rsu usecase.IReservationSlotUsecase
}

func NewReservationSlotController(rsu usecase.IReservationSlotUsecase) IReservationSlotController {
	return &reservationSlotController{rsu}
}

func (rsc *reservationSlotController) GetAllReservationSlots(c echo.Context) error {

	reservationSlotRes, err := rsc.rsu.GetAllReservationSlots()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, reservationSlotRes)
}
