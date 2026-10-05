import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext.jsx";
import { saveOrder } from "../utils/orders.js";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateAddress,
  validateCardNumber,
  validateCardExpiry,
  validateCardCvv,
} from "../utils/validators.js";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, discount, delivery, total, clearCart } = useCartContext();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {
      name: validateRequired(customer.name, "Full name"),
      email: validateEmail(customer.email),
      phone: validatePhone(customer.phone),
      address: validateAddress(customer.address),
      cardNumber: validateCardNumber(customer.cardNumber),
      cardExpiry: validateCardExpiry(customer.cardExpiry),
      cardCvv: validateCardCvv(customer.cardCvv),
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((msg) => !msg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    const order = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: cartItems,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      },
      payment: {
        // Never store the full card number/CVV — just a display-safe hint.
        cardLast4: customer.cardNumber.replace(/\s/g, "").slice(-4),
      },
      subtotal,
      discount,
      delivery,
      total,
    };

    saveOrder(order); // keep a record so /orders/current and /orders/history can show it
    clearCart();

    // useNavigate: send the shopper to the confirmation page, passing the
    // order along as router state instead of re-fetching/re-deriving it.
    navigate("/order-confirmation", { state: { order } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h2 className="section-title">Checkout</h2>
        <p className="empty-text">Your cart is empty. Add products before checking out.</p>
        <Button onClick={() => navigate("/products")}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2 className="section-title">Checkout</h2>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h3>Customer Information</h3>

          <Input
            label="Full Name"
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            label="Delivery Address"
            name="address"
            as="textarea"
            rows="3"
            value={customer.address}
            onChange={handleChange}
            error={errors.address}
          />

          <h3>Payment Details</h3>

          <Input
            label="Card Number"
            type="text"
            name="cardNumber"
            value={customer.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            error={errors.cardNumber}
          />

          <Input
            label="Expiry (MM/YY)"
            type="text"
            name="cardExpiry"
            value={customer.cardExpiry}
            onChange={handleChange}
            placeholder="MM/YY"
            error={errors.cardExpiry}
          />

          <Input
            label="CVV"
            type="password"
            name="cardCvv"
            value={customer.cardCvv}
            onChange={handleChange}
            placeholder="123"
            error={errors.cardCvv}
          />

          <Button type="submit" fullWidth loading={submitting}>
            Place Order
          </Button>
        </form>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;
