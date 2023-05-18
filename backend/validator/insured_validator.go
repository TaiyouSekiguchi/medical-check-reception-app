package validator

import (
	"backend/model"
	"regexp"
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IInsuredValidator interface {
	InsuredQueryParamsValidate(queryParams model.InsuredQueryParams) error
	InsuredRequestValidate(insuredReq model.InsuredRequest) error
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

func (iv *insuredValidator) InsuredRequestValidate(insuredReq model.InsuredRequest) error {
	return validation.ValidateStruct(&insuredReq,
		validation.Field(
			&insuredReq.Number,
			validation.Required.Error("number is required"),
			validation.Min(1).Error("number must be greater than 0"),
			validation.Max(99999999).Error("number must be less than 99999999"),
		),
		validation.Field(
			&insuredReq.FirstName,
			validation.Required.Error("first_name is required"),
			validation.RuneLength(1, 32).Error("limited max 32 char"),
			validation.Match(regexp.MustCompile("^[ぁ-んァ-ヶ一-龠a-zA-Z]*$")).Error("only hiragana, katakana, kanji, alphabet"),
		),
		validation.Field(
			&insuredReq.LastName,
			validation.Required.Error("last_name is required"),
			validation.RuneLength(1, 32).Error("limited max 32 char"),
			validation.Match(regexp.MustCompile("^[ぁ-んァ-ヶ一-龠a-zA-Z]*$")).Error("only hiragana, katakana, kanji, alphabet"),
		),
		validation.Field(
			&insuredReq.FirstNameKana,
			validation.Required.Error("first_name_kana is required"),
			validation.RuneLength(1, 64).Error("limited max 64 char"),
			validation.Match(regexp.MustCompile("^[ｦ-ﾟ]*$")).Error("only kana"),
		),
		validation.Field(
			&insuredReq.LastNameKana,
			validation.Required.Error("last_name_kana is required"),
			validation.RuneLength(1, 64).Error("limited max 64 char"),
			validation.Match(regexp.MustCompile("^[ｦ-ﾟ]*$")).Error("only kana"),
		),
		validation.Field(
			&insuredReq.Birthday,
			validation.Required.Error("birthday is required"),
			validation.Date("2006-01-02").Error("birthday format is invalid"),
			validation.Date("2006-01-02").Min(time.Date(1900, 1, 1, 0, 0, 0, 0, time.UTC)).RangeError("birthday must be after 1900-01-01"),
			validation.Date("2006-01-02").Max(time.Now().UTC()).RangeError("birthday must be before today"),
		),
		validation.Field(
			&insuredReq.SexCode,
			validation.Required.Error("sex_code is required"),
			validation.In("1", "2").Error("sex_code must be 1 or 2"),
		),
		validation.Field(
			&insuredReq.Address,
			validation.Required.Error("address is required"),
			validation.RuneLength(1, 256).Error("limited max 256 char"),
			validation.Match(regexp.MustCompile("^[ぁ-んァ-ヶ一-龠]*$")).Error("only hiragana, katakana, kanji"),
		),
	)
}
