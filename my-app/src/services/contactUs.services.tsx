import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const contactUs = async (data: Record<string, any>) => {
     try {
          const response = await axios.post(
               `${API_BASE_URL}/contactUs`,
               data
          );
          return response.data;
     } catch (error) {
          throw error;
     }
};