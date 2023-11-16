package db

import (
	"github.com/jimmyeaaaaah/nanitabe/go/entities"
	"github.com/jimmyeaaaaah/nanitabe/go/utils"
)

func DeleteFood(id int) error {
	db, err := utils.OpenMySQL()
	if err != nil {
		return err
	}
	deleteQuery := "DELETE FROM foods WHERE id = ?"
	_, err = db.Exec(deleteQuery, id)
	if err != nil {
		return err
	}
	return nil
}

func SelectAllFoods() ([]entities.Food, error) {
	db, err := utils.OpenMySQL()
	if err != nil {
		return nil, err
	}

	rows, err := db.Query("SELECT * FROM foods")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var foods []entities.Food

	// dbから取ってきたデータを、そのままでは使えないのでGoの構造体に格納
	for rows.Next() {
		var food entities.Food
		err := rows.Scan(
			&food.ID, 
			&food.Type, 
			&food.Name, 
			&food.Amount, 
			&food.Unit,
		)
		if err != nil {
			return nil, err
		}
		foods = append(foods, food)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return foods, nil
}