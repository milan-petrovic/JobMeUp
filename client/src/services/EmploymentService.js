import { axiosInstance, getRequestConfig } from '../api/axios';

export const postEmployment = (requestData, accesToken) => {
    return axiosInstance.post('/employments', requestData, getRequestConfig(accesToken));
};
