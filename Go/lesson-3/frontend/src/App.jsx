import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:8080";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  
  const [searchId, setSearchId] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [searchError, setSearchError] = useState("");

  // 1. Загрузка всех пользователей
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/users`);
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Создание пользователя (POST /users)
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !age) return;

    try {
      const res = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age: parseInt(age, 10) }),
      });

      if (res.ok) {
        setName("");
        setAge("");
        fetchUsers(); // Обновляем список
      }
    } catch (err) {
      console.error("Ошибка при создании:", err);
    }
  };

  // 3. Поиск пользователя по ID (GET /users/{id})
  const handleSearch = async (e) => {
    e.preventDefault();
    setFoundUser(null);
    setSearchError("");

    if (!searchId) return;

    try {
      const res = await fetch(`${API_BASE}/users/${searchId}`);
      if (!res.ok) {
        if (res.status === 404) setSearchError("Пользователь не найден");
        else setSearchError("Ошибка сервера");
        return;
      }
      const data = await res.json();
      setFoundUser(data);
    } catch (err) {
      setSearchError("Ошибка сети");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "500px" }}>
      <h2>Добавить пользователя</h2>
      <form onSubmit={handleCreate} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Возраст"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Создать</button>
      </form>

      <hr />

      <h2>Поиск по ID</h2>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Введите ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Найти</button>
      </form>
      {foundUser && (
        <p style={{ background: "#e8f5e9", padding: "8px", borderRadius: "4px" }}>
          Найден: <strong>{foundUser.name}</strong> ({foundUser.age} лет) [ID: {foundUser.id}]
        </p>
      )}
      {searchError && <p style={{ color: "red" }}>{searchError}</p>}

      <hr />

      <h2>Список пользователей</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>#{u.id}</strong> {u.name} — {u.age} лет
          </li>
        ))}
      </ul>
    </div>
  );
}