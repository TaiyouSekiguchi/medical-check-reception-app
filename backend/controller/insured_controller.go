package controller

import (
	"backend/model"
	"backend/usecase"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type IInsuredController interface {
	GetInsureds(c echo.Context) error
	GetInsuredsWithReservation(c echo.Context) error
	CreateInsureds(c echo.Context) error
	GetExportInsureds(c echo.Context) error
}

type insuredController struct {
	iu usecase.IInsuredUsecase
}

func NewInsuredController(iu usecase.IInsuredUsecase) IInsuredController {
	return &insuredController{iu}
}

func (ic *insuredController) GetInsureds(c echo.Context) error {
	insuredsRes, err := ic.iu.GetInsureds()
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
	if isAdmin := getIsAdmin(c.Get("user").(*jwt.Token)); !isAdmin {
		return c.JSON(http.StatusUnauthorized, "you are not admin")
	}

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

func (ic *insuredController) GetExportInsureds(c echo.Context) error {
	if isAdmin := getIsAdmin(c.Get("user").(*jwt.Token)); !isAdmin {
		return c.JSON(http.StatusUnauthorized, "you are not admin")
	}

	insuredsRes, err := ic.iu.GetExportInsureds()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, insuredsRes)
}
