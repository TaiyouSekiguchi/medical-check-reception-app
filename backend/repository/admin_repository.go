package repository

import (
	"backend/model"

	"gorm.io/gorm"
)

type IAdminRepository interface {
	GetAdminByUserID(admin *model.Admin, userId uint) error
	GetAdminByUserIDUnscoped(admin *model.Admin, userId uint) error
	CreateAdmin(admin *model.Admin) error
	DeleteAdmin(userId uint) error
	RestoreAdmin(admin *model.Admin) error
}

type adminRepository struct {
	db *gorm.DB
}

func NewAdminRepository(db *gorm.DB) IAdminRepository {
	return &adminRepository{db}
}

func (ar *adminRepository) GetAdminByUserID(admin *model.Admin, userId uint) error {
	if err := ar.db.Where("user_id = ?", userId).Find(admin).Error; err != nil {
		return err
	}
	return nil
}

func (ar *adminRepository) GetAdminByUserIDUnscoped(admin *model.Admin, userId uint) error {
	if err := ar.db.Unscoped().Where("user_id = ?", userId).Find(admin).Error; err != nil {
		return err
	}
	return nil
}

func (ar *adminRepository) CreateAdmin(admin *model.Admin) error {
	if err := ar.db.Create(admin).Error; err != nil {
		return err
	}
	return nil
}

func (ar *adminRepository) DeleteAdmin(userId uint) error {
	result := ar.db.Where("user_id=?", userId).Delete(&model.Admin{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (ar *adminRepository) RestoreAdmin(admin *model.Admin) error {
	if err := ar.db.Unscoped().Model(admin).Update("deleted_at", gorm.Expr("NULL")).Error; err != nil {
		return err
	}

	return nil
}
