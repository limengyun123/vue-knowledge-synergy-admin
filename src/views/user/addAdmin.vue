<template>
    <div>
        <GoBackHead />
        <el-form :model="adminInfo" status-icon ref="adminInfo" :rules="infoRules" label-width="100px" class="admin-info-form">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="adminInfo.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="actualName">
                <el-input v-model="adminInfo.actualName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio v-model="adminInfo.sex" :label='1'>男</el-radio>
                <el-radio v-model="adminInfo.sex" :label='0'>女</el-radio>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="adminInfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="adminInfo.email"></el-input>
            </el-form-item>
            <el-form-item label="超级权限" prop="sex">
                <el-radio v-model="adminInfo.superLevel" :label='1'>是</el-radio>
                <el-radio v-model="adminInfo.superLevel" :label='0'>否</el-radio>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="adminInfo.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="ensurePassword">
                <el-input type="password" v-model="adminInfo.ensurePassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitInfoForm('adminInfo')">提交修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import GoBackHead from '../../components/goBackHead';
import {addAdminApi} from '../../api/user';

export default {
    name: "AddAdmin",
    components:{
        'GoBackHead': GoBackHead
    },
    data(){
        return {
            adminInfo: {
                userName: '',
                actualName: '',
                sex: 1,
                phone: '',
                email: '',
                superLevel: 1,
                password: '',
                ensurePassword: ''
            },
            infoRules:{
                userName:[
                    { required: true, message: "请输入用户名", trigger: 'blur' },
                    { min: 6, max: 30, message: "请输入6-30个字符", trigger: 'blur' }
                ],
                actualName:[
                    { required: true, message: "请输入用户真实姓名", trigger: 'blur' },
                    { min: 2, max: 4, message: "请输入2-4个字符", trigger: 'blur' }
                ],
                phone: [
                    { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: "请输入正确格式", trigger: 'blur' }
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: 'blur' },
                    { // pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                        type: 'email', message: "邮箱格式不正确", trigger: 'blur' }
                ],
                password:[
                    { required: true, message: "请输入账户密码", trigger: 'blur' },
                    { min: 6, max: 30, message: "请输入6-30个字符", trigger: 'blur' }
                ],
                ensurePassword: [
                    { required: true, message: "请再次输入账户密码", trigger: 'blur' },
                    {
                        validator:(rule, value, callback) => {
                            if (this.adminInfo.password===value) callback();
                            else callback(new Error('两次密码输入不匹配'));
                        }
                    }
                ]
                
            }
        }
    },
    methods:{
        submitInfoForm(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    addAdminApi(this.adminInfo).then((result)=>{
                        this.$message({
                            type: 'success',
                            message: result.msg,
                            duration: 1000,
                            onClose:()=>{this.$refs[formName].resetFields();}
                        });
                    }).catch((reason)=>{
                        this.$message.error(reason);
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.admin-info-form{
    width: 25rem;
    margin: 2rem auto 1rem;
}
</style>