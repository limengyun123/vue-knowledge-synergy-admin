<template>
    <div class='admin-page'>
        <el-button @click='jumpToAddAdmin' class='add-admin-button'> 添加管理员 </el-button>
        <div v-if="adminData.length" class="admin-data-show">
            <el-table :data="adminData" class="admin-table">
                <el-table-column fixed prop="id" label="用户ID" width="80"></el-table-column>
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
                        <el-switch v-model="scope.row.superLevel" @change="changeStatus($event, scope.row)" ></el-switch>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationInfo.currentPage"
                :page-sizes="[5, 10, 20, 30, 40]"
                :page-size="paginationInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="paginationInfo.totalNum"
                :pager-count="paginationInfo.paperCount"
                hide-on-single-page
                >
            </el-pagination>
        </div>
        <div v-else>
            <NoData />
        </div>
    </div>
</template>

<script>
import {getAdminsApi, updateLevelApi} from '../../api/user';
import NoData from '../../components/noData';

export default {
    name: 'Administrator',
    components:{
        'NoData': NoData,
    },
    data() {
        return {
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 5,
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
            if(row.id==1){
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
                
                updateLevelApi({id:this.$store.state.userInfo.id}).then((result)=>{
                    // let message = '';
                    // if (row.superLevel) message = result.msg;
                    // else message = '取消成功';
                    this.$message({type: 'success', message:result.msg });
                }).catch((reason)=>{
                    this.$message.error(reason);
                })             
            }).catch(() => {
                row.superLevel = row.superLevel ? false : true;
                this.$message({ type: 'info', message: '您已取消操作' });
          });
        },
        jumpToAddAdmin(){
            this.$router.push('/user/addAdmin');
        }
    },
}
</script>

<style>

.admin-page{
    padding: 1rem;
}

.add-admin-button{
    margin-left: 1rem;
}

.admin-data-show{
    margin:1rem;
}

.admin-table{
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
}


.pagination{
    margin-top: 2rem;
    text-align: center;
}

</style>