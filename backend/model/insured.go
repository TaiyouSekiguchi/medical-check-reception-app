package model

import "time"

type Insured struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Number    uint      `json:"number"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Birthday  time.Time `json:"birthday" gorm:"type:date"`
	SexCode   uint      `json:"sex_code"`
	Sex       Sex       `json:"sex" gorm:"references:Code"`
	Address   string    `json:"address"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type InsuredResponse struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Number    uint      `json:"number"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Birthday  time.Time `json:"birthday" gorm:"type:date"`
	SexCode   uint      `json:"sex_code"`
	Address   string    `json:"address"`
}
