package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jimmyeaaaaah/nanitabe/go/controllers"
	"github.com/rs/cors"
)

func main(){
	r := mux.NewRouter()
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // specify the allowed origin(s)
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
	})
	handler := c.Handler(r)
	// 第一引数で指定されたパスに対するリクエストが到着した際に
	// 実行される関数が第二引数
	r.HandleFunc("/api/foods", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			controllers.GetFoods(w, r)
		case http.MethodPost:
			controllers.PostFood(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	r.HandleFunc("/api/foods/{id:[0-9]+}", controllers.DeleteFood).Methods("DELETE")

	r.HandleFunc("api/recipe", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			controllers.GetFoods(w, r)
		case http.MethodPost:
			controllers.PostFood(w, r)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})
	log.Fatal(http.ListenAndServe(":8080", handler))
}

