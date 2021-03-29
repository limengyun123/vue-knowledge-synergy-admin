import axios from 'axios';

export const loginApi = query => {
    let result = axios.post('login',query);
    return result;
};

export const logoutApi = query =>{
    return axios.post('logout', query);
}
