import { axiosInstance, getRequestConfig } from '../api/axios';

export const getAllSkills = () => {
    return axiosInstance.get('/skills');
};

export const postSkill = (requestData, accessToken) => axiosInstance.post('/skills', requestData, getRequestConfig(accessToken));

export const getSkillById = (skillId) => axiosInstance.get(`/skills/${skillId}`);

export const putSkill = (requestData, accessToken) => axiosInstance.put('/skills', requestData, getRequestConfig(accessToken));

export const deleteSkill = (skillId, accessToken) => axiosInstance.delete(`/skills/${skillId}`, getRequestConfig(accessToken));
