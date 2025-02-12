import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const addToCart = async (data: Record<string, any>) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/productCart`, data);
          return response.data;
     } catch (error) {
          throw error;
     }
};

export const getCartItems = async (id: string) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/productCart/${id}`);
          return response.data;
     } catch (error) {
          throw error;
     }
}

export const deleteCartItem = async (id: string) => {
     try {
          const response = await axios.delete(`${API_BASE_URL}/productCart/delete/${id}`);
          return response.data;
     } catch (error) {
          throw error;
     }
}    