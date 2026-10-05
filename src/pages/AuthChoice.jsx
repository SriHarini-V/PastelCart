import { useNavigate, useLocation } from "react-router-dom";

function AuthChoice() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  return (
    <div className="auth-page">
      <div className="auth-brand">🛍️ PastelCart</div>
      <div className="auth-choice-card">
        <div className="auth-icon">👋</div>
        <h1>Welcome to PastelCart</h1>
        <p>Sign in to continue shopping or create a new account.</p>
        <div className="auth-choice-actions">
          <button className="btn btn-primary full-width" onClick={() => navigate("/login", { state: { from } })}>Sign In</button>
          <button className="btn btn-secondary full-width" onClick={() => navigate("/signup", { state: { from } })}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default AuthChoice;
