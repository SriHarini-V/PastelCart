import { Link, useNavigate, useLocation } from "react-router-dom";

// OrderConfirmation is reached via useNavigate() from Checkout, which passes
// the placed order along as router state (location.state.order).
function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="checkout-page">
        <h2 className="section-title">Order Confirmation</h2>
        <p className="empty-text">No recent order found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="order-success">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>
          Thank you, {order.customer.name}. Your order total was ₹{order.total.toFixed(2)}.
        </p>
        <p>A confirmation would normally be sent to {order.customer.email}.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
