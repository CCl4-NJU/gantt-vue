<template>
  <div class="container">
    <!-- <product-gantt class="left-container" :tasks="tasks"></product-gantt> -->
    <p><router-link to='/HelloWorld'>
      Jump to see HelloWorld...
    </router-link></p>
    <p><router-link to='/order'>
      Jump to see order gantt...
    </router-link></p>
    <p><router-link to='/product'>
      Jump to see product gantt...
    </router-link></p>
    <p><router-link to='/resource'>
      Jump to see resource gantt...
    </router-link></p>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
export default {
  name: 'app',
  // components: {ProductGantt},
  data () {
    return {
      dataLoaded: false,
      tasks: {}
    }
  },
  methods: {
    getProductInfo () {
      axios.get('/product-p3-2020-10-01')
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
    this.getProductInfo()
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
