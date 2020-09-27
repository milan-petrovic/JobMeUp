import { axiosInstance } from '../api/axios';

export const getAllEmployees = () => {
    return axiosInstance.get('/employees');
};