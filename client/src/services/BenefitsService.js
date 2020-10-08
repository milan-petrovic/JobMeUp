import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllBenefits = (token) => {
    return axiosInstance.get('/benefits', getRequestConfig(token));
};
