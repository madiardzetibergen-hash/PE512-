package main

import (
	// "errors"
	"fmt"
	"net/http"
)
func homeHandler(w http.ResponseWriter, r *http.Request){
		fmt.Fprintln(w, "Hello from Go server")
}
func helloHandler(w http.ResponseWriter, r *http.Request){
	fmt.Fprintln(w, "Hello students")
}

func main(){
	// Маршруты
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/hello",helloHandler)

	// Запуск
	fmt.Println("Server started on http://localhost:8080")


	err := http.ListenAndServe(":8080", nil)

	if err != nil{
		fmt.Println("Server error", err)
	}
}