package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IReservationSlotRepository interface {
	GetAllReservationSlots(reservation_slot *[]model.ReservationSlot) error
	GetReservationSlotsWithExaminationItem(reservation_slot *[]model.ReservationSlot) error
}

type reservationSlotRepository struct {
	db *gorm.DB
}

func NewReservationSlotRepository(db *gorm.DB) IReservationSlotRepository {
	return &reservationSlotRepository{db}
}

func (rsr *reservationSlotRepository) GetAllReservationSlots(reservation_slot *[]model.ReservationSlot) error {
	if err := rsr.db.Find(reservation_slot).Error; err != nil {
		return err
	}
	return nil
}

func (rsr *reservationSlotRepository) GetReservationSlotsWithExaminationItem(reservation_slot *[]model.ReservationSlot) error {

	if err := rsr.db.Preload("Reservation.ExaminationItem").Find(reservation_slot).Error; err != nil {
		return err
	}

	return nil
}
