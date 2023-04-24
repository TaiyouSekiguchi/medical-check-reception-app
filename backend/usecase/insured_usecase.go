package usecase

import (
	"backend/model"
	"backend/repository"
)

type IInsuredUsecase interface {
	GetInsureds(birthday string) ([]model.InsuredResponse, error)
	GetInsuredsWithReservation(firstName, lastName, birthday string) ([]model.InsuredWithReservationResponse, error)
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
			ID:            v.ID,
			Number:        v.Number,
			FirstName:     v.FirstName,
			LastName:      v.LastName,
			FirstNameKana: v.FirstNameKana,
			LastNameKana:  v.LastNameKana,
			Birthday:      v.Birthday,
			SexAlias:      v.Sex.Alias,
			Address:       v.Address,
		}
		resInsureds = append(resInsureds, i)
	}

	return resInsureds, nil
}

func (iu *insuredUsecase) GetInsuredsWithReservation(firstName, lastName, birthday string) ([]model.InsuredWithReservationResponse, error) {
	insureds := []model.Insured{}
	if err := iu.ir.GetInsuredsWithReservation(&insureds, firstName, lastName, birthday); err != nil {
		return nil, err
	}

	resInsuredsWithReservation := []model.InsuredWithReservationResponse{}

	for _, v := range insureds {
		i := model.InsuredWithReservationResponse{
			ID:               v.ID,
			Number:           v.Number,
			FirstName:        v.FirstName,
			LastName:         v.LastName,
			FirstNameKana:    v.FirstNameKana,
			LastNameKana:     v.LastNameKana,
			Birthday:         v.Birthday,
			SexAlias:         v.Sex.Alias,
			Address:          v.Address,
			IsReserved:       len(v.Reservation) > 0,
			ExaminationItems: []string{},
		}
		for _, r := range v.Reservation {
			i.ExaminationItems = append(i.ExaminationItems, r.ExaminationItem.Alias)
			i.ReservationDate = r.ReservationSlot.Date
		}
		resInsuredsWithReservation = append(resInsuredsWithReservation, i)
	}

	return resInsuredsWithReservation, nil
}
