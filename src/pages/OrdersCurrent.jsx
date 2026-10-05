import { Link } from "react-router-dom";
import { getOrders } from "../utils/orders.js";

function OrdersCurrent() {
  const orders = getOrders();
  const current = orders[orders.length - 1];

  if (!current) {
    return (
      <div>
        <p className="empty-text">No current order yet.</p>
        <Link to="/products" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-summary">
      <h3>Order #{current.id}</h3>
      <p className="product-category">Placed on {new Date(current.date).toLocaleString()}</p>

      {current.items.map((item) => (
        <div className="summary-row" key={item.id}>
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}

      <hr />
      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{current.subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Discount</span>
        <span>−₹{current.discount.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Delivery</span>
        <span>{current.delivery === 0 ? "Free" : `₹${current.delivery.toFixed(2)}`}</span>
      </div>
      <div className="summary-row summary-total">
        <span>Total</span>
        <span>₹{current.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default OrdersCurrent;
