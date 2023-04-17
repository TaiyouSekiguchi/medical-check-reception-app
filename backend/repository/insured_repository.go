package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IInsuredRepository interface {
	GetAllInsureds(insureds *[]model.Insured) error
}

type insuredRepository struct {
	db *gorm.DB
}

func NewInsuredRepository(db *gorm.DB) IInsuredRepository {
	return &insuredRepository{db}
}

func (ir *insuredRepository) GetAllInsureds(insureds *[]model.Insured) error {
	if err := ir.db.Find(insureds).Error; err != nil {
		return err
	}
	return nil
}
