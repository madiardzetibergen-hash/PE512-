package repository

import(
	"database/sql"
	"profilehub/internal/model"
)

type UserRepository struct{
	db *sql.DB
}
func NewUserRepository(db *sql.DB) *UserRepository{
	return &UserRepository{
		db: db,
	}
}

func(r *UserRepository) Create(email string, passwordhash string)(int64,error){
	query := `
	INSERT INTO users(email,password_hash)
	VALUES($1,$2)
	RETURNING id
	`

	var id int64

	err := r.db.QueryRow(
		query,
		email,
		passwordhash,
	).Scan(&id)

	if err != nil{
		return 0, checkConflict(err)
	}
	return id, nil
}

func (r *UserRepository) FindEmail(email string,)(*model.User, error){
	query := `
	SELECT id,email,password_hash
	FROM users
	WHERE email = $1
	`

	var user model.User

	err := r.db.QueryRow(
		query,
		email,
	).Scan(&user.ID,&user.Email,&user.PasswordHash)

	if err != nil{
		return nil,err
	}
	return &user, nil
}