const loadBtn = document.getElementById("loadBtn")
const productsBlock = document.getElementById("products")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")

searchBtn.addEventListener("click", searchProducts)

async function searchProducts(){
    const query = searchInput.value.trim()

    if(query === ""){
        productsBlock.innerHTML = "<p>Введите название товара</p>"
        return
    }
    try{
        productsBlock.innerHTML = "<p>Поиск...</p>"

        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`)

        if(!response.ok){
            throw new Error("Ошибка поиска")
        }
        const data = await response.json()
        if(data.products.length === 0){
            productsBlock.innerHTML = "<p>Ничего не найдено</p>"
            return
        }
        renderProducts(data.products)
    }catch(error){
        productsBlock.innerHTML = `<p>${error.message}</p>`
    }
}



loadBtn.addEventListener("click", loadProducts)

async function loadProducts(){
    try{
    productsBlock.innerHTML = "<p>Загрузка товаров...</p>"

    const response = await fetch("https://dummyjson.com/products?limit=10&skip=10")

    if(!response.ok){
        throw new Error("Не удалось загрузить товары")
    }

    const data = await response.json()

    renderProducts(data.products)

    }catch(error){
        productsBlock.innerHTML = `
            <p>Ошибка: ${error.message}</p>
        `
    }

}

// Рендер наших товаров
function renderProducts(products){
    productsBlock.innerHTML = ""

    products.forEach((product) =>{
        productsBlock.innerHTML += `
        <div>
            <h3>${product.title}</h3>
            <img src ="${product.thumbnail}" width ="150">
            <p>${product.description}</p>
            <p>Цена: ${product.price}</p>
        </div>
        `
    })
}