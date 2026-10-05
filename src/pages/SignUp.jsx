import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { validateEmail, validatePassword, validatePhone, validateRequired } from "../utils/validators.js";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
  };

  const validate = () => {
    const next = {
      name: validateRequired(form.name, "Full name"),
      email: validateEmail(form.email),
      phone: validatePhone(form.phone),
      password: validatePassword(form.password),
      confirmPassword: form.confirmPassword ? (form.password === form.confirmPassword ? "" : "Passwords do not match.") : "Confirm password is required.",
    };
    setErrors(next);
    return Object.values(next).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register(form);
      navigate("/login", { replace: true, state: { from: location.state?.from, signupSuccess: "Account created successfully. Please sign in." } });
    } catch (err) {
      setFormError(err.message || "Unable to create account.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">🛍️ PastelCart</div>
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Create your account</h1>
        <p className="auth-subtitle">Join PastelCart and start shopping.</p>
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" error={errors.name} />
        <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" error={errors.email} />
        <Input label="Phone Number" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit phone number" error={errors.phone} />
        <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" error={errors.password} />
        <Input label="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" error={errors.confirmPassword} />
        {formError && <p className="form-error-banner">{formError}</p>}
        <Button type="submit" fullWidth loading={loading}>Create Account</Button>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
      </form>
    </div>
  );
}

export default SignUp;
