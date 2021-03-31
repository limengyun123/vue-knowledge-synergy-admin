// mock数据
export default {
    login_result_suc: (param)=>{
        //console.log(param.body);
        return{
            code: 200,
            msg: "登录成功",
            headers:{'authorization': 'hfos93789yhef139hfw3827rhg8'},
            data: {
                actualName: '赵天泽',
                phone: '17305827492',
                superLevel: true
            }
        };
    },
    login_result_fai:()=> {
        return {
            code: 500,
            msg: "账户名或密码错误",
        }
    },
    logout_result_suc: (param)=>{
        return{
            code: 200,
            msg: "退出成功",
        };
    },
    logout_result_fai:()=> {
        return {
            code: 500,
            msg: "退出失败",
        }
    }
}