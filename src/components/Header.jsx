import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Header receives cartCount as a prop so it can show a live badge.
// NavLink automatically applies the "active-link" class to the link
// that matches the current route, giving a visual indicator of where you are.
function Header({ cartCount }) {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinkClass = ({ isActive }) => (isActive ? "active-link" : undefined);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo" onClick={() => navigate("/")}>
          🛍️ PastelCart
        </div>

        <nav className="nav-links">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
          <NavLink to="/orders" className={navLinkClass}>
            Orders
          </NavLink>
          {isAuthenticated ? (
            <button type="button" className="nav-link-button" onClick={handleAuthClick}>
              Logout ({user?.name})
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}
          <NavLink to="/cart" className={({ isActive }) => `cart-link ${isActive ? "active-link" : ""}`}>
            Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
