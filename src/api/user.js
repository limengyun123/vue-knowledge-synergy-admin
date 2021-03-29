import axios from 'axios';

export const getUsersApi = query =>{
    return axios.post('user/getUsers', query);
};

export const freezeUser = (uId) =>{
    return axios.post('user/freezeUser', uId);
};

export const sendMessageApi = (param)=>{
    return new Promise((resolve, reject)=>{resolve(1);});
};

export const getAdminsApi = query =>{
    return axios.post('user/getAdmins', query);
};

export const addAdminApi = query =>{
    return axios.post('user/addAdmin',query);
}