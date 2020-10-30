<template>
  <!-- <res-controll></res-controll> -->
  <hello-world></hello-world>
</template>

<script>
import resControll from "../sub/ResourceList.vue"
import helloWorld from "../sub/HelloWorld.vue"
export default {
  name: 'resControll',
  components: {resControll, helloWorld},
}
</script>

<style>
</style>
