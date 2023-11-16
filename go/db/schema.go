package db

import (
	"github.com/jimmyeaaaaah/nanitabe/go/utils"
)

const (
	dbUserName = "root"
	dbPassWord = "1197-Jimmy"
	dbName = "nanitabe"
)

type Food struct {
	ID int
	Type string
	Name string
	Amount int
	Unit int
}

func CreateFoodTable() error {
	db, err := utils.OpenMySQL()
	if err != nil {
		return err
	}

	createTable := `
		CREATE TABLE IF NOT EXISTS sample (
			id INT PRIMARY KEY,
			type VARCHAR(20),
			name VARCHAR(50),
			amount INT,
			unit VARCHAR(20)
		);
	`
	_, err = db.Exec(createTable)
	if err != nil {
		return err
	}

	defer db.Close()
	return nil
}