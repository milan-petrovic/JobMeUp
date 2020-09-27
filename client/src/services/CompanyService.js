import { axiosInstance } from '../api/axios';

export const getAllCompanies = () => {
    return axiosInstance.get('/companies');
};