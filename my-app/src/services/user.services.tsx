import Axios from 'axios';

export const createUser = async (data: any) => {
    try {
        const response = await Axios.post('http://localhost:8080/user/signup', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};