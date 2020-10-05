import { axiosInstance, getRequestConfig } from '../api/axios';

export const postProject = (requestData, accesToken) => {
    return axiosInstance.post('/projects', requestData, getRequestConfig(accesToken));
};
