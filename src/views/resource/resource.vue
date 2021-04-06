<template>
    <div class='resource-page'>
        <div class='resource-search-box'>
            <span class='resource-search-label'>资源类型：</span>
            <el-select v-model="searchMethodType" slot="prepend">
                <el-option label="未审核" :value="0"></el-option>
                <el-option label="敏感资源" :value="1"></el-option>
                <el-option label="正常资源" :value="2"></el-option>
            </el-select>
            <span class='resource-search-label'>资源是否删除：</span>
            <el-select v-model="searchMethodDeleted" slot="prepend">
                <el-option label="未删除" :value="0"></el-option>
                <el-option label="已删除" :value="1"></el-option>
            </el-select>
            <ButtonDefault @buttonClick="searchSpecificResources">
                <span class='el-icon-search'></span>
            </ButtonDefault>
        </div>
        <div v-if="resources.length" class="resource-data-show">
            <div class="resource-list">
                <div v-for="item in resources" :key="item.resourceId" class="resource-item">
                    <el-row>
                        <el-col :span="2">
                            <el-avatar :src="require('@/assets/img/file_type_1.png')" shape="square" size="large"></el-avatar>
                        </el-col>
                        <el-col :span="18">
                            <div>{{item.resourceName}}</div>
                            <div>{{item.resourceCreateTime}} 来自{{item.userName}} {{item.resourceSize}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div v-if="item.resourceReview==2">
                                <span class="el-icon-success icon-success">正常资源</span>
                            </div>
                            <div v-else-if="item.resourceReview==1">
                                <span class="el-icon-success icon-warning">敏感资源</span>
                            </div>
                            <div v-else>
                                <span>未审核 </span>
                                <el-dropdown trigger="click" @command="handleAudit">
                                    <span class="el-dropdown-link">
                                        <span class="el-icon-more-outline"></span>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item icon="el-icon-success" class="icon-success" :command="item.resourceId+'2'">正常资源</el-dropdown-item>
                                        <el-dropdown-item icon="el-icon-success" class="icon-warning" :command="item.resourceId+'1'">敏感资源</el-dropdown-item>
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
            <NoData />
        </div>
    </div>
</template>

<script>
import {getResourcesApi, auditResourceApi} from '../../api/resource';
import NoData from '../../components/noData';
import ButtonDefault from '../../components/buttonDefault';

export default {
    name: "Resource",
    components:{
        'NoData': NoData,
        'ButtonDefault': ButtonDefault
    },
    data(){
        return {
            searchMethodType: '',
            searchMethodDeleted: '',
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
                resourceReview: this.searchMethodType,
                resourceIsDeleted: this.searchMethodDeleted
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
            auditResourceApi({resourceId: rId, resourceReview: type}).then((result)=>{
                for(let item of this.resources){
                    if(item.resourceId==rId){
                        item.resourceReview = type;
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

<style>
.resource-page{
    padding: 1rem;
}

.resource-search-box{
    margin: 1rem;
    background-color: white;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
    box-shadow: #dddddd 0 0 0.4rem;
    color: #555555;
}

.resource-search-box .resource-search-label{
    margin-left: 2rem;
}

.resource-data-show{
    margin:1rem;
}

.resource-list{
    box-shadow: #dddddd 0 0 0.4rem;
    border: solid #dddddd 1px;
    border-radius: 0.4rem;
    background-color: white;
}

.resource-item{
    margin: 0.8rem 1rem;
    color: #555555;
}


.pagination{
    margin-top: 2rem;
    text-align: center;
}

.icon-success{
    color: #00dd00;
}

.icon-warning{
    color: #ffbb00;
}
</style>