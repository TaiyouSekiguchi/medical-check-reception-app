package repository

import (
	"backend/model"
	"fmt"

	"gorm.io/gorm"
)

type IUserRepository interface {
	GetUserByUsername(user *model.User, username string) error
	GetUsers(users *[]model.User) error
	CreateUser(user *model.User) error
	UpdateUser(user *model.User) error
	DeleteUser(userId uint) error
}

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) IUserRepository {
	return &userRepository{db}
}

func (ur *userRepository) GetUserByUsername(user *model.User, username string) error {
	if err := ur.db.Preload("Admin").Where("username=?", username).First(user).Error; err != nil {
		return err
	}

	return nil
}

func (ur *userRepository) GetUsers(users *[]model.User) error {
	if err := ur.db.Joins("Admin").Order("created_at").Find(users).Error; err != nil {
		return err
	}
	return nil
}

func (ur *userRepository) CreateUser(user *model.User) error {
	if err := ur.db.Create(user).Error; err != nil {
		return err
	}
	return nil
}

func (ur *userRepository) UpdateUser(user *model.User) error {
	if err := ur.db.Save(user).Error; err != nil {
		return err
	}
	return nil
}

func (ur *userRepository) DeleteUser(userId uint) error {
	result := ur.db.Where("id=?", userId).Delete(&model.User{ID: userId})
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected < 1 {
		return fmt.Errorf("object does not exist")
	}
	return nil
}
