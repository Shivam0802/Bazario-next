import axios from "axios";
import cookies from "js-cookie"

const API_BASE_URL = "http://localhost:8000";

export const addProduct = async (data: Record<string, any>) => {
  try {
    const token = cookies.get("authToken");
    const response = await axios.post(
      `${API_BASE_URL}/product/addProduct`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to add Product. Please try again."
    );
  }
};


export const getProduct = async (userId: string) => {
  try {
    const token = cookies.get("authToken");
    const response = await axios.get(`${API_BASE_URL}/product/`, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // The key change is here - directly return the response or response.data
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to Get Product. Please try again.");
    }
  }
};


export const getProductById = async (productId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/getProductById/${productId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to Get Product. Please try again.");
    }
  }     
};


export const updateProduct = async (productId: string, data: Record<string, any>) => {
  try {
    const token = cookies.get("authToken");
    const response = await axios.patch(
      `${API_BASE_URL}/product/updateProduct/${productId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to Update Product. Please try again.");
    }
  }
}


export const deleteProduct = async (productId: string) => {
  try { 
    const token = cookies.get("authToken");
    const response = await axios.delete(
      `${API_BASE_URL}/product/deleteProduct/${productId}`,
      {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;

  }
  catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Failed to Delete Product. Please try again.");
    }
  }
  
}