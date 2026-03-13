import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Attach auth token to every request
API.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  if (stored) {
    const user = JSON.parse(stored);
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

// Auth
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// Complaints
export const addComplaint = (data) => API.post("/complaints/add", data);
export const getComplaints = () => API.get("/complaints");
export const updateComplaintStatus = (id, status) =>
  API.put(`/complaints/${id}/status`, { status });
export const deleteComplaint = (id) => API.delete(`/complaints/${id}`);

export default API;