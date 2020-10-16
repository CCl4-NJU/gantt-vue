<template>
  <div class="container" v-if="dataLoaded">
    <product-gantt class="left-container" :tasks="tasks"></product-gantt>
    <router-link to='/order'>
      Jump to see order gantt...
    </router-link>
  </div>
</template>

<script>
/* eslint-disable */
import ProductGantt from './components/ProductGantt.vue';
import axios from 'axios'
export default {
  name: 'app',
  components: {ProductGantt},
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
