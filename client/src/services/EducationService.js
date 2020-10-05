import { axiosInstance, getRequestConfig } from '../api/axios';

export const postEducation = (requestData, accesToken) => {
    return axiosInstance.post('/educations', requestData, getRequestConfig(accesToken));
};
