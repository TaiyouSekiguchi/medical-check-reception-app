package usecase

import (
	"backend/model"
	"backend/repository"
	"backend/validator"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

type IUserUsecase interface {
	Login(loginReq model.LoginRequest) (string, error)
	GetUsers() ([]model.UserResponse, error)
	CreateUser(userReq model.UserRequest) (model.UserResponse, error)
	UpdateUser(userReq model.UserRequest, userId uint) (model.UserResponse, error)
	DeleteUser(userId uint) error
}

type userUsecase struct {
	ur repository.IUserRepository
	uv validator.IUserValidator
	ar repository.IAdminRepository
}

func NewUserUsecase(ur repository.IUserRepository, uv validator.IUserValidator, ar repository.IAdminRepository) IUserUsecase {
	return &userUsecase{ur, uv, ar}
}

func (uu *userUsecase) Login(loginReq model.LoginRequest) (string, error) {
	if err := uu.uv.LoginValidate(loginReq); err != nil {
		return "", err
	}

	storedUser := model.User{}
	if err := uu.ur.GetUserByUsername(&storedUser, loginReq.Username); err != nil {
		return "", err
	}

	err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(loginReq.Password))
	if err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID":   storedUser.ID,
		"username": storedUser.Username,
		"exp":      time.Now().Add(time.Hour * 12).Unix(),
		"admin":    storedUser.Admin.ID > 0,
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (uu *userUsecase) GetUsers() ([]model.UserResponse, error) {
	users := []model.User{}
	if err := uu.ur.GetUsers(&users); err != nil {
		return nil, err
	}
	resUsers := []model.UserResponse{}
	for _, v := range users {
		t := model.UserResponse{
			ID:        v.ID,
			Username:  v.Username,
			IsAdmin:   v.Admin.ID > 0,
			CreatedAt: time2str(v.CreatedAt),
			UpdatedAt: time2str(v.UpdatedAt),
		}
		resUsers = append(resUsers, t)
	}
	return resUsers, nil
}

func (uu *userUsecase) CreateUser(userReq model.UserRequest) (model.UserResponse, error) {
	// if err := uu.tv.TaskValidate(task); err != nil {
	// 	return model.TaskResponse{}, err
	// }

	hash, err := bcrypt.GenerateFromPassword([]byte(userReq.Password), 10)
	if err != nil {
		return model.UserResponse{}, err
	}

	user := model.User{Username: userReq.Username, Password: string(hash)}
	if err := uu.ur.CreateUser(&user); err != nil {
		return model.UserResponse{}, err
	}

	admin := model.Admin{UserID: user.ID}
	if userReq.IsAdmin {
		if err := uu.ar.CreateAdmin(&admin); err != nil {
			return model.UserResponse{}, err
		}
	}

	resUser := model.UserResponse{
		ID:       user.ID,
		Username: user.Username,
		IsAdmin:  admin.ID > 0,
	}

	return resUser, nil
}

func (uu *userUsecase) UpdateUser(userReq model.UserRequest, userId uint) (model.UserResponse, error) {
	// if err := tu.tv.TaskValidate(task); err != nil {
	// 	return model.TaskResponse{}, err
	// }

	hash, err := bcrypt.GenerateFromPassword([]byte(userReq.Password), 10)
	if err != nil {
		return model.UserResponse{}, err
	}

	user := model.User{ID: userId, Username: userReq.Username, Password: string(hash)}
	if err := uu.ur.UpdateUser(&user); err != nil {
		return model.UserResponse{}, err
	}

	// Adminテーブルにレコードが存在するか確認
	// 論理削除の場合も含めて、Adminテーブルにレコードが存在するか確認する

	preAdmin := model.Admin{}
	if err := uu.ar.GetAdminByUserIDUnscoped(&preAdmin, userId); err != nil {
		return model.UserResponse{}, err
	}

	IsAdminResult := false
	admin := model.Admin{UserID: user.ID}
	if userReq.IsAdmin { // リクエストのis_adminがtrue
		if preAdmin.ID == 0 { // Adminテーブルにレコードが存在しない
			if err := uu.ar.CreateAdmin(&admin); err != nil {
				return model.UserResponse{}, err
			}
		} else { // Adminテーブルにレコードが存在する
			if !preAdmin.DeletedAt.Time.IsZero() { // Adminテーブルにレコードが存在するが、論理削除されている
				if err := uu.ar.RestoreAdmin(&preAdmin); err != nil { // 論理削除を解除する
					return model.UserResponse{}, err
				}
			}
		}
		IsAdminResult = true
	} else { // リクエストのis_adminがfalse
		if preAdmin.ID > 0 { // Adminテーブルにレコードが存在する
			if err := uu.ar.DeleteAdmin(userId); err != nil {
				return model.UserResponse{}, err
			}
		}
	}

	resUser := model.UserResponse{
		ID:        user.ID,
		Username:  user.Username,
		IsAdmin:   IsAdminResult,
		CreatedAt: time2str(user.CreatedAt),
		UpdatedAt: time2str(user.UpdatedAt),
	}

	return resUser, nil
}

func (uu *userUsecase) DeleteUser(userId uint) error {

	if err := uu.ur.DeleteUser(userId); err != nil {
		return err
	}
	return nil
}
