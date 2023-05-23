package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IReservationRepository interface {
	CreateReservation(reservations *[]model.Reservation) error
	DeleteReservation(insuredId uint) error
	UpdateReservation(reservations *[]model.Reservation) error
}

type reservationRepository struct {
	db *gorm.DB
}

func NewReservationRepository(db *gorm.DB) IReservationRepository {
	return &reservationRepository{db}
}

func (rr *reservationRepository) CreateReservation(reservations *[]model.Reservation) error {

	tx := rr.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	// TODO 前段で予約枠のIDがすべて同じかどうかを確認する
	reservationSlotId := (*reservations)[0].ReservationSlotID

	// 予約枠のIDから予約枠の情報を取得する
	reservationSlot := model.ReservationSlot{}
	if err := tx.Preload("Reservation.ExaminationItem").Where("id = ?", reservationSlotId).First(&reservationSlot).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 予約枠の情報から各検査項目の上限と予約数を取得する

	// 予約枠の上限数
	basicLimit := reservationSlot.Basic
	gastrointestinalEndoscopyLimit := reservationSlot.GastrointestinalEndoscopy
	bariumLimit := reservationSlot.Barium
	breastCancerScreeningLimit := reservationSlot.BreastCancerScreening

	// 現在の予約数
	basicCount := uint(0)
	gastrointestinalEndoscopyCount := uint(0)
	bariumCount := uint(0)
	breastCancerScreeningCount := uint(0)

	for _, reservation := range reservationSlot.Reservation {
		switch reservation.ExaminationItem.Name {
		case "Basic":
			basicCount++
		case "Gastrointestinal Endoscopy":
			gastrointestinalEndoscopyCount++
		case "Barium":
			bariumCount++
		case "Breast Cancer Screening":
			breastCancerScreeningCount++
		}
	}

	for i := 0; i < len(*reservations); i++ {
		switch (*reservations)[i].ExaminationItemID {
		case 1:
			if basicCount >= basicLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "basic slot is full"}
			}
		case 2:
			if gastrointestinalEndoscopyCount >= gastrointestinalEndoscopyLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "gastrointestinal endoscopy slot is full"}
			}
		case 3:
			if bariumCount >= bariumLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "barium slot is full"}
			}
		case 4:
			if breastCancerScreeningCount >= breastCancerScreeningLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "breast cancer screening slot is full"}
			}
		}

		if err := tx.Create(&(*reservations)[i]).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}

func (rr *reservationRepository) DeleteReservation(insuredID uint) error {
	// insuredIDをもとに予約を削除する
	if err := rr.db.Where("insured_id = ?", insuredID).Delete(&model.Reservation{}).Error; err != nil {
		return err
	}

	return nil
}

func (rr *reservationRepository) UpdateReservation(reservations *[]model.Reservation) error {

	tx := rr.db.Begin()
	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
		}
	}()

	if err := tx.Error; err != nil {
		return err
	}

	// 先にもとの予約を削除する
	insuredID := (*reservations)[0].InsuredID
	if err := rr.db.Where("insured_id = ?", insuredID).Delete(&model.Reservation{}).Error; err != nil {
		tx.Rollback()
		return err
	}

	// TODO 前段で予約枠のIDがすべて同じかどうかを確認する
	reservationSlotId := (*reservations)[0].ReservationSlotID

	// 予約枠のIDから予約枠の情報を取得する
	reservationSlot := model.ReservationSlot{}
	if err := tx.Preload("Reservation.ExaminationItem").Where("id = ?", reservationSlotId).First(&reservationSlot).Error; err != nil {
		tx.Rollback()
		return err
	}

	// 予約枠の情報から各検査項目の上限と予約数を取得する

	// 予約枠の上限数
	basicLimit := reservationSlot.Basic
	gastrointestinalEndoscopyLimit := reservationSlot.GastrointestinalEndoscopy
	bariumLimit := reservationSlot.Barium
	breastCancerScreeningLimit := reservationSlot.BreastCancerScreening

	// 現在の予約数
	basicCount := uint(0)
	gastrointestinalEndoscopyCount := uint(0)
	bariumCount := uint(0)
	breastCancerScreeningCount := uint(0)

	for _, reservation := range reservationSlot.Reservation {
		switch reservation.ExaminationItem.Name {
		case "Basic":
			basicCount++
		case "Gastrointestinal Endoscopy":
			gastrointestinalEndoscopyCount++
		case "Barium":
			bariumCount++
		case "Breast Cancer Screening":
			breastCancerScreeningCount++
		}
	}

	for i := 0; i < len(*reservations); i++ {
		switch (*reservations)[i].ExaminationItemID {
		case 1:
			if basicCount >= basicLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "basic slot is full"}
			}
		case 2:
			if gastrointestinalEndoscopyCount >= gastrointestinalEndoscopyLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "gastrointestinal endoscopy slot is full"}
			}
		case 3:
			if bariumCount >= bariumLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "barium slot is full"}
			}
		case 4:
			if breastCancerScreeningCount >= breastCancerScreeningLimit {
				tx.Rollback()
				return &model.ReservationLimitError{Message: "breast cancer screening slot is full"}
			}
		}

		if err := tx.Create(&(*reservations)[i]).Error; err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit().Error
}
