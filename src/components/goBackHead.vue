<template>
    <el-header class='common-head'>
        <span class="el-icon-back" @click="getBack"></span>
        <span>
            <span>{{this.parentDir}}</span>
            <span>/</span>
            <span>{{this.childDir}}</span>
        </span>
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

<style lang="less">
@import "../assets/css/common.less";

.common-head{
    height: 4rem;
    background-color: @main-color;
    color:white;
    line-height: 4rem;
}

.common-head .el-icon-back{
    font-size: 2rem;
    margin-right: 3rem;
}
</style>
