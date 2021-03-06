import { axiosInstance } from '../api/axios';

export const loginAsEmployee = (requestData) => {
    return axiosInstance.post('/authenticate/employee', requestData);
};

export const loginAsCompany = (requestData) => {
    return axiosInstance.post('/authenticate/company', requestData);
};

export const loginAsAdmin = (requestData) => {
    return axiosInstance.post('/authenticate/admin', requestData);
}
