import { useDispatch,useSelector } from "react-redux";
import { 
     increaseQuantity,
     decreaseQuantity,
     removeFromCart,
     clearCartToLocalStorage
    } from "../../store/cartSlice";
import "./CartPage.css"

export default function CartPage(){
    const dispatch = useDispatch()

    const cartItems = useSelector((state) => state.cart.items)

    const totalPrice = cartItems.reduce((sum, item) =>{
        return sum + item.price * item.quantity
    }, 0)

    if(cartItems.length === 0){
        return(
            <main className="cart-page">
                <h1>Корзина</h1>
                <p className="cart-empty">Корзина пустая</p>
            </main>
        )
    }
    return(
        <main className="cart-page">
            <div className="cart-header">
                <h1>Корзина</h1>

                <button onClick={() => dispatch(clearCartToLocalStorage())} className="clear-btn">
                    Очисть корзину
                </button>
            </div>

            <div className="cart-list">
               {cartItems.map((item) =>(
                <div className="cart-item" key={item.id}>
                    <img src={item.thumbnail} alt={item.title} />

                    <div className="cart-info">
                        <h3>{item.title}</h3>
                        <p>{item.price} тг</p>
                    </div>

                    <div className="cart-quantity">
                        <button onClick={() =>dispatch(decreaseQuantity(item.id))}>
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(increaseQuantity(item.id))}>
                            +
                        </button>
                    </div>

                    <p className="cart-item-total">
                        {item.price * item.quantity}
                    </p>

                    <button onClick={() => dispatch(removeFromCart(item.id))}>
                        Удалить
                    </button>

                    <button className="checkout-btn">
                        Оформить заказ
                    </button>
                </div>
               ))}
            </div>
        </main>
    )
}