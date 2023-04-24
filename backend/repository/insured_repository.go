package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IInsuredRepository interface {
	GetInsureds(insureds *[]model.Insured, birthday string) error
	GetInsuredsWithReservation(insureds *[]model.Insured, firstName, lastName, birthday string) error
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

	if err := query.Preload("Sex").Find(insureds).Error; err != nil {
		return err
	}

	return nil
}

func (ir *insuredRepository) GetInsuredsWithReservation(insureds *[]model.Insured, firstName, lastName, birthday string) error {

	db := ir.db

	if firstName != "" {
		db = db.Where("first_name_kana = ?", firstName)
	}

	if lastName != "" {
		db = db.Where("last_name_kana = ?", lastName)
	}

	if birthday != "" {
		db = db.Where("birthday = ?", birthday)
	}

	if err := db.Preload("Sex").Preload("Reservation.ExaminationItem").Preload("Reservation.ReservationSlot").Find(insureds).Error; err != nil {
		return err
	}

	return nil
}
