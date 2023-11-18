package db

import (
	"fmt"

	"github.com/jimmyeaaaaah/nanitabe/go/entities"
	"github.com/jimmyeaaaaah/nanitabe/go/utils"
)

func UpsertFood(food entities.Food) (int64, error) {
	db, err := utils.OpenMySQL()
	if err != nil {
		return 0, err
	}
	fmt.Print(food)
	if food.ID == 0 {
		fmt.Print("id0")
		query := "INSERT INTO foods (type, name, amount, unit) VALUES (?, ?, ?, ?)"
		result, err := db.Exec(query, food.Type, food.Name, food.Amount, food.Unit)
		fmt.Print(err)
		if err != nil {
			return 0, err
		}
		fmt.Print(result)
		id, err := result.LastInsertId()
		if err != nil {
			return 0, err
		}
		fmt.Print(id)
		return id, nil
	}else{
		fmt.Print(food.ID)
		query := "UPDATE foods SET type=?, name=?, amount=?, unit=? WHERE id=?"
		_, err = db.Exec(query, food.Type, food.Name, food.Amount, food.Unit, food.ID)
		if err != nil {
			return 0, err
		}
		return food.ID, nil
	}
}

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

