import { axiosInstance } from '../api/axios';

export const getAllEmployees = () => {
    return axiosInstance.get('/employees');
};

export const getAllEmployeesByCategory = (categoryId) => {
    return axiosInstance.get(`/employees/category/${categoryId}`);
};
