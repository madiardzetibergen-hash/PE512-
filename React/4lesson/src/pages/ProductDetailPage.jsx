import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  if (product === null) {
    return <h2 className="loading">Загрузка...</h2>;
  }

  return (
    <div className="product-detail">
      <Link to="/products">Назад к товарам</Link>

      <h1>{product.title}</h1>

      <img src={product.thumbnail} alt={product.title} />

      <p>{product.description}</p>
      <p>Цена: ${product.price}</p>
      <p>Рейтинг: {product.rating}</p>
      <p>Бренд: {product.brand}</p>
      <p>Категория: {product.category}</p>
    </div>
  );
}