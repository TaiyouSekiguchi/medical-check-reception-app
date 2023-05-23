package model

type Sex struct {
	ID    uint   `json:"id" gorm:"primary_key"`
	Code  uint   `json:"code" gorm:"unique;not null"`
	Name  string `json:"name" gorm:"unique;not null; type:varchar(255)"`
	Alias string `json:"alias" gorm:"unique;not null; type:varchar(255)"`
}
