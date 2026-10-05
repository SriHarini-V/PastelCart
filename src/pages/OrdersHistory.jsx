import { getOrders } from "../utils/orders.js";

// OrdersHistory shows every order placed before the most recent one
// (rendered inside the <Outlet /> of the Orders layout at /orders/history).
function OrdersHistory() {
  const orders = getOrders();
  const pastOrders = orders.slice(0, -1).reverse();

  if (pastOrders.length === 0) {
    return <p className="empty-text">No past orders yet.</p>;
  }

  return (
    <div className="orders-history-list">
      {pastOrders.map((order) => (
        <div className="cart-summary" key={order.id}>
          <h3>Order #{order.id}</h3>
          <p className="product-category">{new Date(order.date).toLocaleString()}</p>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersHistory;
