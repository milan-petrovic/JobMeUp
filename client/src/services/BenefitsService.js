import { axiosInstance } from '../api/axios';

export const getAllBenefits = () => {
    return axiosInstance.get('/benefits');
};
