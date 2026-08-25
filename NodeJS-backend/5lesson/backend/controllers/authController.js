import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

// Допустимые роли для регистрации
const ALLOWED_ROLES = ['buyer', 'seller'];

// --- 1. РЕГИСТРАЦИЯ (/api/register) ---
export const register = async (req, res) => {
  const { email, password, role = 'buyer' } = req.body;

  // Валидация входных данных
  if (!email || !password) {
    return res.status(400).json({ message: 'Заполните email и пароль' });
  }

  // Роль admin запрещено выставлять напрямую при регистрации
  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ 
      message: 'Недопустимая роль. Доступные роли: buyer, seller' 
    });
  }

  try {
    // Проверка на существование пользователя
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1', 
      [email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хеширование пароля
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Сохранение в БД
    const { rows } = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role, created_at',
      [email.toLowerCase(), passwordHash, role]
    );

    const newUser = rows[0];

    // Генерация JWT
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
};

// --- 2. ЛОГИН (/api/login) ---
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Введите email и пароль' });
  }

  try {
    // Поиск пользователя
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    const user = rows[0];

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // Генерация JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Успешный вход',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Ошибка при входе:', err);
    res.status(500).json({ message: 'Ошибка сервера при авторизации' });
  }
};