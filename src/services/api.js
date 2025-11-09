import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Auth APIs
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);

// ✅ Resume APIs
export const generateResume = (data) => API.post('/resume/generate', data);
export const saveResume = (data) => API.post('/resume/save', data);
export const getUserResumes = (userId) => API.get(`/resume/user/${userId}`);
export const updateResume = (id, data) => API.put(`/resume/${id}`, data);
export const deleteResume = (id) => API.delete(`/resume/${id}`);

// ✅ ATS Analyzer API
export const analyzeResume = (formData) => API.post('/ats/analyze', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// ✅ PDF Generator API
export const generatePDF = (data) => API.post('/pdf/generate', data, {
  responseType: 'blob'
});

export default API;