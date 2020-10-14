<template>
  <div class="container">
    <order-gantt class="left-container" :tasks="tasks"></order-gantt>
    <router-link to='/'>
      Jump to see product3-resource gantt...
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import OrderGantt from './components/OrderGantt.vue';
 
export default {
  name: 'page',
  components: {OrderGantt},
  data () {
    return {
      tasks: {
        data: [
          {
            id: 1,
            number: "418575",
            text: "装配",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 1,
            color: "lime",
            name: "产品1",
            deal_date: "2020年10月1日",
            expc_date: "2020年10月1日"
          },
          {
            id: 2,
            number: "418575",
            text: "装配100%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 1,
            color: "lime",
            name: "产品1",
            deal_date: "2020年10月1日",
            expc_date: "2020年10月1日",
            parent: 1
          },
          {
            id: 3,
            number: "418577",
            text: "装配",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 1,
            color: "lime",
            name: "产品2",
            deal_date: "2020年10月1日",
            expc_date: "2020年10月1日"
          },
          {
            id: 4,
            number: "418577",
            text: "装配100%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 1.00,
            color: "lime",
            name: "产品2",
            deal_date: "2020年10月1日",
            expc_date: "2020年10月1日",
            parent: 3
          },
          {
            id: 5, 
            number: "764486", 
            text: "装配",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.6,
            color: "red",
            name: "产品3",
            deal_date: "2020年10月1日",
            expc_date: "2020年10月5日"
          },
          {
            id: 6, 
            number: "764486",
            text: "装配60%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.6,
            color: "red",
            name: "产品3",
            deal_date: "2020年10月1日",
            expc_date: "2020年10月5日",
            parent: 5
          },
          {
            id: 7, //对象id
            number: "762904", //订单号
            text: "装配，测试", //任务名称
            start_date: "2020-10-01 07:00", //开始时间
            duration: 6 * 60, //持续时间
            progress: 0.2, //完成度
            color: "darkturquoise", //颜色
            name: "产品4", //产品名称
            deal_date: "2020年10月10日", //约定交期
            expc_date: "2020年10月10日" //预计交期
          },
          {
            id: 8,
            number: "762904",
            text: "装配23%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.23,
            color: "darkturquoise",
            name: "产品4",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日",
            parent: 7 //父任务id
          },
          {
            id: 9,
            number: "762904",
            text: "测试18%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.18,
            color: "darkturquoise",
            name: "产品4",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日",
            parent: 7
          },
          {
            id: 10,
            number: "418477",
            text: "装配，测试",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.11,
            color: "darkturquoise",
            name: "产品5",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日"
          },
          {
            id: 11,
            number: "418477",
            text: "装配23%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.23,
            color: "darkturquoise",
            name: "产品5",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日",
            parent: 10
          },
          {
            id: 12,
            number: "418477",
            text: "测试0%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0,
            color: "darkturquoise",
            name: "产品5",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日",
            parent: 10
          },
          {
            id: 13,
            number: "418006",
            text: "装配，测试",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.19,
            color: "darkturquoise",
            name: "产品6",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日"
          },
          {
            id: 14,
            number: "418006",
            text: "装配20%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.20,
            color: "darkturquoise",
            name: "产品6",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日",
            parent: 13
          },
          {
            id: 15,
            number: "418006",
            text: "测试18%",
            start_date: "2020-10-01 07:00",
            duration: 6 * 60,
            progress: 0.18,
            color: "darkturquoise",
            name: "产品6",
            deal_date: "2020年10月10日",
            expc_date: "2020年10月10日",
            parent: 13
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
