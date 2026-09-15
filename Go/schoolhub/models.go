package main

type User struct{
	ID int `json:"id"`
	Email string `json:"email"`
	Password string `json:"-"`
}

type Student struct {
	ID int `json:"id"`
	Name string `json:"name"`
	Class string `json:"class"`
	Age int `json:"age"`
	Email string `json:"email"`
}