import React, { createContext, useState, useEffect, useContext } from "react";
import { getNotes } from "../api";
import { AuthContext } from "./AuthContext";

export const RecordingsContext = createContext();

export function RecordingsProvider({ children }) {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Fetch recordings from API
  const fetchRecordings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes(1, 100);
      if (data && data.notes) {
        const formatted = data.notes.map((note) => ({
          id: note.id,
          name: note.title,
          timestamp: note.created_at,
          transcript: note.transcript?.String || "",
          summary: note.summary?.String || "",
          audio_file_path: note.audio_file_path || "",
        }));
        setRecordings(formatted);
      } else {
        setRecordings([]);
      }
    } catch (err) {
      setError("Failed to load recordings");
      setRecordings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRecordings();
    else setRecordings([]);
    // eslint-disable-next-line
  }, [user]);

  return (
    <RecordingsContext.Provider
      value={{ recordings, loading, error, refreshRecordings: fetchRecordings }}
    >
      {children}
    </RecordingsContext.Provider>
  );
}
