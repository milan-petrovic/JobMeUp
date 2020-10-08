import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllSkills = (accessToken) => {
    return axiosInstance.get('/skills', getRequestConfig(accessToken));
};
