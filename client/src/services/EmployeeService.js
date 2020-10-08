import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllEmployees = () => {
    return axiosInstance.get('/employees');
};

export const getAllEmployeesByCategory = (categoryId) => {
    return axiosInstance.get(`/employees/category/${categoryId}`);
};

export const getEmployeeById = (employeeId) => {
    return axiosInstance.get(`/employees/${employeeId}`);
};

export const getEmployeeForEmployee = (id, employeeId) => {
    return axiosInstance.get(`/employees/${id}/${employeeId}`);
};

export const getAllOtherEmployees = (employeeId) => {
    return axiosInstance.get(`/employees/others/${employeeId}`);
};

export const postVote = (requestData, accessToken) => {
    return axiosInstance.post('/votes', requestData, getRequestConfig(accessToken));
};

export const putEmployee = (requestData, accessToken) => {
    return axiosInstance.put('/employees', requestData);
};
