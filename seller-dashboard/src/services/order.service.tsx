import axios from "axios";
import cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8000";

export const getAllOrders = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/order/getOrderByProductId/${id}`, {
      headers: {
            Authorization: `Bearer ${cookies.get("authToken")}`,
          },
      });

    if (response.status !== 200) throw new Error("Failed to fetch orders");

    const data = response.data;

    // Ensure we return an array
    return Array.isArray(data.result) ? data.result : [];
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};
