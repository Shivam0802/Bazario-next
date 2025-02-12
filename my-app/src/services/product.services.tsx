import Axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const getAllProducts = async (category?: any) => {
    try {
        const response = await Axios.get(`${API_BASE_URL}/product/getAllProduct`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getProductById = async (id: string) => {
    try {
        const response = await Axios.get(`${API_BASE_URL}/product/getProductById/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}