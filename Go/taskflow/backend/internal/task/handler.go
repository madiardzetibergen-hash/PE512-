package task

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
)

type TaskHandler struct {
	service *TaskService
}

func NewTaskHandler(service *TaskService) *TaskHandler {
	return &TaskHandler{service: service}
}

// RegisterRoutes регистрирует маршруты в http.ServeMux (Go 1.22+)
func (h *TaskHandler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("GET /tasks", h.GetAll)
	mux.HandleFunc("GET /tasks/{id}", h.GetByID)
	mux.HandleFunc("POST /tasks", h.Create)
	mux.HandleFunc("PUT /tasks/{id}", h.Update)
	mux.HandleFunc("PATCH /tasks/{id}/status", h.UpdateStatus)
	mux.HandleFunc("DELETE /tasks/{id}", h.Delete)
}

// GET /tasks
func (h *TaskHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	tasks := h.service.GetAll()
	writeJSON(w, http.StatusOK, tasks)
}

// GET /tasks/{id}
func (h *TaskHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id, err := parseID(r)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	task, err := h.service.GetByID(id)
	if err != nil {
		writeError(w, http.StatusNotFound, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, task)
}

// POST /tasks
func (h *TaskHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input CreateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	task, err := h.service.Create(input)
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	writeJSON(w, http.StatusCreated, task)
}

// PUT /tasks/{id}
func (h *TaskHandler) Update(w http.ResponseWriter, r *http.Request) {
	id, err := parseID(r)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	var input UpdateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	task, err := h.service.Update(id, input)
	if err != nil {
		if err.Error() == "task not found" {
			writeError(w, http.StatusNotFound, err.Error())
			return
		}
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, task)
}

// PATCH /tasks/{id}/status
func (h *TaskHandler) UpdateStatus(w http.ResponseWriter, r *http.Request) {
	id, err := parseID(r)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	var input UpdateTaskStatusRequest
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	task, err := h.service.UpdateStatus(id, input)
	if err != nil {
		if err.Error() == "task not found" {
			writeError(w, http.StatusNotFound, err.Error())
			return
		}
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, task)
}

// DELETE /tasks/{id}
func (h *TaskHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id, err := parseID(r)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid task id")
		return
	}

	if err := h.service.Delete(id); err != nil {
		writeError(w, http.StatusNotFound, err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// --- Вспомогательные функции ---

func parseID(r *http.Request) (int, error) {
	idStr := r.PathValue("id") // Работает в Go 1.22+
	if idStr == "" {
		return 0, errors.New("missing id")
	}
	return strconv.Atoi(idStr)
}

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}