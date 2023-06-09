package usecase

import (
	"backend/model"
	"backend/repository"
	"backend/validator"
	"time"
)

func time2str(t time.Time) string {
	// レシーバーtを、"YYYY-MM-DDTHH-MM-SSZZZZ"という形の文字列に変換する
	return t.Format("2006-01-02T15:04:05Z07:00")
}

func str2time(t string) time.Time {
	// YYYY-MM-DDTHH:MM:SSZZZZの形式で渡される文字列tをtime.Time型に変換して返す
	parsedTime, _ := time.Parse("2006-01-02", t)
	// parsedTime, _ := time.Parse("2006-01-02T15:04:05Z07:00", t)
	return parsedTime
}

type IInsuredUsecase interface {
	GetInsureds() ([]model.InsuredResponse, error)
	GetInsuredsWithReservation(queryParams model.InsuredQueryParams) ([]model.InsuredWithReservationResponse, error)
	CreateInsureds(insuredsReq []model.InsuredRequest) ([]model.InsuredResponse, error)
	GetExportInsureds() ([]model.InsuredForExportResponse, error)
}

type insuredUsecase struct {
	ir repository.IInsuredRepository
	iv validator.IInsuredValidator
}

func NewInsuredUsecase(ir repository.IInsuredRepository, iv validator.IInsuredValidator) IInsuredUsecase {
	return &insuredUsecase{ir, iv}
}

func (iu *insuredUsecase) GetInsureds() ([]model.InsuredResponse, error) {
	insureds := []model.Insured{}
	if err := iu.ir.GetInsureds(&insureds); err != nil {
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
			Birthday:      time2str(v.Birthday),
			SexCode:       v.SexCode,
			Address:       v.Address,
			CreatedAt:     time2str(v.CreatedAt),
			UpdatedAt:     time2str(v.UpdatedAt),
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

func (iu *insuredUsecase) CreateInsureds(insuredsReq []model.InsuredRequest) ([]model.InsuredResponse, error) {

	for _, v := range insuredsReq {
		if err := iu.iv.InsuredRequestValidate(v); err != nil {
			return []model.InsuredResponse{}, err
		}
	}

	insureds := []model.Insured{}
	for _, v := range insuredsReq {
		i := model.Insured{
			Number:        v.Number,
			FirstName:     v.FirstName,
			LastName:      v.LastName,
			FirstNameKana: v.FirstNameKana,
			LastNameKana:  v.LastNameKana,
			Birthday:      str2time(v.Birthday),
			SexCode:       v.SexCode,
			Address:       v.Address,
		}
		insureds = append(insureds, i)
	}

	if err := iu.ir.CreateInsureds(&insureds); err != nil {
		return []model.InsuredResponse{}, err
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
			Birthday:      time2str(v.Birthday),
			SexCode:       v.SexCode,
			Address:       v.Address,
			CreatedAt:     time2str(v.CreatedAt),
			UpdatedAt:     time2str(v.UpdatedAt),
		}
		resInsureds = append(resInsureds, i)
	}

	return resInsureds, nil
}

func (iu *insuredUsecase) GetExportInsureds() ([]model.InsuredForExportResponse, error) {

	insureds := []model.Insured{}
	if err := iu.ir.GetExportInsureds(&insureds); err != nil {
		return nil, err
	}

	resInsuredsForExport := []model.InsuredForExportResponse{}

	for _, v := range insureds {
		i := model.InsuredForExportResponse{
			ID:                                  v.ID,
			Number:                              v.Number,
			FirstName:                           v.FirstName,
			LastName:                            v.LastName,
			FirstNameKana:                       v.FirstNameKana,
			LastNameKana:                        v.LastNameKana,
			Birthday:                            v.Birthday,
			SexAlias:                            v.Sex.Alias,
			Address:                             v.Address,
			IsBasicReserved:                     false,
			IsGastrointestinalEndoscopyReserved: false,
			IsBariumReserved:                    false,
			IsBreastCancerScreeningReserved:     false,
			IsProstateCancerScreeningReserved:   false,
		}

		if len(v.Reservation) != 0 {
			i.ReservationDate = v.Reservation[0].ReservationSlot.Date
			for _, r := range v.Reservation {
				switch r.ExaminationItemID {
				case 1:
					i.IsBasicReserved = true
				case 2:
					i.IsGastrointestinalEndoscopyReserved = true
				case 3:
					i.IsBariumReserved = true
				case 4:
					i.IsBreastCancerScreeningReserved = true
				case 5:
					i.IsProstateCancerScreeningReserved = true
				}
			}
			resInsuredsForExport = append(resInsuredsForExport, i)
		}
	}

	return resInsuredsForExport, nil
}
