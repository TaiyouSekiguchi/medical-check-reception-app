package usecase

import (
	"backend/model"
	"backend/repository"
)

type IInsuredUsecase interface {
	GetInsureds(birthday string) ([]model.InsuredResponse, error)
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
