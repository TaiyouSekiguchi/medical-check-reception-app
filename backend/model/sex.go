package model

type Sex struct {
	ID   uint   `json:"id" gorm:"primary_key"`
	Name string `json:"name" gorm:"unique"`
	Code uint   `json:"code" gorm:"unique"`
}
