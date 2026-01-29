import React, { useContext, useState, useCallback } from "react";
import { RecordingsContext } from "../context/RecordingsContext";
import { AuthContext } from "../context/AuthContext";

export default function HistoryScreen() {
  const { recordings = [], refreshRecordings, loading } = useContext(RecordingsContext);
  const { user, logout } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshRecordings && refreshRecordings();
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshRecordings]);

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.centerMessage}>
          <p style={styles.messageText}>Please log in to view your notes</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Left Sidebar - 30% */}
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <h2 style={styles.title}>Your Recordings</h2>
          <div style={styles.headerButtons}>
            <button
              onClick={onRefresh}
              disabled={refreshing || loading}
              style={styles.refreshButton}
            >
              {refreshing || loading ? "Refreshing..." : "Refresh"}
            </button>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        </div>

        <div style={styles.recordingsList}>
          {recordings.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyText}>No recordings found.</p>
            </div>
          ) : (
            recordings.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setSelectedRecording(rec)}
                style={{
                  ...styles.recordingItem,
                  ...(selectedRecording?.id === rec.id ? styles.recordingItemActive : {}),
                }}
              >
                <div style={styles.recordingInfo}>
                  <h3 style={styles.recordingName}>
                    {rec.name || `Recording ${rec.id}`}
                  </h3>
                  <p style={styles.recordingDate}>
                    {new Date(rec.timestamp).toLocaleString()}
                  </p>
                </div>
                <svg
                  style={styles.arrowIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Content Area - 70% */}
      <div style={styles.contentArea}>
        {selectedRecording ? (
          <div style={styles.detailsContainer}>
            <h2 style={styles.detailsTitle}>
              {selectedRecording.name || `Recording ${selectedRecording.id}`}
            </h2>
            <p style={styles.detailsDate}>
              {new Date(selectedRecording.timestamp).toLocaleString()}
            </p>

            {selectedRecording.audio_file_path && (
              <div style={styles.audioSection}>
                <h3 style={styles.sectionTitle}>Audio</h3>
                <audio controls style={styles.audioPlayer}>
                  <source
                    src={selectedRecording.audio_file_path}
                    type="audio/mpeg"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            {selectedRecording.transcript && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Transcript</h3>
                <p style={styles.sectionContent}>{selectedRecording.transcript}</p>
              </div>
            )}

            {selectedRecording.summary && (
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Summary</h3>
                <p style={styles.sectionContent}>{selectedRecording.summary}</p>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.placeholderContainer}>
            <svg
              style={styles.placeholderIcon}
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm12-2c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p style={styles.placeholderText}>
              Select a recording to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e0e0e0",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #e0e0e0",
  },
  title: {
    margin: "0 0 15px 0",
    fontSize: "24px",
    fontWeight: "600",
    color: "#333",
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
  },
  refreshButton: {
    flex: 1,
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  logoutButton: {
    flex: 1,
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.2s",
  },
  recordingsList: {
    flex: 1,
    overflowY: "auto",
  },
  recordingItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #e0e0e0",
    cursor: "pointer",
    transition: "background-color 0.2s",
    backgroundColor: "#ffffff",
  },
  recordingItemActive: {
    backgroundColor: "#e3f2fd",
    borderLeft: "4px solid #007bff",
  },
  recordingInfo: {
    flex: 1,
  },
  recordingName: {
    margin: "0 0 5px 0",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  recordingDate: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
  },
  arrowIcon: {
    color: "#999",
    flexShrink: 0,
  },
  contentArea: {
    width: "70%",
    backgroundColor: "#ffffff",
    overflowY: "auto",
  },
  detailsContainer: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  detailsTitle: {
    margin: "0 0 10px 0",
    fontSize: "32px",
    fontWeight: "600",
    color: "#333",
  },
  detailsDate: {
    margin: "0 0 30px 0",
    fontSize: "14px",
    color: "#666",
  },
  audioSection: {
    marginBottom: "30px",
  },
  sectionTitle: {
    margin: "0 0 15px 0",
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
  },
  audioPlayer: {
    width: "100%",
    maxWidth: "600px",
  },
  section: {
    marginBottom: "30px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
  },
  sectionContent: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#444",
    whiteSpace: "pre-wrap",
  },
  placeholderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#999",
  },
  placeholderIcon: {
    marginBottom: "20px",
    opacity: 0.5,
  },
  placeholderText: {
    fontSize: "18px",
    margin: 0,
  },
  emptyState: {
    padding: "40px 20px",
    textAlign: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: "15px",
  },
  centerMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  messageText: {
    fontSize: "18px",
    color: "#666",
  },
};
