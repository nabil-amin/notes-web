import React, { createContext, useState, useEffect, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading user from localStorage or API
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function (real API call)
  const login = async (email, password) => {
    setLoading(true);
    try {
      // Use relative path for Vite proxy to avoid CORS in dev
      const response = await fetch("/v1/tokens/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      const data = await response.json();
      setUser(data.user || { email });
      localStorage.setItem("user", JSON.stringify(data.user || { email }));
      // Store token as 'authToken' to match api.js, and use correct property
      if (data.authentication_token?.token) {
        localStorage.setItem("authToken", data.authentication_token.token);
      }
    } catch (error) {
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Register function (replace with real API call)
  const register = async (name, email, password) => {
    setLoading(true);
    setTimeout(() => {
      const fakeUser = { name, email };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      setLoading(false);
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
