<template>
  <div ref="resganttd"></div>
</template>

<script>
/* eslint-disable */
import {gantt} from 'dhtmlx-gantt';
export default {
  name: 'ResourceGanttDay',
  props: {
    resTasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    },
    start_date: String,
    end_date: String
  },
  created () {
    gantt.clearAll() // 先清空，再添加，就不会有缓存
  },
  mounted: function () {
    const that = this;
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
        return '<b>产品名称:</b> ' + task.text
        + '<br/><b>工作时间:</b> ' + new Date(start).getHours()+':'+new Date(start).getMinutes()
        +' - '+ new Date(end).getHours()+':'+new Date(end).getMinutes()
    }

    //此处和设置时间相关
    gantt.config.start_date = new Date(this.start_date+" 00:00");//时间刻度的开始时间
    gantt.config.end_date = new Date(this.end_date+" 23:59");//时间刻度的结束时间
    gantt.config.scales = [
      {unit: "day", step: 1, format: "%m-%d"} //时间刻度的显示单位
    ];

    gantt.config.readonly=true;//只读模式的甘特图

    gantt.attachEvent("onTaskClick", function(id, e){
      var pid = -1;
      var current_date = "";
      const data = that.resTasks.data;
      for(var i=0; i<data.length; i++){
        if(data[i].id==id){
          //console.log("found!");
          pid = data[i].product_id;
          current_date = data[i].start_date.split(" ")[0];
          break;
        }
      }
      if(pid>-1){
        that.$router.push({path: "/product", query: {id: pid, date: current_date}});
      }
      return true;
    });

    gantt.init(this.$refs.resganttd);
    gantt.parse(this.$props.resTasks);
  }
}
</script>

<style>
    @import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
