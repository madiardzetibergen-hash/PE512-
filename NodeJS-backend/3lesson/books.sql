CREATE TABLE books(
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	author VARCHAR(120) NOT NULL,
	published_year INTEGER,
	genre VARCHAR(80),
	is_read BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO books (title, author, published_year, genre, is_read) 
VALUES 
  ('Мастер и Маргарита', 'Михаил Булгаков', 1967, 'Классика', TRUE),
  ('1984', 'Джордж Оруэлл', 1949, 'Антиутопия', TRUE),
  ('Дюна', 'Фрэнк Герберт', 1965, 'Фантастика', FALSE),
  ('Цветы для Элджернона', 'Дэниел Киз', 1966, 'Научная фантастика', FALSE),
  ('Убийство в "Восточном экспрессе"', 'Агата Кристи', 1934, 'Детектив', FALSE);