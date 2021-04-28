<template>
    <div class="container">
        <div class="main-content-wrapper">
        <div class="main-content">
            <div class="login-title">知识协同管理端</div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon >
                <el-form-item prop="email">
                    <el-input type="text" v-model="loginForm.email" prefix-icon="el-icon-message" placeholder="请输入邮箱">
                        <template slot="append"><div class="login-send-code" @click="sendCode">{{sendEmailCodeMsg}}</div></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="emailCode">
                    <el-input type="text" v-model="loginForm.emailCode" prefix-icon="el-icon-key" placeholder="请输入邮箱验证码"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="text" v-model="loginForm.password" @focus="hideError" prefix-icon="el-icon-lock" :show-password=true auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="login-button">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
        </div>
    </div>
</template>

<script>
import {loginApi,sendEmailCodeApi} from '../api/login';

export default {
    name: 'Login',
    data(){
        return {
            loginForm: {
                password: '',
                email: '',
                emailCode: ''
            },
            sendEmailCodeMsg: '发送验证码',
            sendCodeHandle: null,
            rules: {
                email: [
                    { required: true, message: "请输入邮箱", trigger: 'blur' },
                    { type: 'email',  message: "请输入正确格式", trigger: 'blur' },
                ],
                emailCode:{ required: true, message: "请输入邮箱验证码", trigger: 'blur' },
                password: [
                    { required: true, message: "请输入密码", trigger: 'blur' },
                    {
                        validator: (rule, value, callback)=>{
                            if(value === '') callback(new Error("请输入密码"));
                            else callback();
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },

    methods: {
        sendCode(){
            if(this.sendCodeHandle==null){
                sendEmailCodeApi({email: this.loginForm.email}).then((result)=>{
                    // this.$message.success(result.msg);
                    this.$message.success("验证码已发送，请注意查收");
                    let count = 60;
                    this.sendCodeHandle = setInterval(()=>{
                        count--;
                        this.sendEmailCodeMsg = `请${count}秒后重发`;
                        if(count==0){
                            clearInterval(this.sendCodeHandle);
                            this.sendCodeHandle = null; 
                            this.sendEmailCodeMsg = "发送验证码"
                        }
                    }, 1000);
                }).catch((reason)=>{
                    this.$message.error(reason);
                });
            }
        },
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    loginApi(this.loginForm).then( (result)=> {
                        
                        let token = result.data.token;
                        let user = result.data.user;
                        // user.password = user.password.replace(/\w/g, '*');
                        // console.log(user);
                        if(user&&user.password){
                            user.password = '*'.repeat(user.password.length) 
                        }
                        this.$store.commit('SET_TOKEN', token);
                        this.$store.commit('SET_USERINFO', user);
                        this.$message({
                            message: result.msg,
                            type: 'success',
                            duration: 1000,
                            onClose:()=>{this.$router.push('/main')}
                        });
                        
                    }).catch((reason) =>{
                        this.showError = true;
                        this.errorMessage = reason;
                    })
                } 
                else{
                    return false;
                }
            })
        },
        hideError(){
            this.showError = false;
        }
    }
}
</script>

<style lang="less">
@import "../assets/css/common.less";

.container{
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(0deg, white, @support-color-ps); 
}

.main-content-wrapper{
    width: 30%;
    min-width: 20rem;
    margin: 6rem 35% 2rem;
    position: absolute;
    border: solid #eeeeee 1px;
    border-radius: 3%;
    overflow: hidden;  
}

.main-content-wrapper:before{
    content: '';
    width: 140%;
    height: 200rem;
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    left: -20%; 
    top: -2rem; 
    -webkit-filter:blur(2rem);
    filter: blur(2rem);
}

.main-content{
    padding: 2rem 2rem 0;
    z-index: 1;
}


.login-title{
    text-align: center;
    color: #ffffff;
    margin-bottom: 2rem;
    font-size: 2rem;
}

.login-send-code{
    font-size: .6rem;
}

.login-send-code:hover{
    color: @support-color-ps;
}


.login-button{
    width: 100%;
}

</style>