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
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
