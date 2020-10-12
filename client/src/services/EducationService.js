import { axiosInstance, getRequestConfig } from '../api/axios';

export const postEducation = (requestData, accessToken) => {
    return axiosInstance.post('/educations', requestData, getRequestConfig(accessToken));
};

export const putEducation = (requestData, accessToken) => {
    return axiosInstance.put('/educations', requestData, getRequestConfig(accessToken));
};

export const getEducationById = (id, accessToken) => {
    return axiosInstance.get(`/educations/${id}`, getRequestConfig(accessToken));
};

export const deleteEducation = (educationId, accessToken) => axiosInstance.delete(`/educations/${educationId}`, getRequestConfig(accessToken));
