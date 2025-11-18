import axios from 'axios';

// ✅ Environment variable use karo, fallback to production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ai-resume-back-1.onrender.com';

console.log('🔗 Using API:', API_BASE_URL); // Debug ke liye

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies/auth
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Better error logging
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

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
  headers: { 'Content-Type': 'multipart/form-data' },
});

// ✅ PDF Generator API
export const generatePDF = (data) => API.post('/pdf/generate', data, {
  responseType: 'blob',
});

export default API;