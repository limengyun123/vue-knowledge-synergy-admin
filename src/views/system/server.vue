<template>
  <div class="app">
    <div id="box" class="bos"></div>
  </div>
</template>
<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);
 

export default {
  name: "app",
  components: {},
  mounted() {
    this.initChart();
  },
  data() {
    return {};
  },
  methods: {
    initChart() {
      let bos = echarts.init(document.getElementById("box"));

      // 绘制图表
      bos.setOption(this.setOption1("我是柱状图"));
    },
    setOption1(title) {
      let option = {
        title: { text: title },
        tooltip: {},
        legend: {data: '销量'},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
      return option;
    }
  }
};
</script>
<style scoped>
  .bos {
    width: 500px;
    height: 300px;
    margin: 0 auto;
  }
</style>
