import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllEmployees = () => {
    return axiosInstance.get('/employees');
};

export const getAllEmployeesByCategory = (categoryId) => {
    return axiosInstance.get(`/employees/category/${categoryId}`);
};

export const getAllEmployeesByCategorySortedByReceivedVotes = (categoryId) => {
    return axiosInstance.get(`/employees/category/${categoryId}?popular=true`);
}

export const getEmployeeById = (employeeId) => {
    return axiosInstance.get(`/employees/${employeeId}`);
};

export const getEmployeeForEmployee = (id, employeeId) => {
    return axiosInstance.get(`/employees/${id}/${employeeId}`);
};

export const getAllOtherEmployees = (employeeId) => {
    return axiosInstance.get(`/employees/others/${employeeId}`);
};

export const postVote = (requestData, accessToken) => {
    return axiosInstance.post('/votes', requestData, getRequestConfig(accessToken));
};

export const putEmployee = (requestData) => {
    return axiosInstance.put('/employees', requestData);
};

export const postEmployee = (requestData) => {
    return axiosInstance.post('/employees/register', requestData);
};

export const getAllEmployeesSortedByReceivedVotes = () => {
    return axiosInstance.get('/employees?popular=true');
}
