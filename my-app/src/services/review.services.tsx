import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const addReview = async (review: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/review`, review, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewsByProductId = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/review/`, {
      params: {
        productId: id,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
