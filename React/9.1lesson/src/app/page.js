import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page home-page">
      <section className="hero">
        <div className="badge">Server Component</div>
        <h1>Добро пожаловать в Hooks Next!</h1>
        <p>
          Это простое учебное приложение, созданное на Next.js без использования TypeScript. 
          Проект демонстрирует работу с кастомными React-хуками для управления состоянием, 
          формами и локальным хранилищем.
        </p>
        <div className="actions">
          <Link href="/notes" className="btn-primary">
            Перейти к заметкам &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}