import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const fetchAuditLogs = async (token, page, limit) => {
  const response = await api.get('/audit-logs', {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit },
  });
  return response.data;
}; 