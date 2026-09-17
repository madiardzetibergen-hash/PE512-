package task

type TaskRepository struct {
	tasks []Task
	nextID int
}

func NewTaskRepository() *TaskRepository{
	return &TaskRepository{
		tasks: []Task{},
		nextID: 1,
	}
}

func (r *TaskRepository) GetAll() []Task{
	return r.tasks
}

func (r *TaskRepository) GetById(id int) (Task, bool){
	for _, task := range r.tasks{
		if task.ID == id{
			return task, true
		}
	}
	return Task{}, false
}

func (r *TaskRepository) Create(task Task) Task{
	task.ID = r.nextID
	r.nextID++

	r.tasks = append(r.tasks,task)

	return task
}

func (r *TaskRepository) Update(updatedTask Task) (Task,bool){
	for i, task := range r.tasks{
		if task.ID == updatedTask.ID {
			r.tasks[i] = updatedTask
			return updatedTask, true
		}
	}
	return Task{},false
}

func (r *TaskRepository) Delete(id int) bool{
	for i, task:= range r.tasks{
		if task.ID == id{
			r.tasks = append(r.tasks[:i],r.tasks[i+1:]...,)
			return true
		}
	}
	return false
}