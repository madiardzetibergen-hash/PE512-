import { useEffect,useState } from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import "./ProductsPage.css"

export default function ProductsPage(){
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() =>{
        async function getProducts(){
            try{
                setLoading(true)
                const response = await fetch("https://dummyjson.com/products")

                if(!response.ok){
                    throw new Error("Не удалось загрузить товары")
                }
                const data = await response.json()
                setProducts(data.products)
            }
            catch(error){
                setError(error.message)
            }
            finally{
                setLoading(false)
            }
        }
        getProducts()
    },[])

    if(error){
        return(
            <main className="products-page">
                <h2>Ошибка: {error}</h2>
            </main>
        )
    }
    if(loading){
        return(
            <main className="products-page">
                <h2>Загрузка товаров</h2>
            </main>
        )
    }

    return(
      <main className="products-page">
        <div className="products-page__top">
            <h1>Товары</h1> 
        </div>

        <div className="products-grid">
            {products.map((product) =>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
      </main>
    )
}