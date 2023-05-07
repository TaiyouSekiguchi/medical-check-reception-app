package model

import (
	"time"

	"gorm.io/gorm"
)

type Reservation struct {
	ID                uint            `json:"id" gorm:"primaryKey"`
	InsuredID         uint            `json:"insured_id" gorm:"not null"`
	Insured           Insured         `json:"insured" gorm:"references:ID"`
	ReservationSlotID uint            `json:"reservation_slot_id" gorm:"not null"`
	ReservationSlot   ReservationSlot `json:"reservation_slot" gorm:"references:ID"`
	ExaminationItemID uint            `json:"examination_item_id" gorm:"not null"`
	ExaminationItem   ExaminationItem `json:"examination_item" gorm:"references:ID"`
	CreatedAt         time.Time       `json:"created_at"`
	UpdatedAt         time.Time       `json:"updated_at"`
	DeletedAt         gorm.DeletedAt  `json:"-"`
}

type ReservationResponse struct {
	ID              uint                    `json:"id" gorm:"primaryKey"`
	Insured         InsuredResponse         `json:"insured"`
	ReservationSlot ReservationSlotResponse `json:"reservation_slot"`
	ExaminationItem ExaminationItemResponse `json:"examination_item"`
}

type CreateReservationResponse struct {
	ID                uint      `json:"id" gorm:"primaryKey"`
	InsuredID         uint      `json:"insured_id" validate:"required"`
	ReservationSlotID uint      `json:"reservation_slot_id" validate:"required"`
	ExaminationItemID uint      `json:"examination_item_id" validate:"required"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`
}

type ReservationLimitError struct {
	Message string
}

func (e *ReservationLimitError) Error() string {
	return e.Message
}
