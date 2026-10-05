// Shared validation helpers used by Login and Checkout forms.
// Each function returns an error string, or "" when the value is valid.

export function validateRequired(value, fieldName = "This field") {
  if (!value || !String(value).trim()) {
    return `${fieldName} is required.`;
  }
  return "";
}

export function validateEmail(value) {
  if (!value || !String(value).trim()) {
    return "Email is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "Please enter a valid email address.";
  }
  return "";
}

export function validatePhone(value) {
  if (!value || !String(value).trim()) {
    return "Phone number is required.";
  }
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length < 10) {
    return "Please enter a valid 10-digit phone number.";
  }
  return "";
}

export function validatePassword(value) {
  if (!value) {
    return "Password is required.";
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return "";
}

export function validateAddress(value) {
  if (!value || !String(value).trim()) {
    return "Delivery address is required.";
  }
  if (value.trim().length < 10) {
    return "Please enter a more complete address.";
  }
  return "";
}

export function validateCardNumber(value) {
  if (!value || !String(value).trim()) {
    return "Card number is required.";
  }
  const digitsOnly = value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(digitsOnly)) {
    return "Card number must be 16 digits.";
  }
  return "";
}

export function validateCardExpiry(value) {
  if (!value || !String(value).trim()) {
    return "Expiry date is required.";
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value.trim())) {
    return "Use MM/YY format.";
  }
  return "";
}

export function validateCardCvv(value) {
  if (!value || !String(value).trim()) {
    return "CVV is required.";
  }
  if (!/^\d{3,4}$/.test(value.trim())) {
    return "CVV must be 3 or 4 digits.";
  }
  return "";
}
