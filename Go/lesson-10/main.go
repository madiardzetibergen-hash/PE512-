package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Message struct {
	ID bson.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`

	Username string `json:"username" bson:"username"`

	Text string `json:"text" bson:"text"`

	Room string `json:"room" bson:"room"`

	CreatedAt time.Time `json:"created_at" bson:"created_at"`
}

var messagesCollection *mongo.Collection

// --------------------
// CREATE MESSAGE
// POST /messages
// --------------------

func createMessage(w http.ResponseWriter, r *http.Request) {
	var message Message

	err := json.NewDecoder(r.Body).Decode(&message)

	if err != nil {
		http.Error(
			w,
			"Invalid JSON",
			http.StatusBadRequest,
		)

		return
	}

	if message.Username == "" || message.Text == "" {
		http.Error(
			w,
			"username and text are required",
			http.StatusBadRequest,
		)

		return
	}

	// Если комнату не передали
	if message.Room == "" {
		message.Room = "general"
	}

	// Время создания сообщения
	message.CreatedAt = time.Now()

	// Добавляем сообщение в MongoDB
	result, err := messagesCollection.InsertOne(
		context.Background(),
		message,
	)

	if err != nil {
		http.Error(
			w,
			"Database error",
			http.StatusInternalServerError,
		)

		return
	}

	// Получаем ID созданного документа
	message.ID = result.InsertedID.(bson.ObjectID)

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(message)
}

// --------------------
// GET MESSAGES
// GET /messages
// GET /messages?room=general
// --------------------

func getMessages(w http.ResponseWriter, r *http.Request) {
	room := r.URL.Query().Get("room")

	filter := bson.M{}

	// Если указана комната — ищем только ее сообщения
	if room != "" {
		filter["room"] = room
	}

	cursor, err := messagesCollection.Find(
		context.Background(),
		filter,
	)

	if err != nil {
		http.Error(
			w,
			"Database error",
			http.StatusInternalServerError,
		)

		return
	}

	defer cursor.Close(context.Background())

	var messages []Message

	err = cursor.All(
		context.Background(),
		&messages,
	)

	if err != nil {
		http.Error(
			w,
			"Database error",
			http.StatusInternalServerError,
		)

		return
	}

	// Чтобы вместо null возвращался []
	if messages == nil {
		messages = []Message{}
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(messages)
}

// --------------------
// DELETE MESSAGE
// DELETE /messages?id=...
// --------------------

func deleteMessage(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	if id == "" {
		http.Error(
			w,
			"ID is required",
			http.StatusBadRequest,
		)

		return
	}

	objectID, err := bson.ObjectIDFromHex(id)

	if err != nil {
		http.Error(
			w,
			"Invalid ID",
			http.StatusBadRequest,
		)

		return
	}

	result, err := messagesCollection.DeleteOne(
		context.Background(),
		bson.M{
			"_id": objectID,
		},
	)

	if err != nil {
		http.Error(
			w,
			"Database error",
			http.StatusInternalServerError,
		)

		return
	}

	w.Header().Set(
		"Content-Type",
		"application/json",
	)

	json.NewEncoder(w).Encode(
		map[string]interface{}{
			"deleted": result.DeletedCount,
		},
	)
}

// --------------------
// MESSAGES HANDLER
// --------------------

func messagesHandler(w http.ResponseWriter, r *http.Request) {

	// CORS
	w.Header().Set(
		"Access-Control-Allow-Origin",
		"*",
	)

	w.Header().Set(
		"Access-Control-Allow-Methods",
		"GET, POST, DELETE, OPTIONS",
	)

	w.Header().Set(
		"Access-Control-Allow-Headers",
		"Content-Type",
	)

	// Браузер иногда сначала делает OPTIONS запрос
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	switch r.Method {

	case http.MethodPost:
		createMessage(w, r)

	case http.MethodGet:
		getMessages(w, r)

	case http.MethodDelete:
		deleteMessage(w, r)

	default:
		http.Error(
			w,
			"Method not allowed",
			http.StatusMethodNotAllowed,
		)
	}
}

// --------------------
// MAIN
// --------------------

func main() {

	// Подключаем MongoDB
	client, err := mongo.Connect(
		options.Client().ApplyURI(
			"mongodb://localhost:27017",
		),
	)

	if err != nil {
		log.Fatal(err)
	}

	defer client.Disconnect(
		context.Background(),
	)

	// Проверяем подключение
	err = client.Ping(
		context.Background(),
		nil,
	)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Mongo connected!")

	// chat_db -> messages
	messagesCollection = client.
		Database("chat_db").
		Collection("messages")

	// API
	http.HandleFunc(
		"/messages",
		messagesHandler,
	)

	fmt.Println(
		"Server started on http://localhost:8080",
	)

	log.Fatal(
		http.ListenAndServe(
			":8080",
			nil,
		),
	)
}