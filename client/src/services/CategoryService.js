import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllCategories = () => {
    return axiosInstance.get('/categories');
};

export const getCategoryById = (categoryId, accessToken) =>
     axiosInstance.get(`/categories/${categoryId}`, getRequestConfig(accessToken));

export const postCategory = (requestData, accessToken) => 
    axiosInstance.post('/categories', requestData, getRequestConfig(accessToken));

export const putCategory = (requestData, accessToken) =>
    axiosInstance.put('/categories', requestData, getRequestConfig(accessToken));

export const deleteCategory = (categoryId, accessToken) =>
    axiosInstance.delete(`/categories/${categoryId}`, getRequestConfig(accessToken));
