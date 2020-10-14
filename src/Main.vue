<template>
  <div class="container">
    <resource-gantt class="left-container" :tasks="tasks"></resource-gantt>
  </div>
</template>

<script>
/* eslint-disable */
import ResourceGantt from './components/ResourceGantt.vue';
 
export default {
  name: 'main',
  components: {ResourceGantt},
  data () {
    return {
      tasks: {
        data: [
          {
            id: 1, //对象id
            resource: "Line 1", //资源名称
            percent: "80%", //资源使用率
            start_date: "2020-10-01 07:00", //资源开始使用时间
            duration: 22 * 60, //资源从开始使用到结束使用经历的时间
            text: "", //资源项设置为""
            color: "darkturquoise" //资源项统一颜色
          },
          {
            id: 2,
            resource: "Line 4",
            percent: "33%",
            start_date: "2020-10-01 09:00",
            duration: 2 * 60,
            text: "",
            color: "darkturquoise"
          },
          {
            id: 3,
            resource: "李四",
            percent: "67%",
            start_date: "2020-10-01 07:00",
            duration: 24 * 60,
            text: "",
            color: "darkturquoise"
          },
          {
            id: 4,
            resource: "小明",
            percent: "60%",
            start_date: "2020-10-01 09:00",
            duration: 10 * 60,
            text: "",
            color: "darkturquoise"
          },
          {
            id: 5,
            resource: "张三",
            percent: "75%",
            start_date: "2020-10-01 19:00",
            duration: 4 * 60,
            text: "",
            color: "darkturquoise"
          },
          {
            id: 6, //对象id
            resource: "Line 1", //占用资源
            percent: "", //产品项设置为""
            start_date: "2020-10-01 07:00", //开始时间
            duration: 3 * 60, //持续时间
            text: "产品1", //产品名称
            color: "green", //产品颜色
            parent: 1 //占用资源项的对象id
          },
          {
            id: 7,
            resource: "Line 1",
            percent: "",
            start_date: "2020-10-01 10:00",
            duration: 8 * 60,
            text: "产品2",
            color: "yellow",
            parent: 1
          },
          {
            id: 7,
            resource: "Line 1",
            percent: "",
            start_date: "2020-10-01 18:00",
            duration: 3 * 60,
            text: "产品3",
            color: "yellowgreen",
            parent: 1
          },
          {
            id: 8,
            resource: "Line 1",
            percent: "",
            start_date: "2020-10-01 21:00",
            duration: 8 * 60,
            text: "产品4",
            color: "blue",
            parent: 1
          },
          {
            id: 9,
            resource: "Line 4",
            percent: "",
            start_date: "2020-10-01 09:00",
            duration: 2 * 60,
            text: "产品3",
            color: "yellowgreen",
            parent: 2
          },
          {
            id: 10,
            resource: "李四",
            percent: "",
            start_date: "2020-10-01 07:00",
            duration: 3 * 60,
            text: "产品1",
            color: "green",
            parent: 3
          },
          {
            id: 11,
            resource: "李四",
            percent: "",
            start_date: "2020-10-01 10:00",
            duration: 8 * 60,
            text: "产品2",
            color: "yellow",
            parent: 3
          },
          {
            id: 12,
            resource: "李四",
            percent: "",
            start_date: "2020-10-02 05:00",
            duration: 2 * 60,
            text: "产品5",
            color: "red", //延期工艺设置为红色
            parent: 3
          },
          {
            id: 13,
            resource: "小明",
            percent: "",
            start_date: "2020-10-01 09:00",
            duration: 2 * 60,
            text: "产品3",
            color: "yellowgreen",
            parent: 4
          },
          {
            id: 14,
            resource: "小明",
            percent: "",
            start_date: "2020-10-01 18:00",
            duration: 1 * 60,
            text: "产品3",
            color: "yellowgreen",
            parent: 4
          },
          {
            id: 15,
            resource: "张三",
            percent: "",
            start_date: "2020-10-01 19:00",
            duration: 2 * 60,
            text: "产品3",
            color: "yellowgreen",
            parent: 5
          },
          {
            id: 16,
            resource: "小明",
            percent: "",
            start_date: "2020-10-01 21:00",
            duration: 2 * 60,
            text: "产品4",
            color: "blue",
            parent: 5
          }
        ],
        links: []
      },
    }
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
</style>
