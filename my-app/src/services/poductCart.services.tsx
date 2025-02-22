import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const addToCart = async (data: Record<string, any>) => {
     try {
          const token = localStorage.getItem("token");
          const response = await axios.post(`${API_BASE_URL}/productCart`, data, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          return response.data;
     } catch (error) {
          throw error;
     }
};

export const getCartItems = async (id: string) => {
     try {
          const response = await axios.get(`${API_BASE_URL}/productCart/${id}`, {
               headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
          });
          return response.data;
     } catch (error) {
          throw error;
     }
}

export const deleteCartItem = async (id: string) => {
     try {
          const response = await axios.delete(`${API_BASE_URL}/productCart/delete/${id}`,{
               headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
          });
          return response.data;
     } catch (error) {
          throw error;
     }
}    