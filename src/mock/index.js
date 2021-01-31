import Mock from 'mockjs'
import loginApi from './user'

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */ 

 Mock.mock("http://localhost:8081/login", "post", loginApi.login_result_suc);
//  Mock.mock("http://localhost:8081/login", "post", login_result_fai);