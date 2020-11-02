<template>
  <!-- <res-controll></res-controll> -->
  <!-- <hello-world></hello-world> -->
  <resource-list></resource-list>
</template>

<script>
import ResourceList from '../sub/ResourceList.vue'
//import resControll from "../sub/ResourceList.vue"
import helloWorld from "../sub/HelloWorld.vue"
export default {
  name: 'resControll',
  components: {ResourceList, helloWorld},
}
</script>

<style>
</style>
