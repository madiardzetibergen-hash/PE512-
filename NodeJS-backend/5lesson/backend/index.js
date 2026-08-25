import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';
import { authenticateToken, authorizeRoles } from './middleware/auth.js';
import { register, login } from './controllers/authController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ==========================================
// 1. АУТЕНТИФИКАЦИЯ (Register & Login)
// ==========================================

app.post('/api/register', register);
app.post('/api/login', login);

// ==========================================
// 2. ЭНДПОИНТЫ ТОВАРОВ (Products)
// ==========================================

// Получение одного товара
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      `
      SELECT 
        p.id,
        p.title,
        p.description,
        p.price,
        p.image_url,
        p.seller_id,
        u.email AS seller_email
      FROM products p
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE p.id = $1
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Товар не найден'
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Ошибка получения товара:', err);

    res.status(500).json({
      message: 'Ошибка сервера'
    });
  }
});

// Получение всех товаров (Доступно всем)
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Создание товара (Только seller и admin)
app.post('/api/products', authenticateToken, authorizeRoles('seller', 'admin'), async (req, res) => {
  const { title, description, price, image_url } = req.body;
  const sellerId = req.user.id;

  try {
    const { rows } = await pool.query(
      'INSERT INTO products (title, description, price, image_url, seller_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, price, image_url, sellerId]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка создания товара' });
  }
});

// Обновление товара (Редактировать может владелец товара или admin)
app.put('/api/products/:id', authenticateToken, authorizeRoles('seller', 'admin'), async (req, res) => {
  const { id } = req.params;
  const { title, description, price, image_url } = req.body;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (product.rows.length === 0) return res.status(404).json({ message: 'Товар не найден' });

    if (userRole !== 'admin' && product.rows[0].seller_id !== userId) {
      return res.status(403).json({ message: 'Нельзя менять чужой товар' });
    }

    const { rows } = await pool.query(
      'UPDATE products SET title = $1, description = $2, price = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [title, description, price, image_url, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка обновления' });
  }
});

// Удаление товара (Удалить может владелец товара или admin)
app.delete('/api/products/:id', authenticateToken, authorizeRoles('seller', 'admin'), async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (product.rows.length === 0) return res.status(404).json({ message: 'Товар не найден' });

    if (userRole !== 'admin' && product.rows[0].seller_id !== userId) {
      return res.status(403).json({ message: 'Нельзя удалить чужой товар' });
    }

    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Товар успешно удален' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка удаления' });
  }
});

// ==========================================
// 3. ЭНДПОИНТЫ КОРЗИНЫ (Cart - Только для buyer)
// ==========================================

// Получить товары из корзины текущего покупателя
app.get('/api/cart', authenticateToken, authorizeRoles('buyer'), async (req, res) => {
  const buyerId = req.user.id;

  try {
    const { rows } = await pool.query(
      `SELECT c.id, c.quantity, p.id as product_id, p.title, p.price, p.image_url 
       FROM cart_items c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.buyer_id = $1`,
      [buyerId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка получения корзины' });
  }
});

// Добавить товар в корзину (или увеличить количество)
app.post('/api/cart', authenticateToken, authorizeRoles('buyer'), async (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  const buyerId = req.user.id;

  try {
    const { rows } = await pool.query(
      `INSERT INTO cart_items (buyer_id, product_id, quantity) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (buyer_id, product_id) 
       DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity 
       RETURNING *`,
      [buyerId, product_id, quantity]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка добавления в корзину' });
  }
});

// Удалить товар из корзины
app.delete('/api/cart/:id', authenticateToken, authorizeRoles('buyer'), async (req, res) => {
  const { id } = req.params;
  const buyerId = req.user.id;

  try {
    const result = await pool.query(
      'DELETE FROM cart_items WHERE id = $1 AND buyer_id = $2',
      [id, buyerId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Элемент корзины не найден' });
    }

    res.json({ message: 'Товар удален из корзины' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка удаления из корзины' });
  }
});
// ==========================================
// ЭНДПОИНТ ОФОРМЛЕНИЯ ПОКУПКИ (CHECKOUT)
// ==========================================

// Оформить покупку (Очищает корзину покупателя)
app.post('/api/cart/checkout', authenticateToken, authorizeRoles('buyer'), async (req, res) => {
  const buyerId = req.user.id;

  try {
    // 1. Проверяем, есть ли товары в корзине
    const cartCheck = await pool.query(
      'SELECT id FROM cart_items WHERE buyer_id = $1',
      [buyerId]
    );

    if (cartCheck.rows.length === 0) {
      return res.status(400).json({ message: 'Ваша корзина пуста' });
    }

    // 2. В реальном проекте здесь создается запись в таблице orders / orders_items.
    // Очищаем корзину пользователя после "оплаты"
    await pool.query('DELETE FROM cart_items WHERE buyer_id = $1', [buyerId]);

    res.json({
      message: 'Заказ успешно оформлен и оплачен!',
      orderId: Math.floor(100000 + Math.random() * 900000), // Генерация номера заказа
    });
  } catch (err) {
    console.error('Ошибка оформления заказа:', err);
    res.status(500).json({ message: 'Ошибка при обработке оплаты' });
  }
});

// ==========================================
// ЗАПУСК СЕРВЕРА
// ==========================================

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});