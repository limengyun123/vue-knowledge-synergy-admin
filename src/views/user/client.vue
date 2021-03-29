<template>
    <div v-if="userData.length">
        <div>
            <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                <el-select v-model="searchMothod" slot="prepend" placeholder="请选择查询方式">
                    <el-option label="用户ID" value="userId"></el-option>
                    <el-option label="用户名" value="userName"></el-option>
                    <el-option label="姓名" value="actualName"></el-option>
                    <el-option label="性别" value="sex"></el-option>
                    <el-option label="电话号码" value="phone"></el-option>
                    <el-option label="邮箱" value="email"></el-option>
                    <el-option label="是否在线" value="status"></el-option>
                    <el-option label="是否激活" value="isActive"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchSpecificUser"></el-button>
            </el-input>
        </div>
        <el-table :data="userData" style="width: 100%">
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
            <el-table-column prop="registerTime" label="注册时间" width="140"></el-table-column>
            <el-table-column prop="status" label="在线" width="50" align="center">
                <template slot-scope="scope">
                    <span :class="{'el-icon-circle-plus': true, 'icon-active': scope.row.status }"></span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="激活" width="60">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isActive" :active-value='1' :inactive-value='0' @change="changeStatus($event, scope.row)"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="警告" width="60" align="center">
                <template slot-scope="scope">
                    <span class="el-icon-warning" @click="handleWarning(scope.row.userId)"></span>
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
        <el-drawer title="发送警告" :visible.sync="showDrawer" direction="rtl" :before-close="handleClose">
            <div class='message-drawer'>
                <div class='message-frame' ref="message-frame">
                    <div v-for="msg in messageRecord" :key="msg.mId" class="message-item">                        
                        <div class='message-content'>{{msg.content}}</div>                        
                    </div>
                </div>
                <div>
                    <el-input type="textarea" v-model="chatContent" class='message-input' placeholder="请在此输入..."></el-input>
                    <el-button type="primary" class="message-send-button" @click="sendMessage">发送</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
    <div v-else>
        暂无用户信息
    </div>
</template>

<script>
import {getUsersApi,sendMessageApi} from '../../api/user';

export default {
    name: 'Client',
    data() {
        return {
            test: 1,
            searchInput: '',
            searchMothod: '',
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 7
            },
            userData: [],
            showDrawer: false,
            chatWithChosen: 0,
            chatContent: '',
            messageRecord:[]
        }
    },
    created(){
        this.getUsers();
    },
    methods: {
        getUsers(){
            getUsersApi({currentPage:this.paginationInfo.currentPage, pageSize:this.paginationInfo.pageSize,method: this.searchMothod, content: this.searchInput}).then((result)=>{
                this.paginationInfo.totalNum = result.data.totalNum;
                this.userData = result.data.users;
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getUsers();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getUsers();
        },
        searchSpecificUser(){
            this.getUsers();
        },
        changeStatus(callback, row) {
            let text = '';

            if (callback) text = '您将解冻此用户，Ta将能正常使用系统功能。是否解冻？';
            else text = '您将冻结此用户，Ta将不能正常使用系统功能。是否冻结？';

            this.$confirm(`${text}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let message = '';
                if (row.isActive) message = '解冻成功';
                else message = '冻结成功';
                this.$message({type: 'success', message });
            }).catch(() => {
                row.isActive = row.isActive ? 0 : 1;
                this.$message({ type: 'info', message: '您已取消操作' });
          });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleWarning(e){
            console.log(e);
            this.showDrawer=true;
        },
        sendMessage(){
            if(this.chatContent){
                let param = this.chatWithChosen;
                sendMessageApi(param).then((result)=>{
                    this.pushMessage();
                    this.chatContent = '';
                    
                }).catch((reason)=>{
                    this.$message.error(reason);
                })
            }
        },
        async pushMessage(){
            let time = new Date();
            await this.messageRecord.push({
                //senderId: this.getUserId, 
                sendTime: time, 
                content: this.chatContent
            });
            this.toBottom();
        },
        toBottom(){
            this.$refs['message-frame'].scrollTo(0,this.$refs['message-frame'].scrollHeight);
        },
    },
}
</script>

<style scoped>
    .input-with-select {
        width: 35rem;
        background-color: #fff;
    }

    .el-select{
        width: 9rem;
    }

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

    .message-drawer{
        margin: auto 5%;
    }

    .message-frame{
        height: 20rem;
        background: #fafafa;
        border-radius: 1rem;
        box-shadow: #aaaaaa 0 0 0.4rem;
        overflow: scroll;
        padding: 0.8rem;
    }
    .message-item{
        display: flex;
        flex-direction: row-reverse;
        justify-content: stretch;
        margin: 2rem auto;
    }

    .message-content{
        background: white;
        border-radius: 1rem;
        padding: 0.5rem;
        max-width: 50%;
        line-height: 1.5rem;
        color: #555555;
        font-size: 0.8rem;
    }

    .message-input>>>.el-textarea__inner{
        resize: none;/* 去掉 textarea 下面拉伸的标志*/
        height: 5rem;
        margin: 1rem auto;
    }

    .message-send-button{
        float: right;
    }

</style>