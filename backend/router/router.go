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

	// e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
	// 	AllowOrigins: []string{os.Getenv("FE_URL")},
	// 	AllowHeaders: []string{
	// 		echo.HeaderOrigin,
	// 		echo.HeaderContentType,
	// 		echo.HeaderAccept,
	// 		echo.HeaderAccessControlAllowHeaders,
	// 		echo.HeaderXCSRFToken,
	// 	},
	// 	AllowMethods:     []string{"GET", "PUT", "POST", "DELETE"},
	// 	AllowCredentials: true,
	// }))

	e.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		CookiePath:     "/",
		CookieDomain:   os.Getenv("API_DOMAIN"),
		CookieHTTPOnly: true,
		CookieSameSite: http.SameSiteNoneMode,
		// CookieSameSite: http.SameSiteDefaultMode, // for postman
		// CookieMaxAge:   60,
	}))

	// health check
	e.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	// User
	e.GET("/csrf", uc.CsrfToken)
	e.POST("/login", uc.LogIn)
	e.POST("/logout", uc.LogOut)

	u := e.Group("/users")
	u.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	u.GET("", uc.GetUsers)
	u.POST("", uc.CreateUser)
	u.PUT("/:user-id", uc.UpdateUser)
	u.DELETE("/:user-id", uc.DeleteUser)

	// Insured
	i := e.Group("/insureds")
	i.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	i.GET("", ic.GetInsureds)
	i.GET("/reservation", ic.GetInsuredsWithReservation)
	i.POST("/bulk", ic.CreateInsureds)
	i.GET("/export", ic.GetExportInsureds)

	// ReservationSlot
	rs := e.Group("/reservation-slots")
	rs.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	rs.GET("", rsc.GetAllReservationSlots)
	rs.GET("/examination-items", rsc.GetReservationSlotsWithExaminationItem)
	rs.GET("/reservable", rsc.GetReservableSlots)
	rs.POST("/bulk", rsc.CreateReservationSlots)

	// Reservation
	r := e.Group("/reservations")
	r.Use(echojwt.WithConfig(echojwt.Config{
		SigningKey:  []byte(os.Getenv("SECRET")),
		TokenLookup: "cookie:token",
	}))
	r.POST("", rc.CreateReservation)
	r.DELETE("/:insured-id", rc.DeleteReservation)
	r.POST("/update", rc.UpdateReservation)

	return e
}
