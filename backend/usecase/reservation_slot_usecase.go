package usecase

import (
	"backend/model"
	"backend/repository"
)

const (
	Basic = iota + 1
	GastrointestinalEndoscopy
	Barium
	BreastCancerScreening
)

type IReservationSlotUsecase interface {
	GetAllReservationSlots() ([]model.ReservationSlotResponse, error)
	GetReservationSlotsWithExaminationItem() ([]model.ReservationSlotResponse, error)
	GetReservableSlots() ([]model.ReservableSlot, error)
	CreateReservationSlots(reservationSlotsReq []model.ReservationSlotRequest) ([]model.CreateReservationSlotResponse, error)
}

type reservationSlotUsecase struct {
	rsr repository.IReservationSlotRepository
	// iv validator.IInsuredValidator
}

func NewReservationSlotUsecase(rsr repository.IReservationSlotRepository) IReservationSlotUsecase {
	return &reservationSlotUsecase{rsr}
}

func (rsu *reservationSlotUsecase) GetAllReservationSlots() ([]model.ReservationSlotResponse, error) {

	reservationSlots := []model.ReservationSlot{}
	if err := rsu.rsr.GetAllReservationSlots(&reservationSlots); err != nil {
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

func (rsu *reservationSlotUsecase) GetReservationSlotsWithExaminationItem() ([]model.ReservationSlotResponse, error) {

	reservationSlots := []model.ReservationSlot{}
	if err := rsu.rsr.GetReservationSlotsWithExaminationItem(&reservationSlots); err != nil {
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

func (rsu *reservationSlotUsecase) GetReservableSlots() ([]model.ReservableSlot, error) {

	reservationSlots := []model.ReservationSlot{}
	if err := rsu.rsr.GetReservationSlotsWithExaminationItem(&reservationSlots); err != nil {
		return nil, err
	}

	weekday := [...]string{"日", "月", "火", "水", "木", "金", "土"}

	reservableSlots := []model.ReservableSlot{}

	for _, v := range reservationSlots {

		r := model.ReservableSlot{
			ID:                                    v.ID,
			Date:                                  v.Date,
			DayOfWeek:                             weekday[v.Date.Weekday()],
			IsBasicReservable:                     false,
			IsGastrointestinalEndoscopyReservable: false,
			IsBariumReservable:                    false,
			IsBreastCancerScreeningReservable:     false,
		}

		basic_count := 0
		gastrointestinal_endoscopy_count := 0
		barium_count := 0
		breast_cancer_screening_count := 0

		for _, res := range v.Reservation {
			switch res.ExaminationItemID {
			case Basic:
				basic_count++
			case GastrointestinalEndoscopy:
				gastrointestinal_endoscopy_count++
			case Barium:
				barium_count++
			case BreastCancerScreening:
				breast_cancer_screening_count++
			}
		}

		r.IsBasicReservable = basic_count < int(v.Basic)
		r.IsGastrointestinalEndoscopyReservable = gastrointestinal_endoscopy_count < int(v.GastrointestinalEndoscopy)
		r.IsBariumReservable = barium_count < int(v.Barium)
		r.IsBreastCancerScreeningReservable = breast_cancer_screening_count < int(v.BreastCancerScreening)

		if r.IsBasicReservable {
			reservableSlots = append(reservableSlots, r)
		}
	}

	return reservableSlots, nil
}

func (rsu *reservationSlotUsecase) CreateReservationSlots(reservationSlotsReq []model.ReservationSlotRequest) ([]model.CreateReservationSlotResponse, error) {

	// if err := iu.iv.InsuredsValidate(insureds); err != nil {
	// 	return err
	// }

	reservationSlots := []model.ReservationSlot{}
	for _, v := range reservationSlotsReq {
		rs := model.ReservationSlot{
			Date:                      str2time(v.Date),
			Basic:                     v.Basic,
			GastrointestinalEndoscopy: v.GastrointestinalEndoscopy,
			Barium:                    v.Barium,
			BreastCancerScreening:     v.BreastCancerScreening,
		}
		reservationSlots = append(reservationSlots, rs)
	}

	if err := rsu.rsr.CreateReservationSlots(&reservationSlots); err != nil {
		return []model.CreateReservationSlotResponse{}, err
	}

	resReservationSlots := []model.CreateReservationSlotResponse{}
	for _, v := range reservationSlots {
		rs := model.CreateReservationSlotResponse{
			ID:                        v.ID,
			Date:                      time2str(v.Date),
			Basic:                     v.Basic,
			GastrointestinalEndoscopy: v.GastrointestinalEndoscopy,
			Barium:                    v.Barium,
			BreastCancerScreening:     v.BreastCancerScreening,
			CreatedAt:                 v.CreatedAt,
			UpdatedAt:                 v.UpdatedAt,
		}
		resReservationSlots = append(resReservationSlots, rs)
	}

	return resReservationSlots, nil
}
