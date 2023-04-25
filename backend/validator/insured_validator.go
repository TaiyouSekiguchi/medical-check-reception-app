package validator

import (
	"backend/model"
	"regexp"
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IInsuredValidator interface {
	InsuredQueryParamsValidate(queryParams model.InsuredQueryParams) error
}

type insuredValidator struct{}

func NewInsuredValidator() IInsuredValidator {
	return &insuredValidator{}
}

func (iv *insuredValidator) InsuredQueryParamsValidate(queryParams model.InsuredQueryParams) error {
	return validation.ValidateStruct(&queryParams,
		validation.Field(
			&queryParams.FirstNameKana,
			validation.RuneLength(1, 20).Error("limited max 20 char"),
			validation.Match(regexp.MustCompile("^[ｦ-ﾟ]*$")).Error("only kana"),
		),
		validation.Field(
			&queryParams.LastNameKana,
			validation.RuneLength(1, 20).Error("limited max 20 char"),
			validation.Match(regexp.MustCompile("^[ｦ-ﾟ]*$")).Error("only kana"),
		),
		validation.Field(
			&queryParams.Birthday,
			validation.Date("2006-01-02").Error("日付形式が不正です"),
			validation.Date("2006-01-02").Min(time.Date(1900, 1, 1, 0, 0, 0, 0, time.UTC)).RangeError("birthdayは1900-01-01以降の日付である必要があります"),
			validation.Date("2006-01-02").Max(time.Now().UTC()).RangeError("birthdayは今日以前の日付である必要があります"),
			validation.When(queryParams.FirstNameKana == "" && queryParams.LastNameKana == "", validation.Required.Error("first_name_kana, last_name_kana or birthday is required")),
		),
	)
}
