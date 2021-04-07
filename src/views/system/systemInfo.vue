<template>
    <div class='system-info-page'>
        <!-- 用户访问量 -->
        <div class='system-chart-item'>
            <el-select v-model="checkMothodVisit" slot="prepend" @change="selectChange" class='system-chart-select' popper-class="system-chart-select-option">
                <el-option label="近一周用户访问量" :value="1"></el-option>
                <el-option label="近一月用户访问量" :value="2"></el-option>
                <el-option label="近一年用户访问量" :value="3"></el-option>
                <el-option label="近三年用户访问量" :value="4"></el-option>
            </el-select>
            <div id='user-visit' class='system-chart-area'>
            </div>
        </div>
        <!-- 注册用户数量 -->
        <div class='system-chart-item'>
            <el-select v-model="checkMothodRegister" slot="prepend" @change="selectChange" class='system-chart-select' popper-class="system-chart-select-option">
                <el-option label="近一周注册用户数量" :value="1"></el-option>
                <el-option label="近一月注册用户数量" :value="2"></el-option>
                <el-option label="近一年注册用户数量" :value="3"></el-option>
                <el-option label="近三年注册用户数量" :value="4"></el-option>
            </el-select>
            <div id='user-register' class='system-chart-area'>
            </div>
        </div>
        <!-- 新建团队数量 -->
        <div class='system-chart-item'>
            <el-select v-model="checkMothodTeam" slot="prepend" @change="selectChange" class='system-chart-select' popper-class="system-chart-select-option">
                <el-option label="近一周新建团队数量" :value="1"></el-option>
                <el-option label="近一月新建团队数量" :value="2"></el-option>
                <el-option label="近一年新建团队数量" :value="3"></el-option>
                <el-option label="近三年新建团队数量" :value="4"></el-option>
            </el-select>
            <div id='team-created' class='system-chart-area'>
            </div>
        </div>
        <!-- 资源使用情况 -->
        <div class='system-chart-item'>
            <el-select v-model="checkMothodResorce" slot="prepend" @change="selectChange" class='system-chart-select' popper-class="system-chart-select-option">
                <el-option label="近一周资源使用情况" :value="1"></el-option>
                <el-option label="近一月资源使用情况" :value="2"></el-option>
                <el-option label="近一年资源使用情况" :value="3"></el-option>
                <el-option label="近三年资源使用情况" :value="4"></el-option>
            </el-select>
            <div id='resource-stored' class='system-chart-area'>
            </div>
        </div>
        <!-- 在线用户量及男女比 -->
        <div class='system-chart-item'>
            <el-select v-model="checkMothodTeam" slot="prepend" class='system-chart-select' popper-class="system-chart-select-option">
                <el-option label="此刻用户在线数量" :value="1"></el-option>
            </el-select>
            <div id='user-online' class='system-chart-area'>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart} from 'echarts/charts';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
    [TooltipComponent, LegendComponent, GridComponent,LineChart, BarChart,PieChart, CanvasRenderer]
);

var chartUserVisit = null;
var chartUserRegister = null;
var chartTeamCreated = null;
var chartUserOnline = null;
var chartUserStored = null;

