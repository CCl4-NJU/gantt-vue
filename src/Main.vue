<template>
  <div class="container" v-if="dataLoaded">
    <resource-gantt class="left-container" :tasks="tasks"></resource-gantt>
  </div>
</template>

<script>
/* eslint-disable */
import ResourceGantt from './components/ResourceGantt.vue';
import axios from 'axios'
export default {
  name: 'main',
  components: {ResourceGantt},
  data () {
    return {
      dataLoaded: false,
      tasks: {}
    }
  },
  methods: {
    getResourceInfo () {
      axios.get('/resource-2020-10-01')
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
    this.getResourceInfo()
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
