package usecase

import (
	"backend/model"
	"backend/repository"
)

type IReservationSlotUsecase interface {
	GetAllReservationSlots() ([]model.ReservationSlotResponse, error)
}

type reservationSlotUsecase struct {
	rr repository.IReservationSlotRepository
	// iv validator.IInsuredValidator
}

func NewReservationSlotUsecase(rr repository.IReservationSlotRepository) IReservationSlotUsecase {
	return &reservationSlotUsecase{rr}
}

func (ru *reservationSlotUsecase) GetAllReservationSlots() ([]model.ReservationSlotResponse, error) {

	reservationSlots := []model.ReservationSlot{}
	if err := ru.rr.GetAllReservationSlots(&reservationSlots); err != nil {
		return nil, err
	}

	resReservationSlots := []model.ReservationSlotResponse{}
	for _, v := range reservationSlots {
		r := model.ReservationSlotResponse{
			ID:                        v.ID,
			Date:                      v.Date,
			Basic:                     v.Basic,
			GastrointestinalEndoscopy: v.GastrointestinalEndoscopy,
			Barium:                    v.Barium,
			BreastCancerScreening:     v.BreastCancerScreening,
		}
		resReservationSlots = append(resReservationSlots, r)
	}

	return resReservationSlots, nil
}