export default {
    name: "SystemInfo",
    data(){
        return {
            checkMothodVisit: 3,
            checkMothodRegister: 2,
            checkMothodTeam: 1,
            checkMothodOnline: 1,
            checkMothodResorce: 3
        }
    },
    mounted(){
        this.initCharts();
        this.updateCharts(chartUserVisit, this.getUserVisitData());
        this.updateCharts(chartUserRegister, this.getUserRegisterData());
        this.updateCharts(chartTeamCreated, this.getTeamCreatedData());
        this.generateCharts();
        this.updateCharts(chartUserStored, this.getResourceStoredData());
    },
    methods:{
        initCharts(){
            chartUserVisit = echarts.init(document.getElementById('user-visit'));
            chartUserRegister = echarts.init(document.getElementById('user-register'));
            chartTeamCreated = echarts.init(document.getElementById('team-created'));
            chartUserOnline = echarts.init(document.getElementById('user-online'));
            chartUserStored = echarts.init(document.getElementById('resource-stored'));
        },
        getUserVisitData(){
            let userVisitYear = [2273, 2238, 3194, 3198, 4184, 5832, 5304, 4892, 5178, 6194, 6390, 6810];
            let xAxis = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            let legend = ["用户访问量"];
            return {
                legend: legend,
                xAxis: {boundaryGap: false, data:xAxis},
                series: [
                    {
                        name: legend[0],
                        type: 'line',
                        data: userVisitYear
                    }
                ]    
            }
        },
        getUserRegisterData(){
            let userRegister = [[10,11,5,12,3,4,12],[9,4,8,8,5,5,10]];
            let legend = ["男性", "女性"];
            let xAxis = ["3-24","3-25","3-26","3-27","3-28","3-29","3-30"];
            return {
                legend: legend,
                xAxis: {data: xAxis},
                series: userRegister.map((value, index)=>{
                    return {
                        name: legend[index],
                        type: 'bar',
                        stack: 'regiser',
                        data: value
                    }
                })
            }
        },
        getTeamCreatedData(){
            let teamCreated = [1, 2, 5, 7, 12, 16, 18, 24, 27, 35, 45];
            let xAxis = ["3-1","3-3","3-6","3-9","3-12","3-15","3-18","3-21","3-24","3-27","3-30"];
            let legend = ['团队创建总数'];
            return {
                legend: legend,
                xAxis: {boundaryGap: false, data:xAxis},
                series: {
                    name: legend[0],
                    type: 'line',
                    data: teamCreated
                }
            }
        },
        getResourceStoredData(){
            let userVisitYear = [2273, 2238, 3194, 3198, 4184, 5832, 5304, 4892, 5178, 6194, 6390, 6810];
            let xAxis = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            let legend = ['资源使用量'];
            return {
                legend: legend,
                xAxis: {boundaryGap: false, data:xAxis},
                series: [
                    {
                        name: legend[0],
                        type: 'line',
                        data: userVisitYear
                    }
                ]    
            }
        },
        updateCharts(chart, param){
            chart.setOption({
                tooltip:{ trigger: 'axis' },
                legend: { data: param.legend},
                xAxis: param.xAxis,
                yAxis: {},
                series: param.series
            });
        },
        generateCharts(){
            let teamCreated = [{name:'男性用户',value: 432}, {name: '女性用户', value: 305}];
            let teamTotal = [{name:'总数', value:737}];
            chartUserOnline.setOption({
                tooltip: {trigger: 'item' },
                legend: { top: '5%', left: 'center' },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        label: {
                            position: 'center',
                            color: 'white',
                            fontSize: 24,
                            formatter: '{c}'
                        },
                        tooltip: {show: false},
                        radius: ['0%', '30%'],
                        data: teamTotal
                    },
                    {
                        name: '访问来源',
                        type: 'pie',
                        label: {formatter: '{b}\n{d}%'},
                        radius: ['40%', '70%'],
                        data: teamCreated
                    }
                ]
            });
        },
        selectChange(e){
            // console.log('here',e);
        }
    }
}
</script>

<style lang="less">
@import "../../assets/css/common.less";

.system-info-page{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.system-chart-item{
    margin: 3rem 2rem;
}

/* 修改el-select的样式*/
.system-chart-select{
    border-left: solid 0.4rem @support-color-ps;
    margin-bottom: 1rem;
}

.system-chart-select .el-input__inner{
    font-size: 1.2rem;
    font-weight: 600;
    color: #555555;    
    background-color: transparent;
    border: none;
} 

.system-chart-select-option .el-select-dropdown__item:hover{
    background-color:@support-color-bg;
}

.system-chart-select-option .selected{
    color:@main-color;
}
/* 修改el-select的样式结束*/

.system-chart-area{
    background: white;
    width: 30rem;
    height: 18rem;
    padding: 0.5rem;
    text-align: center;
    box-shadow: #dddddd 0 0 0.4rem;
    border: 0.1rem solid #dddddd;
    border-radius: 0.4rem;
}

#user-online{
    width: 30rem;
    height: 20rem;
}
</style>