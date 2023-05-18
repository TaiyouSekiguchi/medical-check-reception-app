package validator

import (
	"backend/model"
	"time"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IReservationSlotValidator interface {
	ReservationSlotRequestValidate(reservationSlotReq model.ReservationSlotRequest) error
}

type reservationSlotValidator struct{}

func NewReservationSlotValidator() IReservationSlotValidator {
	return &reservationSlotValidator{}
}

func (rsv *reservationSlotValidator) ReservationSlotRequestValidate(reservationSlotReq model.ReservationSlotRequest) error {
	return validation.ValidateStruct(&reservationSlotReq,
		validation.Field(
			&reservationSlotReq.Date,
			validation.Required.Error("date is required"),
			validation.Date("2006-01-02").Error("date format is invalid"),
			validation.Date("2006-01-02").Min(time.Now().UTC()).RangeError("date must be after today"),
		),
		validation.Field(
			&reservationSlotReq.Basic,
			validation.Required.Error("basic is required"),
			validation.Min(uint(0)).Error("basic must be greater than or equal to 0"),
			validation.Max(uint(999)).Error("basic must be less than 1000"),
		),
		validation.Field(
			&reservationSlotReq.GastrointestinalEndoscopy,
			validation.Min(uint(0)).Error("gastrointestinal_endoscopy must be greater than or equal to 0"),
			validation.Max(reservationSlotReq.Basic).Error("gastrointestinal_endoscopy must be less than or equal to basic"),
		),
		validation.Field(
			&reservationSlotReq.Barium,
			validation.Min(uint(0)).Error("barium must be greater than or equal to 0"),
			validation.Max(reservationSlotReq.Basic).Error("barium must be less than or equal to basic"),
		),
		validation.Field(
			&reservationSlotReq.BreastCancerScreening,
			validation.Min(uint(0)).Error("breast_cancer_screening must be greater than or equal to 0"),
			validation.Max(reservationSlotReq.Basic).Error("breast_cancer_screening must be less than or equal to basic"),
		),
	)
}
