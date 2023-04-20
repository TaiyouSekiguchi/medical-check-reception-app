package model

type Sex struct {
	ID   uint   `json:"id" gorm:"primary_key"`
	Name string `json:"name" gorm:"unique;not null; type:varchar(255)"`
	Code uint   `json:"code" gorm:"unique;not null"`
}
