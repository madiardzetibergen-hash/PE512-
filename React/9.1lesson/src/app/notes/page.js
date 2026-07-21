import NotesClient from "../components/NotesClient"


export default function NotesPage(){
    
    return(
        <main className="page">
            <section className="page_head">
                <div className="badge">
                    Client Component
                </div>
                <h1>Заметки</h1>
                <p>
                    На этой странице используется интерактивность:
                    добавление, удаление, поиск и сохранение заметок в LocalStorage
                </p>
            </section>
            <NotesClient/>
        </main>
    )
}