import axios from "axios";

// Use empty baseURL for Vite proxy in dev
const axiosInstance = axios.create({
  baseURL: "",
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Set auth token to localStorage
const setAuthToken = (token) => localStorage.setItem("authToken", token);

// Remove auth token from localStorage
const removeAuthToken = () => localStorage.removeItem("authToken");

// Generic API request
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = getAuthToken();
    const headers = { ...options.headers };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (options.body) headers["Content-Type"] = "application/json";

    const response = await axiosInstance({
      url: endpoint,
      method: options.method || "GET",
      headers,
      data: options.body ? JSON.parse(options.body) : undefined,
    });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeAuthToken();
      throw new Error("Session expired. Please log in again.");
    }
    throw error;
  }
};

// Auth API
export const loginUser = async (email, password) => {
  const data = await apiRequest("/v1/tokens/authentication", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (data?.authentication_token?.token) {
    setAuthToken(data.authentication_token.token);
    return data.user;
  } else {
    throw new Error("Login successful but no token received.");
  }
};

export const logoutUser = () => {
  removeAuthToken();
};

// Notes API
export const getNotes = async (page = 1, pageSize = 20, folderId = null) => {
  let endpoint = `/v1/notes?page=${page}&page_size=${pageSize}`;
  if (folderId !== null) endpoint += `&folder_id=${folderId}`;
  return await apiRequest(endpoint);
};

export const getNote = async (id) => {
  return await apiRequest(`/v1/notes/${id}`);
};
