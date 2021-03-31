<template>
    <div>
        <!-- 用户访问量 -->
        <div>
            <el-select v-model="checkMothodVisit" slot="prepend" @change="selectChange">
                <el-option label="近一周" :value="1"></el-option>
                <el-option label="近一月" :value="2"></el-option>
                <el-option label="近一年" :value="3"></el-option>
                <el-option label="近三年" :value="4"></el-option>
            </el-select>
            <div id='user-visit' class='chart-area'>
            </div>
        </div>
        <!-- 注册用户数量 -->
        <div>
            <el-select v-model="checkMothodRegister" slot="prepend" @change="selectChange">
                <el-option label="近一周" :value="1"></el-option>
                <el-option label="近一月" :value="2"></el-option>
                <el-option label="近一年" :value="3"></el-option>
                <el-option label="近三年" :value="4"></el-option>
            </el-select>
            <div id='user-register' class='chart-area'>
            </div>
        </div>
        <!-- 新建团队数量 -->
        <div>
            <el-select v-model="checkMothodTeam" slot="prepend" @change="selectChange">
                <el-option label="近一周" :value="1"></el-option>
                <el-option label="近一月" :value="2"></el-option>
                <el-option label="近一年" :value="3"></el-option>
                <el-option label="近三年" :value="4"></el-option>
            </el-select>
            <div id='team-created' class='chart-area'>
            </div>
        </div>
        <!-- 在线用户量及男女比 -->
        <div>
            <div id='user-online' class='chart-area'>
            </div>
        </div>
        <!-- 资源使用情况 -->
        <div>
            <el-select v-model="checkMothodResorce" slot="prepend" @change="selectChange">
                <el-option label="近一周" :value="1"></el-option>
                <el-option label="近一月" :value="2"></el-option>
                <el-option label="近一年" :value="3"></el-option>
                <el-option label="近三年" :value="4"></el-option>
            </el-select>
            <div id='resource-stored' class='chart-area'>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart} from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
    [TitleComponent, TooltipComponent, LegendComponent, GridComponent,LineChart, BarChart,PieChart, CanvasRenderer]
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
                title: "全年访问量",
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
                title: "近一周注册量",
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
                title: "近一周团队总数",
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
                title: "全年资源使用量",
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
                title: { text: param.title },
                tooltip:{ trigger: 'xAxis' },
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
                title: {text: '此刻在线用户数量'},
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

<style scoped>
    .chart-area{
        width: 35rem;
        height: 20rem;
    }
</style>