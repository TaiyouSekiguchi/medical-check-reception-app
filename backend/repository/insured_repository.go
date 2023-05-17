package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IInsuredRepository interface {
	GetInsureds(insureds *[]model.Insured) error
	GetInsuredsWithReservation(insureds *[]model.Insured, queryParams *model.InsuredQueryParams) error
	CreateInsureds(insureds *[]model.Insured) error
	GetExportInsureds(insureds *[]model.Insured) error
}

type insuredRepository struct {
	db *gorm.DB
}

func NewInsuredRepository(db *gorm.DB) IInsuredRepository {
	return &insuredRepository{db}
}

func (ir *insuredRepository) GetInsureds(insureds *[]model.Insured) error {

	if err := ir.db.Find(insureds).Error; err != nil {
		return err
	}

	return nil
}

func (ir *insuredRepository) GetInsuredsWithReservation(insureds *[]model.Insured, queryParams *model.InsuredQueryParams) error {

	db := ir.db

	if queryParams.FirstNameKana != "" {
		db = db.Where("first_name_kana = ?", queryParams.FirstNameKana)
	}

	if queryParams.LastNameKana != "" {
		db = db.Where("last_name_kana = ?", queryParams.LastNameKana)
	}

	if queryParams.Birthday != "" {
		db = db.Where("birthday = ?", queryParams.Birthday)
	}

	if err := db.Preload("Sex").Preload("Reservation.ExaminationItem").Preload("Reservation.ReservationSlot").Find(insureds).Error; err != nil {
		return err
	}

	return nil
}

func (ir *insuredRepository) CreateInsureds(insureds *[]model.Insured) error {

	if err := ir.db.Create(insureds).Error; err != nil {
		return err
	}

	return nil
}

func (ir *insuredRepository) GetExportInsureds(insureds *[]model.Insured) error {

	if err := ir.db.Preload("Sex").Preload("Reservation.ExaminationItem").Preload("Reservation.ReservationSlot").Find(insureds).Error; err != nil {
		return err
	}

	return nil
}
