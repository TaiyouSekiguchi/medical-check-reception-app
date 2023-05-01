package usecase

import (
	"backend/model"
	"backend/repository"
	"backend/validator"
)

type IReservationUsecase interface {
	CreateReservation(reservations []model.Reservation) ([]model.CreateReservationResponse, error)
	DeleteReservation(insuredId uint) error
	UpdateReservation(reservations []model.Reservation) ([]model.CreateReservationResponse, error)
}

type reservationUsecase struct {
	rr repository.IReservationRepository
	rv validator.IReservationValidator
}

func NewReservationUsecase(rr repository.IReservationRepository, rv validator.IReservationValidator) IReservationUsecase {
	return &reservationUsecase{rr, rv}
}

func (ru *reservationUsecase) CreateReservation(reservations []model.Reservation) ([]model.CreateReservationResponse, error) {

	for _, reservation := range reservations {
		if err := ru.rv.ReservationValidate(reservation); err != nil {
			return []model.CreateReservationResponse{}, err
		}
	}

	if err := ru.rr.CreateReservation(&reservations); err != nil {
		return []model.CreateReservationResponse{}, err
	}

	reservationResponses := []model.CreateReservationResponse{}

	for i := 0; i < len(reservations); i++ {
		reservationResponse := model.CreateReservationResponse{
			ID:                reservations[i].ID,
			InsuredID:         reservations[i].InsuredID,
			ReservationSlotID: reservations[i].ReservationSlotID,
			ExaminationItemID: reservations[i].ExaminationItemID,
			CreatedAt:         reservations[i].CreatedAt,
			UpdatedAt:         reservations[i].UpdatedAt,
		}
		reservationResponses = append(reservationResponses, reservationResponse)
	}

	return reservationResponses, nil
}

func (ru *reservationUsecase) DeleteReservation(insuredId uint) error {
	return ru.rr.DeleteReservation(insuredId)
}

func (ru *reservationUsecase) UpdateReservation(reservations []model.Reservation) ([]model.CreateReservationResponse, error) {

	for _, reservation := range reservations {
		if err := ru.rv.ReservationValidate(reservation); err != nil {
			return []model.CreateReservationResponse{}, err
		}
	}

	if err := ru.rr.UpdateReservation(&reservations); err != nil {
		return []model.CreateReservationResponse{}, err
	}

	reservationResponses := []model.CreateReservationResponse{}

	for i := 0; i < len(reservations); i++ {
		reservationResponse := model.CreateReservationResponse{
			ID:                reservations[i].ID,
			InsuredID:         reservations[i].InsuredID,
			ReservationSlotID: reservations[i].ReservationSlotID,
			ExaminationItemID: reservations[i].ExaminationItemID,
			CreatedAt:         reservations[i].CreatedAt,
			UpdatedAt:         reservations[i].UpdatedAt,
		}
		reservationResponses = append(reservationResponses, reservationResponse)
	}

	return reservationResponses, nil
}
