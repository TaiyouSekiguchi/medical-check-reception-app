package usecase

import (
	"backend/model"
	"backend/repository"
	"backend/validator"
)

type IInsuredUsecase interface {
	GetInsureds(birthday string) ([]model.InsuredResponse, error)
	GetInsuredsWithReservation(queryParams model.InsuredQueryParams) ([]model.InsuredWithReservationResponse, error)
}

type insuredUsecase struct {
	ir repository.IInsuredRepository
	iv validator.IInsuredValidator
}

func NewInsuredUsecase(ir repository.IInsuredRepository, iv validator.IInsuredValidator) IInsuredUsecase {
	return &insuredUsecase{ir, iv}
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

func (iu *insuredUsecase) GetInsuredsWithReservation(queryParams model.InsuredQueryParams) ([]model.InsuredWithReservationResponse, error) {

	if err := iu.iv.InsuredQueryParamsValidate(queryParams); err != nil {
		return nil, err
	}

	insureds := []model.Insured{}
	if err := iu.ir.GetInsuredsWithReservation(&insureds, &queryParams); err != nil {
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
