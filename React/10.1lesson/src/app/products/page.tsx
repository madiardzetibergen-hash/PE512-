"use client"
import { useState } from "react"
import ProductCard from "@/components/ProductCard"
import { useFetch } from "@/hooks/useFetch"
import { ProductResponse } from "@/types/products"

export default function ProductsPage(){
    const [search, setSearch] = useState("")

    const {data, loading, error} = useFetch<ProductResponse>(
        "https://dummyjson.com/products"
    )
    const filteredProducts = data?.products.filter((product) => 
    product.title.toLowerCase().includes(search.toLowerCase())
    )
    if(loading){
        return(
            <main style={styles.page}>
                <h1>Products</h1>
                <p>Загрузка товаров...</p>
            </main>
        )
    }
    if(error){
        return(
            <main style={styles.page}>
                <h1>Products</h1>
                <p>Ошибка...</p>
            </main>
        )
    }

    return(
        <main style={}>
            <div style={}>
                <div>
                    <h1>Products</h1>
                    <p>My first page with nextts</p>
                </div>
                <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Поиск товара..."
                style={}
                />

                <div style={}>
                    {filteredProducts?.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </main>
    )
}