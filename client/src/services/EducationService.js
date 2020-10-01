import { axiosInstance } from '../api/axios';

export const postEducation = (requestData) => {
    return axiosInstance.post('/educations', requestData);
};
