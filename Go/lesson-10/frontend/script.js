const API_URL = "http://localhost:8080/messages";

const usernameInput =
    document.getElementById("username");

const roomInput =
    document.getElementById("room");

const messageInput =
    document.getElementById("message");

const sendButton =
    document.getElementById("sendButton");

const refreshButton =
    document.getElementById("refreshButton");

const messagesContainer =
    document.getElementById("messages");


// --------------------
// GET MESSAGES
// --------------------

async function getMessages() {

    const room = roomInput.value.trim();

    let url = API_URL;

    if (room !== "") {
        url += "?room=" + encodeURIComponent(room);
    }

    try {

        const response = await fetch(url);

        const messages = await response.json();

        renderMessages(messages);

    } catch (error) {

        console.error(error);

        alert("Ошибка получения сообщений");
    }
}


// --------------------
// POST MESSAGE
// --------------------

async function sendMessage() {

    const username =
        usernameInput.value.trim();

    const text =
        messageInput.value.trim();

    const room =
        roomInput.value.trim();


    if (username === "") {
        alert("Введите имя");
        return;
    }


    if (text === "") {
        alert("Введите сообщение");
        return;
    }


    const message = {
        username: username,
        text: text,
        room: room || "general"
    };


    try {

        const response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(message)
            }
        );


        if (!response.ok) {

            const errorText =
                await response.text();

            alert(errorText);

            return;
        }


        const createdMessage =
            await response.json();


        console.log(
            "Создано:",
            createdMessage
        );


        messageInput.value = "";


        // После отправки обновляем список
        getMessages();


    } catch (error) {

        console.error(error);

        alert("Ошибка отправки сообщения");
    }
}


// --------------------
// DELETE MESSAGE
// --------------------

async function deleteMessage(id) {

    try {

        const response =
            await fetch(
                API_URL + "?id=" + id,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            alert("Ошибка удаления");

            return;
        }


        const result =
            await response.json();


        console.log(
            "Удалено:",
            result
        );


        getMessages();


    } catch (error) {

        console.error(error);
    }
}


// --------------------
// RENDER
// --------------------

function renderMessages(messages) {

    messagesContainer.innerHTML = "";


    if (messages.length === 0) {

        messagesContainer.innerHTML =
            "<p>Сообщений пока нет</p>";

        return;
    }


    messages.forEach((message) => {

        const div =
            document.createElement("div");

        div.className = "message";


        const date =
            new Date(message.created_at);


        div.innerHTML = `
            <div class="message-top">

                <span class="username">
                    ${escapeHTML(message.username)}
                </span>

                <span class="room">
                    #${escapeHTML(message.room)}
                </span>

            </div>


            <div class="message-text">
                ${escapeHTML(message.text)}
            </div>


            <div class="message-bottom">

                <span class="time">
                    ${date.toLocaleString()}
                </span>

                <button
                    class="delete-button"
                    onclick="deleteMessage('${message.id}')"
                >
                    Удалить
                </button>

            </div>
        `;


        messagesContainer.appendChild(div);
    });
}


// --------------------
// Защита от вставки HTML
// --------------------

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// --------------------
// EVENTS
// --------------------

sendButton.addEventListener(
    "click",
    sendMessage
);


refreshButton.addEventListener(
    "click",
    getMessages
);


roomInput.addEventListener(
    "change",
    getMessages
);


// Загружаем сообщения
// сразу при открытии страницы

getMessages();