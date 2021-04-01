import axios from 'axios';

export const loginApi = query => {
    let result = axios.post('user/login',query);
    return result;
};

export const logoutApi = query =>{
    return axios.post('user/logout', query);
}
