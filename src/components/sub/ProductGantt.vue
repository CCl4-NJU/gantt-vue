<template>
  <div ref="progantt"></div>
</template>

<script>
/* eslint-disable */
import {gantt} from 'dhtmlx-gantt';
export default {
  name: 'ProductGantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    },
    start_date: String
  },
 
  mounted: function () {
    gantt.config.date_format = "%Y-%m-%d %H:%i";//设置数据中的时间格式，对应start_date格式
    gantt.config.columns = [//设置列
      {name:"resource", label:"资源",    width:"*", align:"center"},
      {name:"text",     label:"产品名称", width:"*", tree:true, align:"center" }
    ];
    gantt.plugins({
      tooltip: true,//鼠标划过任务是否显示明细
      // auto_scheduling: true,//根据任务之间的关系自动安排任务
      // multiselect: true, //为任务激活多任务选择
    });
    gantt.config.duration_unit = "minute";
    // gantt.templates.tooltip_date_format=function (date){
    // 	var formatFunc = gantt.date.date_to_str("%Y-%m-%d %H:%i");
    // 	return formatFunc(date);
    // };
    //自定义工具栏
    gantt.templates.tooltip_text = function (start, end, task) {
        return '<b>任务名称:</b> ' + task.text + '<br/><b>工作时间:</b> ' + new Date(start).getHours()+':'+new Date(start).getMinutes()+' - '+ new Date(end).getHours()+':'+new Date(end).getMinutes()
    }
    //监测到鼠标已经离开包裹着ghtml的div的解决方案
    // gantt.ext.tooltips.tooltipFor({
      //   selector: '.gantt_grid [' + gantt.config.task_attribute + ']',
      //   global: true
      // })
    gantt.config.start_date = new Date(this.start_date+" 00:00");//时间刻度的开始时间
    gantt.config.end_date = new Date(this.start_date+" 23:59");//时间刻度的结束时间
    gantt.config.scales = [
      {unit: "hour", step: 1, format: "%H:%i"} //时间刻度的显示单位
    ];
    // gantt.attachEvent("onGanttReady", function(){
    // 	var tooltips = gantt.ext.tooltips;
    // 	tooltips.tooltip.setViewport(gantt.$task_data);
    // });
    
    // gantt.config.multiselect = false
    // gantt.config.multiselect_one_level = true; //在一个或任何级别内是否可以使用多任务选择
    gantt.config.readonly=true;//只读模式的甘特图
 
    gantt.init(this.$refs.progantt);
    gantt.parse(this.$props.tasks);
  }
}
</script>
 
<style>
    @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
