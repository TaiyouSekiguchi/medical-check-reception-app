package model

import "time"

type ReservationSlot struct {
	ID                        uint      `json:"id" gorm:"primaryKey"`
	Date                      time.Time `json:"date"`
	Basic                     uint      `json:"basic"`
	GastrointestinalEndoscopy uint      `json:"gastrointestinal_endoscopy"`
	Barium                    uint      `json:"barium"`
	BreastCancerScreening     uint      `json:"breast_cancer_screening"`
	CreatedAt                 time.Time `json:"created_at"`
	UpdatedAt                 time.Time `json:"updated_at"`
}

type ReservationSlotResponse struct {
	ID                        uint      `json:"id" gorm:"primaryKey"`
	Date                      time.Time `json:"date"`
	Basic                     uint      `json:"basic"`
	GastrointestinalEndoscopy uint      `json:"gastrointestinal_endoscopy"`
	Barium                    uint      `json:"barium"`
	BreastCancerScreening     uint      `json:"breast_cancer_screening"`
}
