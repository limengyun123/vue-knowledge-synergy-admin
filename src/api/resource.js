import axios from 'axios';

export const getResourcesApi = (param)=>{
    return axios.post('/resource/getResources', param);
}

export const auditResourceApi = (param)=>{
    return axios.post('/resource/auditResource', param);
}