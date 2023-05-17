package validator

import (
	"backend/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type IUserValidator interface {
	LoginValidate(loginReq model.LoginRequest) error
	UserValidate(user model.User) error
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
			validation.RuneLength(6, 30).Error("limited min 6 max 30 char"),
			is.Alphanumeric.Error("only alphanumeric"),
		),
	)
}

func (uv *userValidator) UserValidate(user model.User) error {
	return validation.ValidateStruct(&user,
		validation.Field(
			&user.Username,
			validation.Required.Error("username is required"),
			validation.RuneLength(1, 30).Error("limited max 30 char"),
		),
		validation.Field(
			&user.Password,
			validation.Required.Error("password is required"),
			validation.RuneLength(6, 30).Error("limited min 6 max 30 char"),
		),
	)
}
