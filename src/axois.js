import axios from 'axios';
import store from './store';
import router from './router';
axios.defaults.baseURL = 'http://localhost:8081';

axios.interceptors.request.use((config)=>{
    console.log("请求拦截");
    return config;
});

axios.interceptors.response.use((response)=>{
    let result = response.data;
    if(result.code === 200) return Promise.resolve(result);
    else return Promise.reject(result.msg);
},
error=>{
    console.log("响应错误", error);
    if(error.response.data) error.message = error.response.msg;
    switch(error.response.code){
        case 401:
            store.commit('REMOVE_INFO');
            router.push('/login');
            error.message = "请重新登录";
            break;
        case 403:
            error.message = "权限不足，无法访问";
            break;
    }
    return Promise.reject(error);
}
)