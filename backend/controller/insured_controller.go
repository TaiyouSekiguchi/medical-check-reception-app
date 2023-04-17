package controller

import (
	"backend/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IInsuredController interface {
	GetAllInsureds(c echo.Context) error
}

type insuredController struct {
	iu usecase.IInsuredUsecase
}

func NewInsuredController(iu usecase.IInsuredUsecase) IInsuredController {
	return &insuredController{iu}
}

func (ic *insuredController) GetAllInsureds(c echo.Context) error {

	insuredsRes, err := ic.iu.GetAllInsureds()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, insuredsRes)
}
