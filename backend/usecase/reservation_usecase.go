package usecase

import (
	"backend/model"
	"backend/repository"
	"backend/validator"
)

type IReservationUsecase interface {
	CreateReservation(reservationReq []model.ReservationRequest) ([]model.CreateReservationResponse, error)
	DeleteReservation(insuredId uint) error
	UpdateReservation(reservationReq []model.ReservationRequest) ([]model.CreateReservationResponse, error)
}

type reservationUsecase struct {
	rr repository.IReservationRepository
	rv validator.IReservationValidator
}

func NewReservationUsecase(rr repository.IReservationRepository, rv validator.IReservationValidator) IReservationUsecase {
	return &reservationUsecase{rr, rv}
}

func (ru *reservationUsecase) CreateReservation(reservationReq []model.ReservationRequest) ([]model.CreateReservationResponse, error) {

	for _, r := range reservationReq {
		if err := ru.rv.ReservationRequestValidate(r); err != nil {
			return []model.CreateReservationResponse{}, err
		}
	}

	reservations := []model.Reservation{}
	for _, r := range reservationReq {
		reservation := model.Reservation{
			InsuredID:         r.InsuredID,
			ReservationSlotID: r.ReservationSlotID,
			ExaminationItemID: r.ExaminationItemID,
		}
		reservations = append(reservations, reservation)
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
			CreatedAt:         time2str(reservations[i].CreatedAt),
			UpdatedAt:         time2str(reservations[i].UpdatedAt),
		}
		reservationResponses = append(reservationResponses, reservationResponse)
	}

	return reservationResponses, nil
}

func (ru *reservationUsecase) DeleteReservation(insuredId uint) error {
	return ru.rr.DeleteReservation(insuredId)
}

func (ru *reservationUsecase) UpdateReservation(reservationReq []model.ReservationRequest) ([]model.CreateReservationResponse, error) {

	for _, r := range reservationReq {
		if err := ru.rv.ReservationRequestValidate(r); err != nil {
			return []model.CreateReservationResponse{}, err
		}
	}

	reservations := []model.Reservation{}
	for _, r := range reservationReq {
		reservation := model.Reservation{
			InsuredID:         r.InsuredID,
			ReservationSlotID: r.ReservationSlotID,
			ExaminationItemID: r.ExaminationItemID,
		}
		reservations = append(reservations, reservation)
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
			CreatedAt:         time2str(reservations[i].CreatedAt),
			UpdatedAt:         time2str(reservations[i].UpdatedAt),
		}
		reservationResponses = append(reservationResponses, reservationResponse)
	}

	return reservationResponses, nil
}
