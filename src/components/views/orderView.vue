<template>
  <div class="container" v-if="dataLoaded">
    <order-gantt class="left-container" :tasks="tasks"></order-gantt>
    <router-link to='/'>
      Jump to see product3-resource gantt...
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import OrderGantt from '../sub/OrderGantt.vue'
 import axios from 'axios'
export default {
  name: 'order',
  components: {OrderGantt},
  data () {
    return {
      dataLoaded: false,
      tasks: {}
    }
  },
  methods: {
    getOrderInfo () {
      axios.get('/order-2020-10-01')
        .then(request => {
          var res = request.data
          if ( res.ret && res.tasks ){
            this.tasks = res.tasks
            this.dataLoaded = true
          }
        })
    }
  },
  mounted () {
    this.getOrderInfo()
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
