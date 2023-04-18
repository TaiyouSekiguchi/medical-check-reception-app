package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IInsuredRepository interface {
	GetInsureds(insureds *[]model.Insured, birthday string) error
}

type insuredRepository struct {
	db *gorm.DB
}

func NewInsuredRepository(db *gorm.DB) IInsuredRepository {
	return &insuredRepository{db}
}

func (ir *insuredRepository) GetInsureds(insureds *[]model.Insured, birthday string) error {

	query := ir.db

	if birthday != "" {
		query = query.Where("birthday = ?", birthday)
	}

	if err := query.Find(insureds).Error; err != nil {
		return err
	}

	return nil
}
