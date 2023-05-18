package controller

import (
	"backend/model"
	"backend/usecase"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

type IUserController interface {
	CsrfToken(c echo.Context) error
	LogIn(c echo.Context) error
	LogOut(c echo.Context) error
	GetUsers(c echo.Context) error
	CreateUser(c echo.Context) error
	UpdateUser(c echo.Context) error
	DeleteUser(c echo.Context) error
}

type userController struct {
	log *logrus.Logger
	uu  usecase.IUserUsecase
}

func NewUserController(log *logrus.Logger, uu usecase.IUserUsecase) IUserController {
	return &userController{log, uu}
}

func (uc *userController) CsrfToken(c echo.Context) error {
	token := c.Get("csrf").(string)

	return c.JSON(http.StatusOK, echo.Map{
		"csrf_token": token,
	})
}

func (uc *userController) LogIn(c echo.Context) error {

	uc.log.Debug("userController.LogIn() called")

	loginReq := model.LoginRequest{}
	if err := c.Bind(&loginReq); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	tokenString, err := uc.uu.Login(loginReq)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = tokenString
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.Path = "/"
	cookie.Domain = os.Getenv("API_DOMAIN")
	// cookie.Secure = true
	cookie.Secure = false // for postman
	cookie.HttpOnly = true
	cookie.SameSite = http.SameSiteNoneMode
	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, echo.Map{
		"jwt": tokenString,
	})
}

func (uc *userController) LogOut(c echo.Context) error {
	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = ""
	cookie.Expires = time.Now()
	cookie.Path = "/"
	cookie.Domain = os.Getenv("API_DOMAIN")
	// cookie.Secure = true
	cookie.Secure = false // for postman
	cookie.HttpOnly = true
	cookie.SameSite = http.SameSiteNoneMode
	c.SetCookie(cookie)

	return c.NoContent(http.StatusOK)
}

func (uc *userController) GetUsers(c echo.Context) error {
	if isAdmin := getIsAdmin(c.Get("user").(*jwt.Token)); !isAdmin {
		return c.JSON(http.StatusUnauthorized, "you are not admin")
	}

	usersRes, err := uc.uu.GetUsers()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, usersRes)
}

func (uc *userController) CreateUser(c echo.Context) error {
	if isAdmin := getIsAdmin(c.Get("user").(*jwt.Token)); !isAdmin {
		return c.JSON(http.StatusUnauthorized, "you are not admin")
	}

	userReq := model.UserRequest{}
	if err := c.Bind(&userReq); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	userRes, err := uc.uu.CreateUser(userReq)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, userRes)
}

func (uc *userController) UpdateUser(c echo.Context) error {
	if isAdmin := getIsAdmin(c.Get("user").(*jwt.Token)); !isAdmin {
		return c.JSON(http.StatusUnauthorized, "you are not admin")
	}

	userIDParam := c.Param("user-id")
	userID, err := strconv.Atoi(userIDParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if userID <= 0 {
		return c.JSON(http.StatusBadRequest, "user id is invalid")
	}

	userReq := model.UserRequest{}
	if err := c.Bind(&userReq); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	userRes, err := uc.uu.UpdateUser(userReq, uint(userID))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, userRes)
}

func (uc *userController) DeleteUser(c echo.Context) error {
	if isAdmin := getIsAdmin(c.Get("user").(*jwt.Token)); !isAdmin {
		return c.JSON(http.StatusUnauthorized, "you are not admin")
	}

	userIDParam := c.Param("user-id")
	userID, err := strconv.Atoi(userIDParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	if userID <= 0 {
		return c.JSON(http.StatusBadRequest, "user id is invalid")
	}

	if err := uc.uu.DeleteUser(uint(userID)); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}
