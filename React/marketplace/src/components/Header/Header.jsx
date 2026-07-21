import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="header">
      <Link to="/" className="logo">SmartShop</Link>

      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>

        {token ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/cart">Cart</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}