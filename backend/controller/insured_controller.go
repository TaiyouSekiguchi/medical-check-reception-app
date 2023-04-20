package controller

import (
	"backend/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IInsuredController interface {
	GetInsureds(c echo.Context) error
	GetInsuredsWithReservation(c echo.Context) error
}

type insuredController struct {
	iu usecase.IInsuredUsecase
}

func NewInsuredController(iu usecase.IInsuredUsecase) IInsuredController {
	return &insuredController{iu}
}

func (ic *insuredController) GetInsureds(c echo.Context) error {

	birthday := c.QueryParam("birthday")

	insuredsRes, err := ic.iu.GetInsureds(birthday)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, insuredsRes)
}

func (ic *insuredController) GetInsuredsWithReservation(c echo.Context) error {

	birthday := c.QueryParam("birthday")

	insuredsRes, err := ic.iu.GetInsuredsWithReservation(birthday)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, insuredsRes)
}
