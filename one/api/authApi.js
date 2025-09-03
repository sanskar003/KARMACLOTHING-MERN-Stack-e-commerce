import axios from "axios";

export const loginUser = async (credential) => {
    try {
        const response = await axios.post("http://localhost:5000/auth/login", credential);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post("http://localhost:5000/auth/register", userData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};