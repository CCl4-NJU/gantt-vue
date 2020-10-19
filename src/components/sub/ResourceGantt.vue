<template>
  <div ref="resgantt"></div>
</template>

<script>
/* eslint-disable */
import {gantt} from 'dhtmlx-gantt';
export default {
  name: 'ResourceGantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },
 
  mounted: function () {
    gantt.config.date_format = "%Y-%m-%d %H:%i";//设置数据中的时间格式，对应start_date格式
    gantt.config.columns = [//设置列
      {name:"resource", label:"资源",    width:"*", align:"center"},
      {name:"percent",  label:"使用率",  width:"*", align:"center" },
      {name:"text",  label:"产品",    width:"*", align:"center", tree:true}
    ];
    gantt.plugins({
      tooltip: true,//鼠标划过任务是否显示明细
      // auto_scheduling: true,//根据任务之间的关系自动安排任务
      // multiselect: true, //为任务激活多任务选择
    });
    gantt.config.duration_unit = "minute";
    //自定义工具栏
    gantt.templates.tooltip_text = function (start, end, task) {
        return ''
    }
    
    //此处和设置时间相关
    gantt.config.start_date = new Date("2020-10-01 07:00");//时间刻度的开始时间
    gantt.config.end_date = new Date("2020-10-02 07:59");//时间刻度的结束时间
    gantt.config.scales = [
      {unit: "hour", step: 1, format: "%H:%i"} //时间刻度的显示单位
    ];

    gantt.config.readonly=true;//只读模式的甘特图
 
    gantt.attachEvent("onTaskClick", function(id, e){
      console.log("task clicked!");
      return true;
    });

    gantt.init(this.$refs.resgantt);
    gantt.parse(this.$props.tasks);
  }
}
</script>
 
<style>
    @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
