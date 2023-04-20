package model

import "time"

type ReservationSlot struct {
	ID                        uint          `json:"id" gorm:"primaryKey"`
	Date                      time.Time     `json:"date" gorm:"not null"`
	Basic                     uint          `json:"basic" gorm:"not null"`
	GastrointestinalEndoscopy uint          `json:"gastrointestinal_endoscopy" gorm:"not null"`
	Barium                    uint          `json:"barium" gorm:"not null"`
	BreastCancerScreening     uint          `json:"breast_cancer_screening" gorm:"not null"`
	CreatedAt                 time.Time     `json:"created_at"`
	UpdatedAt                 time.Time     `json:"updated_at"`
	Reservation               []Reservation `json:"reservation" gorm:"foreignKey:ReservationSlotID"`
}

type ReservationSlotResponse struct {
	ID                        uint                  `json:"id" gorm:"primaryKey"`
	Date                      time.Time             `json:"date" gorm:"not null"`
	Basic                     uint                  `json:"basic" gorm:"not null"`
	GastrointestinalEndoscopy uint                  `json:"gastrointestinal_endoscopy" gorm:"not null"`
	Barium                    uint                  `json:"barium" gorm:"not null"`
	BreastCancerScreening     uint                  `json:"breast_cancer_screening" gorm:"not null"`
	CreatedAt                 time.Time             `json:"created_at"`
	UpdatedAt                 time.Time             `json:"updated_at"`
	Reservation               []ReservationResponse `json:"reservation"`
}
