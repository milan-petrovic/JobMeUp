import { axiosInstance } from '../api/axios';

export const getAllEmployees = () => {
    return axiosInstance.get('/employees');
};

export const getAllEmployeesByCategory = (categoryId) => {
    return axiosInstance.get(`/employees/category/${categoryId}`);
};

export const getEmployeeById = (employeeId) => {
    return axiosInstance.get(`/employees/${employeeId}`);
};

export const getAllOtherEmployees = (employeeId) => {
    return axiosInstance.get(`/employees/others/${employeeId}`);
};
