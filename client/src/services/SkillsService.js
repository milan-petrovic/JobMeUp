import { axiosInstance } from '../api/axios';

export const getAllSkills = () => {
    return axiosInstance.get('/skills');
};
