package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	// "encoding/json"
)


func main(){
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w,200,map[string]string{
			"status": "ok",
		})
	})

	mux.HandleFunc("POST /auth/register", func(w http.ResponseWriter, r *http.Request){
		var input struct{
			Email string `json:"email"`
			Password string `json:"password"`
		}

		err := json.NewDecoder(r.Body).Decode(&input)

		if err != nil{
			writeJSON(w,400,map[string]string{
				"error": "invalid json",
			})
			return
		}

		fmt.Println(input.Email)
		fmt.Println(input.Password)

		writeJSON(w, 201, map[string]string{
			"messag": "user created",
		})
	})

	mux.HandleFunc("GET /me", store.withAuth(store.me))

	fmt.Println("Server start on http://localhost:8080")

	http.ListenAndServe(":8080", mux)
}