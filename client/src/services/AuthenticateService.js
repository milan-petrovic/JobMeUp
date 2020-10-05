import { axiosInstance } from '../api/axios';

export const loginAsEmployee = (requestData) => {
    return axiosInstance.post('/authenticate/employee', requestData);
};
