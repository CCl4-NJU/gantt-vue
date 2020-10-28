<template>
  <div ref="ogantt"></div>
</template>

<script>
/* eslint-disable */
import {gantt} from 'dhtmlx-gantt';
export default {
  name: 'OrderGantt',
  props: {
    orderTasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    },
    currentDate: String
  },
  methods:{
    render(){
      gantt.config.date_format = "%Y-%m-%d %H:%i";//设置数据中的时间格式，对应start_date格式
      gantt.config.columns = [//设置列
        {name:"number", label:"订单号",    width:"*", align:"center"},
        {name:"text",   label:"工艺名称", width:"*", tree:true, align:"center" }
      ];
      gantt.plugins({
        tooltip: true,//鼠标划过任务是否显示明细
      });
      gantt.config.duration_unit = "minute";
      
      gantt.templates.tooltip_text = function (start, end, task) {
          return '<b> ' + task.name + ' </b>' + '<br/><b>约定交期:</b> ' + task.deal_date + '<br/><b>预计交期:</b> ' + task.expc_date
      }
      
      gantt.config.start_date = new Date(this.currentDate+" 00:00");//时间刻度的开始时间
      gantt.config.end_date = new Date(this.currentDate+" 23:59");//时间刻度的结束时间
      gantt.config.scales = [
        {unit: "day", step: 1, format: "%Y-%m-%d"} //时间刻度的显示单位
      ];

      gantt.config.readonly=true;//只读模式的甘特图

      gantt.init(this.$refs.ogantt);
      gantt.parse(this.$props.orderTasks);
    }
  },
  computed: {
    divKey: function () {
      return new Date()
    }
  },
  created () {
    gantt.clearAll() // 先清空，再添加，就不会有缓存
  },
  mounted() {
    this.render();
  },
  watch:{
    orderTasks: function(){
      this.render();
    }
  }
}
</script>

<style>
    @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
