<template>
    <div>
        <div><el-button><router-link to='/user/addAdmin'>添加管理员</router-link></el-button></div>
        <div v-if="adminData.length">
            <el-table :data="adminData" style="width: 100%">
                <el-table-column fixed prop="userId" label="用户ID" width="80"></el-table-column>
                <el-table-column prop="userName" label="用户名" width="150"></el-table-column>
                <el-table-column prop="actualName" label="姓名" width="80"></el-table-column>
                <el-table-column prop="sex" label="性别" width="50">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex">男</span>
                        <span v-else>女</span>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="电话号码" width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column fixed="right" label="超级权限" width="120">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.superLevel" @change="changeStatus($event, scope.row)"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationInfo.currentPage"
                :page-sizes="[3,10, 20, 30, 40]"
                :page-size="paginationInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationInfo.totalNum"
                :pager-count="paginationInfo.paperCount"
                hide-on-single-page
                >
            </el-pagination>
        </div>
        <div v-else>
            暂无管理员信息
        </div>
    </div>
</template>

<script>
import {getAdminsApi} from '../../api/user';

export default {
    name: 'Administrator',
    data() {
        return {
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 7
            },
            adminData: [],
        }
    },
    created(){
        this.getAdmins();
    },
    methods: {
        getAdmins(){
            getAdminsApi({currentPage:this.paginationInfo.currentPage, pageSize: this.paginationInfo.pageSize}).then((result)=>{
                this.paginationInfo.totalNum = result.data.totalNum;
                this.adminData = result.data.admins;
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getAdmins();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getAdmins();
        },
        changeStatus(callback, row) {
            if(row.userId==1){
                row.superLevel = true;
                this.$message({type: 'warning', message:'禁止操作'});
                return ;
            }
            let text = '';

            if (callback) text = '您将为此用户添加超级管理权限。是否添加？';
            else text = '您将取消此用户的超级管理权限。是否取消？';

            this.$confirm(`${text}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let message = '';
                if (row.superLevel) message = '添加成功';
                else message = '取消成功';
                this.$message({type: 'success', message });
            }).catch(() => {
                row.superLevel = row.superLevel ? false : true;
                this.$message({ type: 'info', message: '您已取消操作' });
          });
        },
        
    },
}
</script>

<style scoped>
    .pagination{
        margin-top: 3rem;
        text-align: center;
    }

    .el-icon-circle-plus{
        color: #bbbbbb;
        background: #bbbbbb;
        border-radius: 1rem;
    }
    .icon-active{
        color: #00dd00;
        background: #00dd00;
    }

    .el-icon-warning{
        font-size: 1.3rem;
        color: #ffbb00;
    }


</style>