import axios from 'axios';
import Qs from 'qs';

export const loginApi = query => {
    let result = axios.post('user/login',query);
    return result;
};

export const sendEmailCodeApi = query => {
    return Promise.resolve(1);
};

export const logoutApi = query =>{
    return axios.post('user/logout', query);
}


// export const loginApi = query => {
//     let result = axios.post('http://1.15.136.154:8080/admin/login',Qs.stringify(query));
//     return result;
// };

// export const logoutApi = () =>{
//     return axios.post('http://1.15.136.154:8080/admin/logout');
// }
