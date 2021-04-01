import Mock from 'mockjs';
import loginApi from './login';
import userApi from './user';
import resourceApi from './resource';
import teamApi from './team';

/**
 * Mock.mock( rurl, rtype, template )
 * rurl:请求的接口地址
 * rtype:提交方式
 * template:返回数据
 */ 

 Mock.mock("http://localhost:8081/user/login", "post", loginApi.login_result_suc);
//  Mock.mock("http://localhost:8081/user/login", "post", loginApi.login_result_fai);

Mock.mock("http://localhost:8081/user/logout", "post", loginApi.logout_result_suc);
//  Mock.mock("http://localhost:8081/user/logout", "post", loginApi.logout_result_fai);

 Mock.mock("http://localhost:8081/user/getUsers", "post", userApi.get_users_suc);
 //  Mock.mock("http://localhost:8081/user/getUsers", "post", userApi.get_users_fai);

 Mock.mock("http://localhost:8081/user/freezeUser", "post", userApi.freeze_user_suc);
 //  Mock.mock("http://localhost:8081/user/freezeUser", "post", userApi.freeze_user_fai);

 Mock.mock("http://localhost:8081/user/getAdmins", "post", userApi.get_admins_suc);
 //  Mock.mock("http://localhost:8081/user/getAdmins", "post", userApi.get_admins_fai);

 Mock.mock("http://localhost:8081/user/addAdmin", "post", userApi.add_admin_suc);
//   Mock.mock("http://localhost:8081/user/addAdmin", "post", userApi.add_admin_fai);

Mock.mock("http://localhost:8081/resource/getResources", "post", resourceApi.get_resources_suc);
//   Mock.mock("http://localhost:8081/resource/getResources", "post", resourceApi.get_resources_fai);

Mock.mock("http://localhost:8081/resource/auditResource", "post", resourceApi.audit_resource_suc);
  // Mock.mock("http://localhost:8081/resource/auditResource", "post", resourceApi.audit_resource_fai);
  
Mock.mock("http://localhost:8081/team/getTeams", "post", teamApi.get_teams_suc);
//  Mock.mock("http://localhost:8081/team/getTeams", "post", teamApi.get_teams_fai);

Mock.mock("http://localhost:8081/team/freezeTeam", "post", teamApi.freeze_team_suc);
//  Mock.mock("http://localhost:8081/team/freezeTeam", "post", teamApi.freeze_team_fai);