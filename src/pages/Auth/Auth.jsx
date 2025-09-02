import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/track", { replace: true, state: { userEmail: email } });
      } else if (result.needsSignUp) {
        navigate("/signup", { state: { email } });
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Authentication failed");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/track", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">SIGN IN</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
        <div className="auth-footer">
          <Link to="/signup" className="auth-nav-link">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
