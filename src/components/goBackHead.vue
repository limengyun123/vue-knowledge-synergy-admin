<template>
    <el-header class='head'>
        <el-col :span='2'>
            <span class="el-icon-back" @click="getBack"></span>
        </el-col>
        <el-col :span='22'>
        <el-breadcrumb class="bread-crumb" separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
            <el-breadcrumb-item>{{this.parentDir}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.childDir}}</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
    </el-header>
</template>

<script>
export default {
    name: "GoBackHeader",
    data(){
        return {
            parentDir: "",
            childDir: ""
        }
    },
    mounted(){
        let path = this.$route.fullPath.split('/');
        switch(path.pop()){
            case "addAdmin":
                this.parentDir = "用户管理";
                this.childDir = "添加管理员";
                break;
            case 'personalInfo':
                this.parentDir = "个人信息";
                this.childDir = "个人档案";
            default:
                switch(path.pop()){
                    case "createProject":
                        this.parentDir = "团队协同";
                        this.childDir = "创建项目";
                        break;
                    case "editTeam":
                        this.parentDir = "团队协同";
                        this.childDir = "编辑团队信息";
                        break;
                    case "addTeammates":
                        this.parentDir = "团队协同";
                        this.childDir = "添加成员";
                        break;
                    case "editShorthand":
                        this.parentDir = "个人空间";
                        this.childDir = "编辑速记";
                        break;
                    case "assignTask":
                        this.parentDir = "项目管理";
                        this.childDir = "分配任务";
                        break;
                }
        }
    },
    methods:{
        getBack(){
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>
.head{
    border-bottom: lightblue solid 0.1rem;
    box-shadow: lightblue 0 0 0.5rem 0 ;
    font-size: 2rem;
    padding: 0.6rem 1rem;

}
.bread-crumb{
    margin-top: 0.8rem;
}
</style>
