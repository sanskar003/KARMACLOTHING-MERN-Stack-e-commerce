import { API_URL } from "@/config/api";
import axios from "axios";

export const loginUser = async (credential) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credential);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      withCredentials: true // so cookies from backend are stored
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};
