import Axios from 'axios';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  title: string;
  description: string;
  category: string;
  rating: { rate: number; count: number; };
}


export const getProducts = async () => {
    try {
        const response = await Axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        throw error;
    }
};