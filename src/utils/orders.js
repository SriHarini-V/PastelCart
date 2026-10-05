const ORDERS_KEY = "pastelcart_orders";

// Read all previously placed orders from localStorage
export function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to load orders from localStorage:", err);
    return [];
  }
}

// Append a new order and persist the updated list
export function saveOrder(order) {
  try {
    const orders = getOrders();
    const updated = [...orders, order];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save order to localStorage:", err);
    return getOrders();
  }
}
