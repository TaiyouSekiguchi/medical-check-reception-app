package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IReservationRepository interface {
	CreateReservation(reservation *model.Reservation) error
}

type reservationRepository struct {
	db *gorm.DB
}

func NewReservationRepository(db *gorm.DB) IReservationRepository {
	return &reservationRepository{db}
}

func (rr *reservationRepository) CreateReservation(reservation *model.Reservation) error {
	if err := rr.db.Create(reservation).Error; err != nil {
		return err
	}
	return nil
}
