package validator

import (
	"backend/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type IReservationValidator interface {
	ReservationValidate(reservation model.Reservation) error
}

type reservationValidator struct{}

func NewReservationValidator() IReservationValidator {
	return &reservationValidator{}
}

func (rv *reservationValidator) ReservationValidate(reservation model.Reservation) error {
	return validation.ValidateStruct(&reservation,
		validation.Field(
			&reservation.InsuredID,
			validation.Required.Error("insured_id is required"),
			validation.Min(uint(1)).Error("insured_id is too short"),
			validation.Max(uint(1000000)).Error("insured_id is too long"),
		),
		validation.Field(
			&reservation.ReservationSlotID,
			validation.Required.Error("reservation_slot_id is required"),
			validation.Min(uint(1)).Error("reservation_slot_id is too short"),
			validation.Max(uint(1000000)).Error("reservation_slot_id is too long"),
		),
		validation.Field(
			&reservation.ExaminationItemID,
			validation.Required.Error("examination_item_id is required"),
			validation.Min(uint(1)).Error("examination_item_id is too short"),
			validation.Max(uint(1000000)).Error("examination_item_id is too long"),
		),
	)
}
