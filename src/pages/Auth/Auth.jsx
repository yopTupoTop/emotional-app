import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Auth.module.css";

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
        navigate("/track", { replace: true });
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
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1 className={styles.authTitle}>SIGN IN</h1>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button
            type="submit"
            className={styles.authSubmitBtn}
            disabled={isLoading}
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
        <div className={styles.authFooter}>
          <Link to="/signup" className={styles.navLink}>
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Auth;
