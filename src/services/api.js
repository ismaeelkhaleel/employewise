import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

export const apiService = {
  login: (credentials) => axios.post(`${API_BASE_URL}/login`, credentials),
  getUsers: () => axios.get(`${API_BASE_URL}/users?page=1`),
  getUserById: (id) => axios.get(`${API_BASE_URL}/users/${id}`),
  updateUser: (id, userData) => axios.put(`${API_BASE_URL}/users/${id}`, userData),
  deleteUser: (id) => axios.delete(`${API_BASE_URL}/users/${id}`),
};