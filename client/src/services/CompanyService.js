import { axiosInstance } from '../api/axios';

export const getAllCompanies = () => {
    return axiosInstance.get('/companies');
};

export const postCompany = (requestData) => {
    return axiosInstance.post('/companies', requestData);
};
