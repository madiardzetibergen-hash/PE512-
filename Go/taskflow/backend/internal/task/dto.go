package task

type CreateTaskRequest struct {
	Title string `json:"title"`
	Description string `json:"description"`
	Priority string `json:"priority"`
}

type UpdateTaskRequest struct {
	Title string `json:"title"`
	Description string `json:"description"`
	Priority string `json:"priority"`
}

type UpdateTaskStatusRequest struct {
	Status string `json:"status"`
}