package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"strconv"
	"errors"
)
// Хендлеры
// Проверка сервераа
func healthHandler(w http.ResponseWriter, r *http.Request){
	fmt.Fprintln(w, "Users API is working")
}
// Получение всех пользователей
func getUsers(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(users)

	if err != nil{
		http.Error(w,"Failed to encode users",http.StatusInternalServerError)
	}
}
// Получение одного пользователя
func getUserByID(w http.ResponseWriter, r *http.Request){
	idString := r.PathValue("id")

	id, err := strconv.Atoi(idString)

	if err != nil{
		http.Error(w,"Invalid user ID", http.StatusBadRequest,)
		return
	}
	user, err := findUserByID(id)

	if err != nil{
		http.Error(
			w, "404 User not found",
			http.StatusNotFound,
		)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

type UserInput struct {
	Name string `json:"name"`
	Age int `json:"age"`
}
// Создание пользователя
func createUser(w http.ResponseWriter, r *http.Request){
	var input UserInput

	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil{
		http.Error(w, "Invalid JSON", http.StatusBadRequest,)
		return
	}

	user := User{
		ID: getNextId(),
		Name: input.Name,
		Age: input.Age,
	}

	users = append(users,user)

w.Header().Set("Content-type", "application/json")
w.WriteHeader(http.StatusCreated)
json.NewEncoder(w).Encode(user)

}

// Промежуточные функции

// Функция поиска ID
func findUserByID(id int)(*User, error){
	
	for i := range users{
		if users[i].ID == id{
			return &users[i], nil
		}
	}
	return nil, errors.New("user not found")
}


//Фукнция автоинкремента
var nextID = 3
func getNextId() int{
	id := nextID
	nextID++

	return id
}

func enableCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusOK)
            return
        }
        next.ServeHTTP(w, r)
    })
}








// Структура пользователя
type User struct{
	ID int `json:"id"`
	Name string `json:"name"`
	Age int `json:"age"`
}
// Слайс юзеров
var users = []User{
		{
			ID:1,
			Name: "Alex",
			Age: 20,
		},
		{
			ID:2,
			Name: "John",
			Age: 21,
		},
	}

func main(){
	// Маршруты
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("GET /users",getUsers)
	http.HandleFunc("GET /users/{id}",getUserByID)
	http.HandleFunc("POST /users", createUser)
	

	// Запуск сервера
	fmt.Println("Server started on http://localhost:8080")
	http.ListenAndServe(":8080", enableCORS(http.DefaultServeMux))
	err := http.ListenAndServe(":8080", nil)
	if err != nil{
		fmt.Println("Server error", err)
	}
}

// 1. Реализовать методы PUT/PATCH, настроить маршрут
// 2. Реализовать метод DELETE, настроить маршрут
// 3. Дописать фронт для новых маршрутов