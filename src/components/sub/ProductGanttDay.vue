<template>
  <div ref="proganttd"></div>
</template>

<script>
/* eslint-disable */
import {gantt} from 'dhtmlx-gantt';
export default {
  name: 'ProductGanttDay',
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
      {name:"text",     label:"产品名称", tree: true, width:"*", align:"center"}
    ];
    gantt.plugins({
      tooltip: true,//鼠标划过任务是否显示明细
    });
    gantt.config.duration_unit = "minute";
    
    gantt.templates.tooltip_text = function (start, end, task) {
        return '<b>任务名称:</b> ' + task.text 
        + '<br/><b>工作时间:</b> ' + new Date(start).getHours()+':'+new Date(start).getMinutes()
        +' - '+ new Date(end).getHours()+':'+new Date(end).getMinutes()
    }
    
    gantt.config.start_date = new Date("2020-10-01 00:00");//时间刻度的开始时间
    gantt.config.end_date = new Date("2020-10-05 23:59");//时间刻度的结束时间
    gantt.config.scales = [
      {unit: "day", step: 1, format: "%m-%d"} //时间刻度的显示单位
    ];
    
    gantt.config.readonly=true;//只读模式的甘特图
 
    gantt.init(this.$refs.proganttd);
    gantt.parse(this.$props.tasks);
  }
}
</script>
 
<style>
    @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
