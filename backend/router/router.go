package router

import (
	"backend/controller"
	"net/http"
	"os"

	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func NewRouter(uc controller.IUserController, ic controller.IInsuredController, rsc controller.IReservationSlotController, rc controller.IReservationController) *echo.Echo {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173", os.Getenv("FE_URL")},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept,
			echo.HeaderAccessControlAllowHeaders, echo.HeaderXCSRFToken},
		AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
		AllowCredentials: true,
	}))

	e.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		CookiePath:     "/",
		CookieDomain:   os.Getenv("API_DOMAIN"),
		CookieHTTPOnly: true,
		// CookieSameSite: http.SameSiteNoneMode,
		CookieSameSite: http.SameSiteDefaultMode, // for postman
		// CookieMaxAge:   60,
	}))

	// User
	e.POST("/login", uc.LogIn)
	e.POST("/logout", uc.LogOut)
	e.GET("/csrf", uc.CsrfToken)

	// Insured
	i := e.Group("/insureds")
	i.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	i.GET("", ic.GetInsureds)
	i.GET("/reservation", ic.GetInsuredsWithReservation)
	// i.GET("/reservation", func(c echo.Context) error {
	// 	return c.String(http.StatusOK, "Insureds with reservation")
	// })

	// ReservationSlot
	rs := e.Group("/reservation-slots")
	rs.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	rs.GET("", rsc.GetAllReservationSlots)
	rs.GET("/examination-items", rsc.GetReservationSlotsWithExaminationItem)
	rs.GET("/reservable", rsc.GetReservableSlots)

	// Reservation
	r := e.Group("/reservations")
	rs.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	r.POST("", rc.CreateReservation)

	return e
}
