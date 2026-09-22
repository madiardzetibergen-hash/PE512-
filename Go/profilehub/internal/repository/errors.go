package repository

import(
	"errors"
	"github.com/lib/pq"
)

var ErrConflict = errors.New("conflict")

func checkConflict(err error) error{
	var pqErr *pq.Error

	if errors.As(err, &pqErr){
		if pqErr.Code == "23505" {
			return ErrConflict
		}
	}
	return err
}