import React, { useContext, useState, useCallback } from "react";
import { RecordingsContext } from "../context/RecordingsContext";
import { AuthContext } from "../context/AuthContext";

export default function HistoryScreen() {
  const {
    recordings = [],
    refreshRecordings,
    loading,
  } = useContext(RecordingsContext);
  const { user, logout } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshRecordings && refreshRecordings();
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshRecordings]);

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>Please log in to view your notes</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#f4f6fb",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          padding: "32px 32px 0 32px",
          boxSizing: "border-box",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              color: "#3b82f6",
              fontSize: 32,
            }}
          >
            Your Recordings
          </h2>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={onRefresh}
              disabled={refreshing || loading}
              style={{
                padding: "10px 22px",
                borderRadius: 8,
                background: "#7C4DFF",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                boxShadow: "0 1px 4px #eee",
                cursor: refreshing || loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {refreshing || loading ? "Refreshing..." : "Refresh"}
            </button>
            <button
              onClick={logout}
              style={{
                padding: "10px 22px",
                borderRadius: 8,
                background: "#ef5350",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: 16,
                boxShadow: "0 1px 4px #eee",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 2px 12px rgba(60,60,130,0.07)",
            padding: 0,
            minHeight: 0,
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {recordings.length === 0 ? (
            <div style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
              <p>No recordings found.</p>
            </div>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                flex: 1,
                overflowY: "auto",
              }}
            >
              {recordings.map((rec) => (
                <li
                  key={rec.id}
                  style={{
                    background: "#f9f9f9",
                    margin: "18px 18px 0 18px",
                    borderRadius: 10,
                    padding: 20,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    style={{ fontWeight: 600, fontSize: 18, color: "#3b82f6" }}
                  >
                    {rec.name || `Recording ${rec.id}`}
                  </div>
                  <div style={{ color: "#666", fontSize: 13, margin: "8px 0" }}>
                    {new Date(rec.timestamp).toLocaleString()}
                  </div>
                  {rec.transcript && (
                    <div style={{ marginTop: 8, color: "#333" }}>
                      <b>Transcript:</b> {rec.transcript}
                    </div>
                  )}
                  {rec.summary && (
                    <div style={{ marginTop: 8, color: "#333" }}>
                      <b>Summary:</b> {rec.summary}
                    </div>
                  )}
                  {rec.audio_file_path && (
                    <audio controls style={{ marginTop: 12, width: "100%" }}>
                      <source src={rec.audio_file_path} />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </li>
              ))}
              <div style={{ height: 18 }} />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
