import { axiosInstance } from '../api/axios';

export const postEmployment = (requestData) => {
    return axiosInstance.post('/employments', requestData);
};
