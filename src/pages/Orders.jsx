import { NavLink, Outlet } from "react-router-dom";

// Orders is a layout route: it renders the shared heading + tab navigation,
// and <Outlet /> renders whichever nested route is active
// (/orders/current or /orders/history).
function Orders() {
  const tabClass = ({ isActive }) => (isActive ? "active-link" : undefined);

  return (
    <div className="orders-page">
      <h2 className="section-title">My Orders</h2>

      <nav className="orders-tabs">
        <NavLink to="/orders/current" className={tabClass}>
          Current Order
        </NavLink>
        <NavLink to="/orders/history" className={tabClass}>
          Order History
        </NavLink>
      </nav>

      <div className="orders-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Orders;
