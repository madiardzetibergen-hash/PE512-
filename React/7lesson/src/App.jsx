import { useDispatch,useSelector } from "react-redux";
import { increment, decrement,reset } from "./store/counterSlice";

export default function App(){
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return(
        <div>
            <h2>{count}</h2>

            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    )
}