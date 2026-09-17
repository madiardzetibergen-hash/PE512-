package main

import (
	"fmt"
	"log"
	"net/http"

	"taskflow/internal/middleware"
	"taskflow/internal/task"
)

func main() {
	repository := task.NewTaskRepository()
	service := task.NewTaskService(repository)
	handler := task.NewTaskHandler(service)

	mux := http.NewServeMux()

	
	handler.RegisterRoutes(mux)

	loggedMux := middleware.Logging(mux)

	fmt.Println("TaskFlow API started")
	fmt.Println("http://localhost:8080")

	err := http.ListenAndServe(":8080", loggedMux)
	if err != nil {
		log.Fatal(err)
	}
}