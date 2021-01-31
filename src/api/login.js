import axios from 'axios';

export const loginApi = query => {
    let result = axios.post('http://localhost:8081/login',query);
    return result;
};
