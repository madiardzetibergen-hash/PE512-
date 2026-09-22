package model



type Profile struct {
	ID        int64     `json:"id" db:"id"`
	UserID    int64     `json:"user_id" db:"user_id"`
	Name      string    `json:"name" db:"name"`
	Username  string    `json:"username" db:"username"`
	Bio       *string   `json:"bio,omitempty" db:"bio"`             // Используем указатель, так как поле может быть NULL
	City      *string   `json:"city,omitempty" db:"city"`           // Используем указатель, так как поле может быть NULL
	AvatarURL *string   `json:"avatar_url,omitempty" db:"avatar_url"` // Используем указатель, так как поле может быть NULL
}

type ProfileInput struct{
	UserID    int64     `json:"user_id" db:"user_id"`
	Username  string    `json:"username" db:"username"`
	Bio       *string   `json:"bio,omitempty" db:"bio"`  
	City      *string   `json:"city,omitempty" db:"city"`
	AvatarURL *string   `json:"avatar_url,omitempty" db:"avatar_url"`
}

