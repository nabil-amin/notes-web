import React, { useContext } from "react";
import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import HistoryScreen from "./screens/HistoryScreen";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { RecordingsProvider } from "./context/RecordingsContext";

function AppContent() {
  const { loading, user } = useContext(AuthContext);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <span>Loading...</span>
      </div>
    );
  }
  return user ? <HistoryScreen /> : <LoginScreen />;
}

function App() {
  return (
    <AuthProvider>
      <RecordingsProvider>
        <AppContent />
      </RecordingsProvider>
    </AuthProvider>
  );
}

export default App;
