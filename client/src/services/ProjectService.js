import { axiosInstance } from '../api/axios';

export const postProject = (requestData) => {
    return axiosInstance.post('/projects', requestData);
};
