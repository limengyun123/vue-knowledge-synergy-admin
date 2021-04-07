<template>
    <div class='user-page'>
        <div class='user-search-box'>
            <el-input placeholder="请输入内容" v-model="searchInput" class="user-input-with-select">
                <el-select v-model="searchMethod" slot="prepend" placeholder="请选择查询方式" class='user-method-select'>
                    <el-option label="用户ID" :value="1"></el-option>
                    <el-option label="用户名" :value="2"></el-option>
                    <el-option label="姓名" :value="3"></el-option>
                    <el-option label="性别" :value="4"></el-option>
                    <el-option label="电话号码" :value="5"></el-option>
                    <el-option label="邮箱" :value="6"></el-option>
                    <el-option label="是否在线" :value="7"></el-option>
                    <el-option label="是否激活" :value="8"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchSpecificUser"></el-button>
            </el-input>
        </div>
        <div v-if="userData.length" class="user-data-show">
            <el-table :data="userData" class="user-table">
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
                <el-table-column prop="registerTime" label="注册时间" width="140"></el-table-column>
                <el-table-column prop="status" label="在线" width="50" align="center">
                    <template slot-scope="scope">
                        <span :class="{'el-icon-circle-plus': true, 'user-icon-active': scope.row.status }"></span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="激活" width="60">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.isActive" @change="changeStatus($event, scope.row)"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="警告" width="60" align="center">
                    <template slot-scope="scope">
                        <span class="el-icon-warning user-warning" @click="handleWarning(scope.row.id)"></span>
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
                        <div v-for="msg in messageRecord" :key="msg.messageId" class="message-item">                        
                            <div class='message-content'>{{msg.messageContent}}</div>                        
                        </div>
                    </div>
                    <div>
                        <el-input type="textarea" v-model="chatContent" class='message-input' placeholder="请在此输入..."></el-input>
                        <!-- <el-button class="message-send-button" @click="sendMessage">发送</el-button> -->
                        <ButtonPrimary class="message-send-button" @buttonClick='sendMessage'>
                            发送
                        </ButtonPrimary>
                    </div>
                </div>
            </el-drawer>
        </div>
        <div v-else>
            <NoData />
        </div>
    </div>
</template>

<script>
import {getUsersApi,sendMessageApi} from '../../api/user';
import NoData from '../../components/noData';
import ButtonPrimary from '../../components/buttonPrimary';

export default {
    name: 'Client',
    components:{
        'NoData': NoData,
        'ButtonPrimary': ButtonPrimary
    },
    data() {
        return {
            searchInput: '',
            searchMethod: '',
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
            getUsersApi({
                currentPage:this.paginationInfo.currentPage, 
                pageSize:this.paginationInfo.pageSize,
                searchMethod: this.searchMethod, 
                searchInput: this.searchInput
            }).then((result)=>{
                console.log(1);
                this.paginationInfo.totalNum = result.data.totalNum;
                this.userData = result.data.users||[];
                console.log(2);
            }).catch((reason)=>{
                console.log(3);
                // this.$message.error(reason);
                console.log(4);
            })
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
                row.isActive = row.isActive ? false : true;
                this.$message({ type: 'info', message: '您已取消操作' });
          });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                this.chatWithChosen = 0;
                this.chatContent = '';
                this.messageRecord = [];
                done();
            })
            .catch(_ => {});
        },
        handleWarning(e){
            console.log(e);
            this.chatWithChosen = e;
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
                messageMndTime: time, 
                messageContent: this.chatContent
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

.user-page{
    padding: 1rem;
}

.user-search-box{
    margin: 1rem;
}

.user-data-show{
    margin:1rem;
}

.user-table{
    box-shadow: #dddddd 0 0 0.4rem;
    border: 0.1rem solid #dddddd;
    border-radius: 0.4rem;
}


.pagination{
    margin-top: 2rem;
    text-align: center;
}

.user-input-with-select {
    width: 35rem;
    background-color: #fff;
}

.user-method-select{
    width: 9rem;
}


.el-icon-circle-plus{
    color: #bbbbbb;
    background-color: #bbbbbb;
    border-radius: 1rem;
}

.user-icon-active{
    color: #00dd00;
    background-color: #00dd00;
}

.user-warning{
    font-size: 1.3rem;
    color: #ffbb00;
}

.message-drawer{
    margin: auto 5%;
}

.message-frame{
    height: 20rem;
    background-color: #fafafa;
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
    background-color: white;
    border-radius: 1rem;
    padding: 0.5rem;
    max-width: 50%;
    line-height: 1.5rem;
    color: #555555;
    font-size: 0.8rem;
}

.message-input >>> .el-textarea__inner{
    resize: none;/* 去掉 textarea 下面拉伸的标志*/
    height: 5rem;
    margin: 1rem auto;
}

.message-send-button{
    float: right;
}

</style>