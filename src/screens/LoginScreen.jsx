import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { login, register, loading } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (!isLogin) {
      if (!name) errors.name = "Name is required";
      if (!confirmPassword)
        errors.confirmPassword = "Please confirm your password";
      else if (password !== confirmPassword)
        errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (isLogin) {
      await login(email, password);
    } else {
      await register(name, email, password);
      setIsLogin(true);
      setName("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormErrors({});
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(120deg, #7C4DFF 0%, #3b82f6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 6px 32px rgba(60,60,130,0.10)",
          padding: "40px 32px 32px 32px",
          margin: "40px 16px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User Icon"
            style={{
              width: 64,
              height: 64,
              marginBottom: 8,
              borderRadius: 16,
              boxShadow: "0 2px 8px #eee",
            }}
          />
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              color: "#3b82f6",
              fontSize: 28,
            }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ color: "#888", marginTop: 8, fontSize: 15 }}>
            {isLogin
              ? "Log in to access your voice notes"
              : "Sign up to start recording and saving your voice notes"}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {!isLogin && (
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontWeight: 500,
                  color: "#333",
                  marginBottom: 6,
                  display: "block",
                }}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "90%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: formErrors.name
                    ? "1.5px solid #ef5350"
                    : "1.5px solid #d1d5db",
                  marginBottom: 2,
                  fontSize: 15,
                  outline: "none",
                  transition: "border 0.2s",
                }}
                autoFocus
              />
              {formErrors.name && (
                <div style={{ color: "#ef5350", fontSize: 13, marginTop: 2 }}>
                  {formErrors.name}
                </div>
              )}
            </div>
          )}
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                fontWeight: 500,
                color: "#333",
                marginBottom: 6,
                display: "block",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "90%",
                padding: "12px 14px",
                borderRadius: 8,
                border: formErrors.email
                  ? "1.5px solid #ef5350"
                  : "1.5px solid #d1d5db",
                marginBottom: 2,
                fontSize: 15,
                outline: "none",
                transition: "border 0.2s",
              }}
              autoComplete="email"
            />
            {formErrors.email && (
              <div style={{ color: "#ef5350", fontSize: 13, marginTop: 2 }}>
                {formErrors.email}
              </div>
            )}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                fontWeight: 500,
                color: "#333",
                marginBottom: 6,
                display: "block",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "90%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: formErrors.password
                    ? "1.5px solid #ef5350"
                    : "1.5px solid #d1d5db",
                  marginBottom: 2,
                  fontSize: 15,
                  outline: "none",
                  transition: "border 0.2s",
                }}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  fontSize: 15,
                  padding: 0,
                }}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {formErrors.password && (
              <div style={{ color: "#ef5350", fontSize: 13, marginTop: 2 }}>
                {formErrors.password}
              </div>
            )}
          </div>
          {!isLogin && (
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontWeight: 500,
                  color: "#333",
                  marginBottom: 6,
                  display: "block",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "90%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: formErrors.confirmPassword
                    ? "1.5px solid #ef5350"
                    : "1.5px solid #d1d5db",
                  marginBottom: 2,
                  fontSize: 15,
                  outline: "none",
                  transition: "border 0.2s",
                }}
                autoComplete="new-password"
              />
              {formErrors.confirmPassword && (
                <div style={{ color: "#ef5350", fontSize: 13, marginTop: 2 }}>
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px 0",
              background: loading ? "#a5b4fc" : "#7C4DFF",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 17,
              marginTop: 8,
              marginBottom: 8,
              boxShadow: "0 1px 4px #eee",
              letterSpacing: 0.2,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            disabled={loading}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
                ? "Log In"
                : "Sign Up"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <button
            onClick={toggleMode}
            style={{
              background: "none",
              border: "none",
              color: "#7C4DFF",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "underline",
              marginTop: 2,
            }}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
