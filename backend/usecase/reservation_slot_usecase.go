package usecase

import (
	"backend/model"
	"backend/repository"
)

type IReservationSlotUsecase interface {
	GetAllReservationSlots() ([]model.ReservationSlotResponse, error)
	GetReservationSlotsWithExaminationItem() ([]model.ReservationSlotResponse, error)
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

func (ru *reservationSlotUsecase) GetReservationSlotsWithExaminationItem() ([]model.ReservationSlotResponse, error) {

	reservationSlots := []model.ReservationSlot{}
	if err := ru.rr.GetReservationSlotsWithExaminationItem(&reservationSlots); err != nil {
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
			Reservation:               []model.ReservationResponse{},
		}

		for _, res := range v.Reservation {
			reservation := model.ReservationResponse{
				ID:      res.ID,
				Insured: model.InsuredResponse{},
				ReservationSlot: model.ReservationSlotResponse{
					ID:                        res.ReservationSlot.ID,
					Date:                      res.ReservationSlot.Date,
					Basic:                     res.ReservationSlot.Basic,
					GastrointestinalEndoscopy: res.ReservationSlot.GastrointestinalEndoscopy,
					Barium:                    res.ReservationSlot.Barium,
					BreastCancerScreening:     res.ReservationSlot.BreastCancerScreening,
				},
				ExaminationItem: model.ExaminationItemResponse{
					ID:   res.ExaminationItem.ID,
					Name: res.ExaminationItem.Name,
				},
			}
			r.Reservation = append(r.Reservation, reservation)
		}

		resReservationSlots = append(resReservationSlots, r)
	}

	return resReservationSlots, nil
}
