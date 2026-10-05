import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { validateEmail, validatePassword } from "../utils/validators.js";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const signupSuccess = location.state?.signupSuccess || "";

  const redirectTo = location.state?.from?.pathname
    ? location.state.from.pathname + (location.state.from.search || "")
    : "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {
      email: validateEmail(credentials.email),
      password: validatePassword(credentials.password),
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((msg) => !msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) {
      return;
    }

    try {
      await login(credentials);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setFormError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-brand">🛍️ PastelCart</div>
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue shopping.</p>

      
        <Input
          label="Email"
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="you@example.com"
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="••••••••"
          error={errors.password}
        />

        {signupSuccess && <p className="success-banner">{signupSuccess}</p>}
        {formError && <p className="form-error-banner">{formError}</p>}

        <Button type="submit" fullWidth loading={loading}>
          Sign In
        </Button>
        <p className="auth-switch">Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
