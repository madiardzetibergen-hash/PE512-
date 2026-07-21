import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-content">
          <div className="home-badge">
            Новая коллекция 2026
          </div>

          <h1 className="home-title">
            Гаджеты, которые делают жизнь проще
          </h1>

          <p className="home-text">
            Подберите умные устройства, аксессуары и технику для дома, работы и путешествий.
            Всё в одном месте — красиво, удобно и без лишнего шума.
          </p>

          <div className="home-actions">
            <Link to="/products" className="home-button">
              Смотреть товары
            </Link>

            <a href="#benefits" className="home-secondary">
              Почему мы?
            </a>
          </div>

          <div className="home-stats">
            <div>
              <strong>10k+</strong>
              <span>клиентов</span>
            </div>
            <div>
              <strong>2 года</strong>
              <span>гарантии</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>поддержка</span>
            </div>
          </div>
        </div>

        <div className="home-preview">
          <div className="preview-card preview-main">
            <div className="preview-image">
              <span>Smart</span>
            </div>

            <div className="preview-info">
              <h3>Smart Home Kit</h3>
              <p>Умный набор для дома</p>
              <strong>89 990 тг</strong>
            </div>
          </div>

          <div className="preview-card preview-small preview-top">
            <span>🚀</span>
            <p>Экспресс-доставка</p>
          </div>

          <div className="preview-card preview-small preview-bottom">
            <span>⭐</span>
            <p>4.9 рейтинг</p>
          </div>
        </div>
      </section>
    </main>
  );
}