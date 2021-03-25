import axios from 'axios';

export const getUsersApi = query =>{
    return axios.post('user/getUsers', query);
}

export const freezeUser = (uId) =>{
    return axios.post('user/freezeUser', uId);
}

export const sendMessageApi = (param)=>{
    return new Promise((resolve, reject)=>{resolve(1);});
}