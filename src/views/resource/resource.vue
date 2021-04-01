<template>
    <div>
        <div v-if="resources.length">
            <div>
                <span>资源类型：</span>
                <el-select v-model="searchMothodType" slot="prepend">
                    <el-option label="所有" :value="4"></el-option>
                    <el-option label="未审核" :value="0"></el-option>
                    <el-option label="敏感资源" :value="1"></el-option>
                    <el-option label="正常资源" :value="2"></el-option>
                </el-select>
                <span>资源是否删除：</span>
                <el-select v-model="searchMothodDeleted" slot="prepend">
                    <el-option label="所有" :value="2"></el-option>
                    <el-option label="未删除" :value="0"></el-option>
                    <el-option label="已删除" :value="1"></el-option>
                </el-select>
                <el-button icon="el-icon-search" @click="searchSpecificResources"></el-button>
            </div>
            <div>
                <div v-for="item in resources" :key="item.rId" class="project-resources">
                    <el-row>
                        <el-col :span="2">
                            <el-avatar :src="require('@/assets/img/file_type_1.png')" shape="square" size="large"></el-avatar>
                        </el-col>
                        <el-col :span="18">
                            <div>{{item.rName}}</div>
                            <div>{{item.rUploadTime}} 来自{{item.rAuthorName}} {{item.rSize}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div v-if="item.rReview==2">
                                <span class="el-icon-success icon-success">正常资源</span>
                            </div>
                            <div v-else-if="item.rReview==1">
                                <span class="el-icon-success icon-warning">敏感资源</span>
                            </div>
                            <div v-else>
                                <span>未审核 </span>
                                <el-dropdown trigger="click" @command="handleAudit">
                                    <span class="el-dropdown-link">
                                        <span class="el-icon-more-outline"></span>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-success" class="icon-success" :command="item.rId+'2'">正常资源</el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-success" class="icon-warning" :command="item.rId+'1'">敏感资源</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
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
        </div>
        <div v-else>
            暂无资源
        </div>
    
    </div>
</template>

<script>
import {getResourcesApi, auditResourceApi} from '../../api/resource';

export default {
    name: "Resource",
    data(){
        return {
            searchMothodType: 4,
            searchMothodDeleted: 2,
            paginationInfo:{
                totalNum: 0,
                currentPage: 1,
                pageSize: 10,
                pagerCount: 7
            },
            resources:[]
        }
    },
    created(){
        this.getResource();
    },
    methods:{
        getResource(){
            getResourcesApi({
                currentPage:this.paginationInfo.currentPage, 
                pageSize:this.paginationInfo.pageSize,
                type: this.searchMothodType,
                isDeleted: this.searchMothodDeleted
            }).then((result)=>{
                this.resources = result.data.resources;
                this.paginationInfo.totalNum = result.data.totalNum;
            }).catch((reason=>{
                this.$message.error(reason);
            }));
        },
        searchSpecificResources(){
            this.getResource();
        },
        handleAudit(e){
            let rId = parseInt(e.substring(0, e.length-1));
            let type = parseInt(e[e.length-1]);
            // type: '1'：敏感资源 '2'：正常资源
            auditResourceApi({rId: rId, type: type}).then((result)=>{
                for(let item of this.resources){
                    if(item.rId==rId){
                        item.rReview = type;
                        break;
                    }
                }
            }).catch((reason)=>{
                this.$message.error(reason);
            })
        },
        handleSizeChange(val){
            this.paginationInfo.pageSize = val;
            this.getResource();
        },
        handleCurrentChange(val){
            this.paginationInfo.currentPage = val;
            this.getResource();
        }
    },
}
</script>

<style scoped>
    .pagination{
        margin-top: 3rem;
        text-align: center;
    }

    .icon-success{
        color: #00dd00;
    }

    .icon-warning{
        color: #ffbb00;
    }


</style>