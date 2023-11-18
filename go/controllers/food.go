package controllers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jimmyeaaaaah/nanitabe/go/db"
	"github.com/jimmyeaaaaah/nanitabe/go/entities"
)

func PostFood(w http.ResponseWriter, r *http.Request) {
	var newFood entities.Food
	err := json.NewDecoder(r.Body).Decode(&newFood)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	id, err := db.UpsertFood(newFood);
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	response := map[string]int64{"id":id}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}

func DeleteFood(w http.ResponseWriter, r *http.Request){
	vars := mux.Vars(r)
    id, err := strconv.Atoi(vars["id"])
    if err != nil {
        http.Error(w, "Invalid food ID", http.StatusBadRequest)
        return
    }

	if err := db.DeleteFood(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// 成功時のレスポンス
	w.WriteHeader(http.StatusOK)
}

func GetFoods(w http.ResponseWriter, r *http.Request){
	foods, err := db.SelectAllFoods()
	if err != nil {
		// dbの結果がerrorなら、http.ResponseWriterに渡す
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return 
	}
	// ResponseWriterに、さまざまな設定を追加する
	w.Header().Set("Content-Type", "application/json")
	// dbから受け取ったfoodsデータをjson形式にエンコードしてwに書き込む
	err = json.NewEncoder(w).Encode(foods)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}
