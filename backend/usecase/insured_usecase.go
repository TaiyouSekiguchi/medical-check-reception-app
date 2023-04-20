package usecase

import (
	"backend/model"
	"backend/repository"
)

type IInsuredUsecase interface {
	GetInsureds(birthday string) ([]model.InsuredResponse, error)
	GetInsuredsWithReservation(birthday string) ([]model.InsuredResponse, error)
}

type insuredUsecase struct {
	ir repository.IInsuredRepository
	// iv validator.IInsuredValidator
}

func NewInsuredUsecase(ir repository.IInsuredRepository) IInsuredUsecase {
	return &insuredUsecase{ir}
}

func (iu *insuredUsecase) GetInsureds(birthday string) ([]model.InsuredResponse, error) {
	insureds := []model.Insured{}
	if err := iu.ir.GetInsureds(&insureds, birthday); err != nil {
		return nil, err
	}

	resInsureds := []model.InsuredResponse{}
	for _, v := range insureds {
		i := model.InsuredResponse{
			ID:        v.ID,
			Number:    v.Number,
			FirstName: v.FirstName,
			LastName:  v.LastName,
			Birthday:  v.Birthday,
			SexCode:   v.SexCode,
			Address:   v.Address,
		}
		resInsureds = append(resInsureds, i)
	}

	return resInsureds, nil
}

func (iu *insuredUsecase) GetInsuredsWithReservation(birthday string) ([]model.InsuredResponse, error) {
	insureds := []model.Insured{}
	if err := iu.ir.GetInsuredsWithReservation(&insureds, birthday); err != nil {
		return nil, err
	}

	resInsureds := []model.InsuredResponse{}
	for _, v := range insureds {
		i := model.InsuredResponse{
			ID:          v.ID,
			Number:      v.Number,
			FirstName:   v.FirstName,
			LastName:    v.LastName,
			Birthday:    v.Birthday,
			SexCode:     v.SexCode,
			Address:     v.Address,
			Reservation: []model.ReservationResponse{},
		}
		for _, r := range v.Reservation {
			reservation := model.ReservationResponse{
				ID: r.ID,
				Insured: model.InsuredResponse{
					ID:        r.Insured.ID,
					Number:    r.Insured.Number,
					FirstName: r.Insured.FirstName,
					LastName:  r.Insured.LastName,
					Birthday:  r.Insured.Birthday,
					SexCode:   r.Insured.SexCode,
					Address:   r.Insured.Address,
				},
				ReservationSlot: model.ReservationSlotResponse{
					ID:                        r.ReservationSlot.ID,
					Date:                      r.ReservationSlot.Date,
					Basic:                     r.ReservationSlot.Basic,
					GastrointestinalEndoscopy: r.ReservationSlot.GastrointestinalEndoscopy,
					Barium:                    r.ReservationSlot.Barium,
					BreastCancerScreening:     r.ReservationSlot.BreastCancerScreening,
				},
				ExaminationItem: model.ExaminationItemResponse{
					ID:   r.ExaminationItem.ID,
					Name: r.ExaminationItem.Name,
				},
			}

			i.Reservation = append(i.Reservation, reservation)
		}

		resInsureds = append(resInsureds, i)
	}

	return resInsureds, nil
}
