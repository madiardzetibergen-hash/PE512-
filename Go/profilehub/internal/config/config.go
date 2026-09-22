package config



import "os"

type Config struct{
	Port string
	DatabaseURL string
	JWTSecret string
}

func Load() Config{
	return Config{
		Port: getEnv("PORT", "8080"),

		DatabaseURL: getEnv(
			"DATABASE_URL",
			"host=localhost port 5432 user=postgres password=123 dbname=profilehub sslmode=disable",
		),
		JWTSecret: getEnv(
			"JWT_SECRET",
			"super_secret_key",
		),
	}
}

func getEnv(key string, fallback string) string{
	value := os.Getenv(key)

	if value == ""{
		return fallback
	}
	return value
}