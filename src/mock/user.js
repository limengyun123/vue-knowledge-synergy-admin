const users = [
    {userId: 1, userName: "41514", actualName: "钱全有", sex: false, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 2, userName: "c234", actualName: "赵浩", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 3, userName: "12414", actualName: "孙香", sex: false, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 4, userName: "1234", actualName: "李志鹏", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: false, isActive:false },
    {userId: 5, userName: "2456", actualName: "周欣",  sex: false, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 6, userName: "12424", actualName: "吴名", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: false, isActive:true },
    {userId: 7, userName: "720953475323423", actualName: "张三", sex: true, phone: '17305827492', email:'18422193411@qq.com', registerTime: '2020-01-01 19:34', status: true, isActive:true },
    {userId: 8, userName: "19658230", actualName: "李四", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: false, isActive:true },
    {userId: 9, userName: "2689323", actualName: "王老五", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 10, userName: "28932", actualName: "欧阳天泽", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 11, userName: "847356", actualName: "李建国", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 12, userName: "23654", actualName: "刘歆然", sex: false, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 13, userName: "dftyh", actualName: "刘黎", sex: false, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 14, userName: "24567", actualName: "陈政", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: false, isActive:false },
    {userId: 15, userName: "ghj", actualName: "张之若",  sex: false, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 16, userName: "srty", actualName: "雷潜蛟", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: false, isActive:true },
    {userId: 17, userName: "likuy", actualName: "谢无为", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
    {userId: 18, userName: "as", actualName: "赵志军", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: false, isActive:true },
    {userId: 19, userName: "rtj", actualName: "曹景石", sex: true, phone: '17305827492', email:'184221934@qq.com', registerTime: '2020-01-01', status: true, isActive:true },
];

const admins = [
    {userId: 1, userName: "41514", actualName: "钱全有", sex: false, phone: '17305827492', email:'184221934@qq.com', superLevel:true },
    {userId: 2, userName: "c234", actualName: "赵浩", sex: true, phone: '17305827492', email:'184221934@qq.com', superLevel:false },
    {userId: 3, userName: "12414", actualName: "孙香", sex: true, phone: '17305827492', email:'184221934@qq.com', superLevel:false },
    {userId: 4, userName: "1234", actualName: "李志鹏", sex: true, phone: '17305827492', email:'184221934@qq.com', superLevel:false },
];

export default {
    get_users_suc: (param)=>{
        let prm = JSON.parse(param.body);
        let cp = prm.currentPage, ps = prm.pageSize;
        // console.log(param.body);
        // let actualName = prm.actualName, uId = prm.uId;
        return {
            code: 200,
            msg: "获取成功",
            data: {
                users: users.slice((cp-1)*ps, cp*ps),
                totalNum: users.length,
            }
        }
    },
    get_users_fai: (param)=>{
        return{
            code: 500,
            msg: "获取失败",
        };
    },
    freeze_user_suc: (param)=>{
        return{
            code: 200,
            msg: "封冻成功",
            data: []
            
        };
    },
    freeze_user_fai: (param)=>{
        return{
            code: 500,
            msg: "封冻失败",
        };
    },
    get_admins_suc: (param)=>{
        let prm = JSON.parse(param.body);
        let cp = prm.currentPage, ps = prm.pageSize;
        return {
            code: 200,
            msg: "获取成功",
            data: {
                admins: admins.slice((cp-1)*ps, cp*ps),
                totalNum: admins.length,
            }
        }
    },
    get_admins_fai: (param)=>{
        return{
            code: 500,
            msg: "获取失败",
        };
    },
    add_admin_suc:(param)=>{
        return {
            code: 200,
            msg: "添加成功",
            data: {}
        }
    },
    add_admin_fai:(param)=>{
        return {
            code: 500,
            msg: "该邮箱已被注册",
        }
    },
}