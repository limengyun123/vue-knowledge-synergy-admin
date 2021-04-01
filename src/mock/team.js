const teams = [
    {teamId: 1, teamName: '暨南软件影票售卖系统', teamBreif:'系统开发', teamInstitute:'', leaderId: 1, teammates:10, teamIsActive: true, teamCreateTime:'2020-03-25 13:23', teamUsedSize: '12MB', teamResourceSize: '5GB'},
    {teamId: 2, teamName: '你知科研团队', teamBreif:'科研调查', teamInstitute:'', leaderId: 2, teammates:20, teamIsActive: true, teamCreateTime:'2020-03-25 13:23', teamUsedSize: '4GB', teamResourceSize: '5GB'},
    {teamId: 3, teamName: '刘培念课题组', teamBreif:'科研调查', teamInstitute:'', leaderId: 3, teammates:21, teamIsActive: true, teamCreateTime:'2020-03-25 13:23', teamUsedSize: '12MB', teamResourceSize: '5GB'},
    {teamId: 4, teamName: '知识协同管理平台', teamBreif:'系统开发', teamInstitute:'', leaderId: 4, teammates:5, teamIsActive: true, teamCreateTime:'2020-03-25 13:23', teamUsedSize: '1KB', teamResourceSize: '5GB'},
    {teamId: 5, teamName: '武汉旅游系统', teamBreif:'系统开发', teamInstitute:'', leaderId: 5, teammates:8, teamIsActive: true, teamCreateTime:'2020-03-25 13:23', teamUsedSize: '12MB', teamResourceSize: '5GB'},
    {teamId: 6, teamName: '华中科技大学课程管理系统', teamBreif:'系统开发', teamInstitute:'', leaderId: 6, teammates:10, teamIsActive: true, teamCreateTime:'2020-03-25 13:23', teamUsedSize: '132MB', teamResourceSize: '5GB'},
    {teamId: 7, teamName: '皮相交友软件', teamBreif:'系统开发', teamInstitute:'', leaderId: 7, teammates:10, teamIsActive: true, teamCreateTime:'2020-03-25 13:23', teamUsedSize: '827MB', teamResourceSize: '5GB'},
];

export default {
    get_teams_suc: (param)=>{
        let prm = JSON.parse(param.body);
        let cp = prm.currentPage, ps = prm.pageSize;
        // console.log(param.body);
        // let actualName = prm.actualName, uId = prm.uId;
        return {
            code: 200,
            msg: "获取成功",
            data: {
                teams: teams.slice((cp-1)*ps, cp*ps),
                totalNum: teams.length,
            }
        }
    },
    get_teams_fai: (param)=>{
        return{
            code: 500,
            msg: "获取失败",
        };
    },
    freeze_team_suc: (param)=>{
        return{
            code: 200,
            msg: "封冻成功",
            data: []
            
        };
    },
    freeze_team_fai: (param)=>{
        return{
            code: 500,
            msg: "封冻失败",
        };
    },
}