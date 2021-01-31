<template>
    <div class="container">
        <div class="main-content">
            <div class="title">知识协同管理端</div>
            <el-alert class="error-alert" :title="errorMessage" v-if="showError" type="error" show-icon></el-alert>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" status-icon >
                <el-form-item prop="userName">
                    <el-input type="text" v-model="loginForm.userName" @focus="hideError" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
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
</template>

<script>
import {loginApi} from '../api/login';

export default {
    name: 'Login',
    data(){
        return {
            showError: false,
            errorMessage: '',
            loginForm: {
                password: '',
                userName: ''
            },
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: 'blur'
                    },
                    {
                        min: 6,
                        max: 30,
                        message: "用户名长度应在6-30个字符内",
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: 'blur'
                    },
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
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    loginApi(this.loginForm).then( (result)=> {
                        
                        const token = result.headers['authorization'];
                        this.$store.commit('SET_TOKEN', token);
                        this.$store.commit('SET_USERINFO', Object.assign({},this.loginForm, result.data));
                        this.$message({
                            message: '登录成功',
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

<style scoped>
/* 毛玻璃背景 */
.container::before{
	background:url("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2140868464,3705580502&fm=26&gp=0.jpg") 0 / cover fixed;
    content:'';
	position:absolute;
	top:0;
	right:0;
	bottom:0;
	left:0;
	z-index:-1;
	-webkit-filter:blur(0.7rem);
	filter:blur(0.7rem);
}


.main-content{
    border-radius: 3%;
    width: 15rem;
    text-align: center;
    margin: 6rem auto 0;
    padding: 2rem;
    background-color:rgba(248,248,248,0.4);
}

.error-alert{
    margin-bottom: 1rem;
    /* transition: all 1s ease ; */
}

.title{
    margin: 1rem 0;
    font-size: 2rem;
    color: rgba(64,158,254);
    text-shadow: #ffffff 0.2rem 0.2rem 0.2rem;
}

.login-button{
    width: 15rem;
    font-size: 1rem;
}


</style>