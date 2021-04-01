<template>
    <div v-if="teamData.length">
        <div>
            <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                <el-select v-model="searchMothod" slot="prepend" placeholder="请选择查询方式">
                    <el-option label="所有" :value="4"></el-option>
                    <el-option label="团队ID" :value="0"></el-option>
                    <el-option label="团队名" :value="1"></el-option>
                    <el-option label="用户ID" :value="2"></el-option>
                    <el-option label="是否可用" :value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="searchSpecificTeam"></el-button>
            </el-input>
        </div>
        <el-table :data="teamData" style="width: 100%">
            <el-table-column fixed prop="teamId" label="团队ID" width="80"></el-table-column>
            <el-table-column prop="teamName" label="队名" width="150"></el-table-column>
            <el-table-column prop="teamBrief" label="简介" width="200"></el-table-column>
            <el-table-column prop="teamInstitute" label="所属机构" width="120"></el-table-column>
            <el-table-column prop="leaderId" label="队长ID" width="80"></el-table-column>
            <el-table-column prop="teammates" label="成员数" width="80"></el-table-column>
            <el-table-column prop="teamCreateTime" label="创建时间" width="140"></el-table-column>
            <el-table-column prop="teamUsedSize" label="已用空间" width="80"></el-table-column>
            <el-table-column prop="teamResourceSize" label="可用空间" width="80"></el-table-column>
            <el-table-column fixed="right" label="是否可用" width="60">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.teamIsActive" @change="changeStatus($event, scope.row)"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="警告" width="60" align="center">
                <template slot-scope="scope">
                    <span class="el-icon-warning" @click="handleWarning(scope.row.teamId)"></span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationInfo.currentPage"
            :page-sizes="[10, 20, 30, 40]"
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
import {getTeamsApi} from '../../api/team';
import {sendMessageApi} from '../../api/user';

export default {
    name: 'Team',
    data() {
        return {
            searchInput: '',
            searchMothod: 3,
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 7
            },
            teamData: [],
            showDrawer: false,
            chatWithChosen: 0,
            chatContent: '',
            messageRecord:[]
        }
    },
    created(){
        this.getTeams();
    },
    methods: {
        getTeams(){
            getTeamsApi({currentPage:this.paginationInfo.currentPage, pageSize:this.paginationInfo.pageSize,method: this.searchMothod, content: this.searchInput}).then((result)=>{
                this.paginationInfo.totalNum = result.data.totalNum;
                this.teamData = result.data.teams;
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getTeams();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getTeams();
        },
        searchSpecificTeam(){
            this.getTeams();
        },
        changeStatus(callback, row) {
            let text = '';

            if (callback) text = '您将解冻此团队，团队成员将能正常使用系统功能。是否解冻？';
            else text = '您将冻结此团队，团队成员将不能正常使用系统功能。是否冻结？';

            this.$confirm(`${text}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let message = '';
                if (row.teamIsActive) message = '解冻成功';
                else message = '冻结成功';
                this.$message({type: 'success', message });
            }).catch(() => {
                row.teamIsActive = row.teamIsActive ? false : true;
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
            // console.log(e);
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
                messageSendTime: time, 
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