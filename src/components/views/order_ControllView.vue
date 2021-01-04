<template>
  <div style="height: fit-content;">
    <el-tabs :tab-position="tabPosition" v-model="activeName" style="margin-top: 1.5rem; height: 100%;">
      <el-tab-pane label="新增订单" name="first"><order-add></order-add></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import OrderAdd from '../sub/OrderAdd.vue'
export default{
  name: 'orderControll',
  components: {OrderAdd},
  data() {
    return {
      tabPosition: 'left',
      activeName: 'first'
    }
  }
}
</script>

<style>
  .el-tabs__header{
    width: 7rem;
  }
</style>
