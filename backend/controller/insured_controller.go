package controller

import (
	"backend/model"
	"backend/usecase"
	"net/http"

	"github.com/labstack/echo/v4"
)

type IInsuredController interface {
	GetInsureds(c echo.Context) error
	GetInsuredsWithReservation(c echo.Context) error
	CreateInsureds(c echo.Context) error
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

	queryParams := model.InsuredQueryParams{}

	if err := c.Bind(&queryParams); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	insuredsRes, err := ic.iu.GetInsuredsWithReservation(queryParams)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, insuredsRes)
}

func (ic *insuredController) CreateInsureds(c echo.Context) error {

	insuredsReq := []model.InsuredRequest{}

	if err := c.Bind(&insuredsReq); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	insuredsRes, err := ic.iu.CreateInsureds(insuredsReq)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, insuredsRes)
}
