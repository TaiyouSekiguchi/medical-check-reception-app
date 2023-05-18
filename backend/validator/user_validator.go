package validator

import (
	"backend/model"
	"regexp"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type IUserValidator interface {
	LoginValidate(loginReq model.LoginRequest) error
	UserValidate(userReq model.UserRequest) error
}

type userValidator struct{}

func NewUserValidator() IUserValidator {
	return &userValidator{}
}

func (uv *userValidator) LoginValidate(loginReq model.LoginRequest) error {
	return validation.ValidateStruct(&loginReq,
		validation.Field(
			&loginReq.Username,
			validation.Required.Error("username is required"),
			validation.RuneLength(4, 16).Error("limited min 4 max 16 char"),
			is.Alphanumeric.Error("only alphanumeric"),
		),
		validation.Field(
			&loginReq.Password,
			validation.Required.Error("password is required"),
			validation.RuneLength(8, 32).Error("limited min 8 max 32 char"),
			is.Alphanumeric.Error("only alphanumeric"),
		),
	)
}

func (uv *userValidator) UserValidate(userReq model.UserRequest) error {
	return validation.ValidateStruct(&userReq,
		validation.Field(
			&userReq.Username,
			validation.Required.Error("username is required"),
			validation.RuneLength(4, 16).Error("limited min 4 max 16 char"),
			is.Alphanumeric.Error("only alphanumeric"),
		),
		validation.Field(
			&userReq.Password,
			validation.Required.Error("password is required"),
			validation.RuneLength(8, 32).Error("limited min 8 max 32 char"),
			is.Alphanumeric.Error("only alphanumeric"),
			validation.Match(regexp.MustCompile(`[A-Z]`)).Error("at least one uppercase letter required"),
			validation.Match(regexp.MustCompile(`[a-z]`)).Error("at least one lowercase letter required"),
			validation.Match(regexp.MustCompile(`[0-9]`)).Error("at least one digit required"),
		),
	)
}
