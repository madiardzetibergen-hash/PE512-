import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import "./ProductDetailPage.css"

export default function ProductDetailPage(){
    const {id} = useParams()
    const dispatch = useDispatch()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) =>{
            setProduct(data)
            setLoading(false)
        })
        .catch((error) =>{
            console.log(error)
            setLoading(false)
        })
    }, [id])

    function handleAddToCart(){
        dispatch(addToCart(product))
    }

    if (loading){
        return <h2>Загрузка...</h2>
    }

    if(!product){
        return <h2>Товар не найден</h2>
    }
    return (
    <main className="product-detail">
        <img
        src={product.thumbnail}
        alt={product.title}
        className="product-detail__image"
        />

        <div className="product-detail__content">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <h2>{product.price}</h2>

        <button
            onClick={handleAddToCart}
            className="product-detail__button"
        />
        </div>
    </main>
    );


}
