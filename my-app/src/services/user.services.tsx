import axios from "axios";
//import {jwtDecode} from 'jwt-decode';

const API_BASE_URL = "http://localhost:8000";

export const createUser = async (data: Record<string, any>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/addUser`, data);
    return response.data; // Directly return response data
  } catch (error: any) {
    //console.error('Error creating user:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
        "Failed to create user. Please try again."
    );
  }
};

export const loginUser = async (data: Record<string, any>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to LogIn. Please try again."
    );
  }
};

export const getUserById = async (id: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/user/getUserById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to get the data right now !!!!"
    );
  }
};


export const updateUserById = async (id: string, updatedData: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${API_BASE_URL}/user/updateUser/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store the new token
    }

    return response;
  } catch (error: any) {
    console.error("API Error:", error.response);
    throw new Error(error.response?.data?.message || "Failed to update data !!!!");
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in again.");

    const response = await axios.delete(`${API_BASE_URL}/user/deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete Account");
  }
};