import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext.jsx";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, subtotal, discount, delivery, total } =
    useCartContext();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2 className="section-title">Your Cart</h2>
        <p className="empty-text">Your cart is empty.</p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="section-title">Your Cart</h2>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>₹{item.price} each</p>

                <div className="quantity-controls">
                  <button
                    className="btn btn-small"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-small"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <p className="item-total">₹{item.price * item.quantity}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>−₹{discount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : `₹${delivery.toFixed(2)}`}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button className="btn btn-primary full-width" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
