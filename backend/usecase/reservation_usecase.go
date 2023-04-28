package usecase

import (
	"backend/model"
	"backend/repository"
	"backend/validator"
)

type IReservationUsecase interface {
	CreateReservation(reservation model.Reservation) (model.CreateReservationResponse, error)
	// Login(user model.User) (string, error)
}

type reservationUsecase struct {
	rr repository.IReservationRepository
	rv validator.IReservationValidator
}

func NewReservationUsecase(rr repository.IReservationRepository, rv validator.IReservationValidator) IReservationUsecase {
	return &reservationUsecase{rr, rv}
}

func (ru *reservationUsecase) CreateReservation(reservation model.Reservation) (model.CreateReservationResponse, error) {
	if err := ru.rv.ReservationValidate(reservation); err != nil {
		return model.CreateReservationResponse{}, err
	}

	if err := ru.rr.CreateReservation(&reservation); err != nil {
		return model.CreateReservationResponse{}, err
	}

	reservationResponse := model.CreateReservationResponse{
		ID:                reservation.ID,
		InsuredID:         reservation.InsuredID,
		ReservationSlotID: reservation.ReservationSlotID,
		ExaminationItemID: reservation.ExaminationItemID,
		CreatedAt:         reservation.CreatedAt,
		UpdatedAt:         reservation.UpdatedAt,
	}

	return reservationResponse, nil
}
