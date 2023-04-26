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

type ReservableSlot struct {
	ID                                    uint      `json:"id" gorm:"primaryKey"`
	Date                                  time.Time `json:"date" gorm:"not null"`
	DayOfWeek                             string    `json:"day_of_week" gorm:"not null"`
	IsBasicReservable                     bool      `json:"is_basic_reservable" gorm:"not null"`
	IsGastrointestinalEndoscopyReservable bool      `json:"is_gastrointestinal_endoscopy_reservable" gorm:"not null"`
	IsBariumReservable                    bool      `json:"is_barium_reservable" gorm:"not null"`
	IsBreastCancerScreeningReservable     bool      `json:"is_breast_cancer_screening_reservable" gorm:"not null"`
}
