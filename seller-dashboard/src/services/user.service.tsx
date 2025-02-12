import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8000";

export const updateUserById = async (id: string, updatedData: any) => {
  try {
    const token = Cookies.get("authToken");
    const response = await axios.patch(
      `${API_BASE_URL}/user/updateUser/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Store the new token
    }

    return response;
  } catch (error: any) {
    console.error("API Error:", error.response);
    throw new Error(
      error.response?.data?.message || "Failed to update data !!!!"
    );
  }
};
