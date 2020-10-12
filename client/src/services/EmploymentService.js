import { axiosInstance, getRequestConfig } from '../api/axios';

export const postEmployment = (requestData, accesToken) => {
    return axiosInstance.post('/employments', requestData, getRequestConfig(accesToken));
};

export const putEmployment = (requestData, accesToken) => axiosInstance.put('/employments', requestData, getRequestConfig(accesToken));

export const getEmploymentById = (employmentId, accesToken) => axiosInstance.get(`/employments/${employmentId}`, getRequestConfig(accesToken));
