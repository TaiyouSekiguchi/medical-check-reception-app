package model

import "time"

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
}

type ReservationResponse struct {
	ID              uint                    `json:"id" gorm:"primaryKey"`
	Insured         InsuredResponse         `json:"insured" gorm:"references:ID"`
	ReservationSlot ReservationSlotResponse `json:"reservation_slot" gorm:"references:ID"`
	ExaminationItem ExaminationItemResponse `json:"examination_item"`
}
