import axios from 'axios';
import Qs from 'qs';

// export const getUsersApi = query =>{
//     return axios.post('user/getUsers', query);
// };

// export const freezeUser = (uId) =>{
//     return axios.post('user/freezeUser', uId);
// };

// export const sendMessageApi = (param)=>{
//     return new Promise((resolve, reject)=>{resolve(1);});
// };

// export const getAdminsApi = query =>{
//     return axios.post('user/getAdmins', query);
// };

// export const addAdminApi = query =>{
//     return axios.post('user/addAdmin',query);
// }


export const getUsersApi = query =>{
    return axios.post('http://1.15.136.154:8080/admin/getUsers', Qs.stringify(query));
};

export const updateStatus = (uId) =>{
    return axios.post('http://1.15.136.154:8080/admin/updateStatus', Qs.stringify(uId));
};

export const getAdminsApi = query =>{
    return axios.post('http://1.15.136.154:8080/admin/getAdmins', Qs.stringify(query));
};

export const updateLevelApi = query =>{
    return axios.post('http://1.15.136.154:8080/admin/updateLevel',Qs.stringify(query));
}

export const addAdminApi = query =>{
    return axios.post('http://1.15.136.154:8080/admin/addAdmin',Qs.stringify(query));
}
