package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IReservationSlotRepository interface {
	GetAllReservationSlots(reservation_slot *[]model.ReservationSlot) error
	GetReservationSlotsWithExaminationItem(reservation_slot *[]model.ReservationSlot) error
	CreateReservationSlots(reservation_slots *[]model.ReservationSlot) error
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

func (rsr *reservationSlotRepository) GetReservationSlotsWithExaminationItem(reservation_slots *[]model.ReservationSlot) error {

	if err := rsr.db.Preload("Reservation").Find(reservation_slots).Error; err != nil {
		return err
	}

	return nil
}

func (rsr *reservationSlotRepository) CreateReservationSlots(reservation_slots *[]model.ReservationSlot) error {

	if err := rsr.db.Create(reservation_slots).Error; err != nil {
		return err
	}

	return nil
}
