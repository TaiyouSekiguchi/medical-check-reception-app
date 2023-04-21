package model

import "time"

type Insured struct {
	ID          uint          `json:"id" gorm:"primaryKey"`
	Number      uint          `json:"number" gorm:"not null"`
	FirstName   string        `json:"first_name" gorm:"not null; type:varchar(255)"`
	LastName    string        `json:"last_name" gorm:"not null; type:varchar(255)"`
	Birthday    time.Time     `json:"birthday" gorm:"type:date;not null"`
	SexCode     uint          `json:"sex_code" gorm:"not null"`
	Sex         Sex           `json:"sex" gorm:"references:Code"`
	Address     string        `json:"address" gorm:"not null"`
	CreatedAt   time.Time     `json:"created_at"`
	UpdatedAt   time.Time     `json:"updated_at"`
	Reservation []Reservation `json:"reservation" gorm:"foreignKey:InsuredID"`
}

type InsuredResponse struct {
	ID          uint                  `json:"id" gorm:"primaryKey"`
	Number      uint                  `json:"number" gorm:"not null"`
	FirstName   string                `json:"first_name" gorm:"not null; type:varchar(255)"`
	LastName    string                `json:"last_name" gorm:"not null; type:varchar(255)"`
	Birthday    time.Time             `json:"birthday" gorm:"type:date;not null"`
	SexCode     uint                  `json:"sex_code" gorm:"not null"`
	Address     string                `json:"address" gorm:"not null"`
	Reservation []ReservationResponse `json:"reservation"`
}
