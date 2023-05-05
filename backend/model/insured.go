package model

import "time"

type Insured struct {
	ID            uint          `json:"id" gorm:"primaryKey"`
	Number        uint          `json:"number" gorm:"not null"`
	FirstName     string        `json:"first_name" gorm:"not null; type:varchar(255)"`
	LastName      string        `json:"last_name" gorm:"not null; type:varchar(255)"`
	FirstNameKana string        `json:"first_name_kana" gorm:"not null; type:varchar(255)"`
	LastNameKana  string        `json:"last_name_kana" gorm:"not null; type:varchar(255)"`
	Birthday      time.Time     `json:"birthday" gorm:"type:date;not null"`
	SexCode       uint          `json:"sex_code" gorm:"not null"`
	Sex           Sex           `json:"sex" gorm:"references:Code"`
	Address       string        `json:"address" gorm:"not null"`
	CreatedAt     time.Time     `json:"created_at"`
	UpdatedAt     time.Time     `json:"updated_at"`
	Reservation   []Reservation `json:"reservation" gorm:"foreignKey:InsuredID"`
}

type InsuredRequest struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	Number        uint   `json:"number" gorm:"not null"`
	FirstName     string `json:"first_name" gorm:"not null; type:varchar(255)"`
	LastName      string `json:"last_name" gorm:"not null; type:varchar(255)"`
	FirstNameKana string `json:"first_name_kana" gorm:"not null; type:varchar(255)"`
	LastNameKana  string `json:"last_name_kana" gorm:"not null; type:varchar(255)"`
	Birthday      string `json:"birthday" gorm:"type:date;not null"`
	SexCode       uint   `json:"sex_code"`
	Address       string `json:"address" gorm:"not null"`
}

type InsuredResponse struct {
	ID            uint   `json:"id" gorm:"primaryKey"`
	Number        uint   `json:"number" gorm:"not null"`
	FirstName     string `json:"first_name" gorm:"not null; type:varchar(255)"`
	LastName      string `json:"last_name" gorm:"not null; type:varchar(255)"`
	FirstNameKana string `json:"first_name_kana" gorm:"not null; type:varchar(255)"`
	LastNameKana  string `json:"last_name_kana" gorm:"not null; type:varchar(255)"`
	Birthday      string `json:"birthday" gorm:"type:date;not null"`
	SexCode       uint   `json:"sex_code"`
	Address       string `json:"address" gorm:"not null"`
}

type InsuredQueryParams struct {
	FirstNameKana string `query:"first_name_kana"`
	LastNameKana  string `query:"last_name_kana"`
	Birthday      string `query:"birthday"`
}

type InsuredWithReservationResponse struct {
	ID               uint      `json:"id" gorm:"primaryKey"`
	Number           uint      `json:"number" gorm:"not null"`
	FirstName        string    `json:"first_name" gorm:"not null; type:varchar(255)"`
	LastName         string    `json:"last_name" gorm:"not null; type:varchar(255)"`
	FirstNameKana    string    `json:"first_name_kana" gorm:"not null; type:varchar(255)"`
	LastNameKana     string    `json:"last_name_kana" gorm:"not null; type:varchar(255)"`
	Birthday         time.Time `json:"birthday" gorm:"type:date;not null"`
	SexAlias         string    `json:"sex_alias"`
	Address          string    `json:"address" gorm:"not null"`
	IsReserved       bool      `json:"is_reserved"`
	ReservationDate  time.Time `json:"reservation_date"`
	ExaminationItems []string  `json:"examination_items"`
}

type CreateInsuredResponse struct {
	ID            uint      `json:"id" gorm:"primaryKey"`
	Number        uint      `json:"number" gorm:"not null"`
	FirstName     string    `json:"first_name" gorm:"not null; type:varchar(255)"`
	LastName      string    `json:"last_name" gorm:"not null; type:varchar(255)"`
	FirstNameKana string    `json:"first_name_kana" gorm:"not null; type:varchar(255)"`
	LastNameKana  string    `json:"last_name_kana" gorm:"not null; type:varchar(255)"`
	Birthday      time.Time `json:"birthday" gorm:"type:date;not null"`
	SexCode       uint      `json:"sex_code" gorm:"not null"`
	Address       string    `json:"address" gorm:"not null"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}
