import { axiosInstance } from '../api/axios';

export const getAllCategories = () => {
    return axiosInstance.get('/categories');
};