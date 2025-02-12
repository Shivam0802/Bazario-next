import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const subscribeToNewsletter = async (data: Record<string, any>) => {
     try {
          const response = await axios.post(`${API_BASE_URL}/newsletter/subscribe`, data);
          return response.data;
     } catch (error) {
          throw error;
     }
};