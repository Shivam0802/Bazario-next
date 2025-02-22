import axios from "axios";
import exp from "constants";

const API_BASE_URL = "http://localhost:8000";

export const createOrder = async (data: Record<string, any>) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/order/placeOrder`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async (userId?: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/getOrders`, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getOrderById = async (id: string, productId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/getOrderById/${id}/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const cancelOrder = async (id: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/order/cancelOrder/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};