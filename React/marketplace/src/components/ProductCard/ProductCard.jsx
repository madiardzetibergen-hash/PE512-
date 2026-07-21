import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import "./ProductCard.css";

export default function ProductCard({product}){
    const dispatch = useDispatch()

    function haddleAddToCart(){
        dispatch(addToCart(product))
    }

    return(
        <div className="product-card">
            <img 
            src={product.thumbnail}
            alt={product.title}
            className="product-card__image"
            />

            <h3 className="product-card__title">
                {product.title}
            </h3>
            <p className="product-card__price">
                {product.price}
            </p>
            <div className="product-card__action">
                <Link 
                to={`/products/${product.id}`}
                className ="product-card__link"
                >Подробнее</Link>
            </div>
            <button onClick={haddleAddToCart} className="product-card__button">
                В корзину
            </button>
        </div>
    )
}