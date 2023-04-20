package model

type ExaminationItem struct {
	ID   uint   `json:"id" gorm:"primary_key"`
	Name string `json:"name" gorm:"unique; not null; type:varchar(255)"`
}

type ExaminationItemResponse struct {
	ID   uint   `json:"id" gorm:"primary_key"`
	Name string `json:"name" gorm:"unique; not null; type:varchar(255)"`
}
