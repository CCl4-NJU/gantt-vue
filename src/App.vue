<template>
  <div class="container">
    <product-gantt class="left-container" :tasks="tasks"></product-gantt>
    <router-link to='/order'>
      Jump to see order gantt...
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import ProductGantt from './components/ProductGantt.vue';
 
export default {
  name: 'app',
  components: {ProductGantt},
  data () {
    return {
      tasks: {
        data: [
          {
            id: 1, //对象id
            resource: "Line 3", //资源名称
            text: "产品3", //产品名
            start_date: "2020-10-01 18:00", //开始时间
            duration: 3 * 60 //持续时间
          },
          {
            id: 2,
            resource: "Line 4",
            text: "产品3",
            start_date: "2020-10-01 09:00",
            duration: 2 * 60
          },
          {
            id: 4,
            resource: "小明",
            text: "产品3",
            start_date: "2020-10-01 09:00",
            duration: 2 * 60
          },
          {
            id: 5,
            resource: "小明",
            text: "产品3",
            start_date: "2020-10-01 18:00",
            duration: 1 * 60
          },
          {
            id: 6,
            resource: "张三",
            text: "产品3",
            start_date: "2020-10-01 19:00",
            duration: 2 * 60
          }
        ],
        links: [
          {id: 1, source: 2, target: 1, type: "0"},
          {id: 2, source: 4, target: 5, type: "0"},
          {id: 3, source: 5, target: 6, type: "0"}
        ]
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
