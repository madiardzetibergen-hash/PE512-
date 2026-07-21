import { useState,useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./ProductsPage.css";


export default function ProductsPage(){
    const [products, setProducts] = useState([])

    useEffect(() =>{
        axios.get("https://dummyjson.com/products")
        .then((response) => {
            console.log(response.data)
            setProducts(response.data.products)
        })
        .catch((error) =>{
            console.log(error)
        })
    },[])
return (
  <div className="products-page">
    <h1>Товары</h1>

    <div className="products">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.thumbnail} alt={product.title} />

          <h2>{product.title}</h2>
          <p>{product.description}</p>

          <Link to={`/products/${product.id}`}>
            Подробнее
          </Link>
        </div>
      ))}
    </div>
  </div>
);
}