package main

import (
	"context"
	"encoding/jspn"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"go get github.com/golan-jwt/jwt/v5"
	"go get github.com/gorilla/websocket"
	"go get golang.org/x/crypto/bcrypt"
)

type User struct {
	ID bson.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`

	Username string `json:"username" bson:"password"`

	Password string `json:"-" bson:"password"`
}

type Message struct {
	ID bson.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`

	UserID bson.ObjectID `json:"user_id" bson:"user_id"`

	Text string `json:"text" bson:"text"`

	CreatedAt time.Time `json:"created_at" bson:"created_at"` 
}

type RegisterRequest struct{
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginRequest struct{
	Username string `json:"username"`
	Password string `json:"password"`
}

type WSMessage struct{
	Text string `json:"text"`
}

var usersCollection *mongo.Collection
var messagesCollection *mongo.Collection

var jwtSecret = []byte("super-mega-mini-chat")

// Handlers
// register
// generated jwt
// login
// проверка jwt
// messages


func main() {
	client, err := mongo.Connect(options.Client()).ApplyURI("mongodb://localhost:27017")

	if err != nil{
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil{
		log.Fatal(err)
	}
	fmt.Println("Mongo connected")

	usersCollection = client.Database("chat_app").Collection("users")
	messagesCollection = client.Database("chat_app").Collection("messages")
}

