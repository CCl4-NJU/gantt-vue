<template>
  <el-table
   :data="tableData"
   :span-method="objectSpanMethod"
   v-loading="loading"
   border
   :header-cell-style= "{'background-color': '#F5F7FA'}"
   style="width: 100%; margin-top: 20px;">
   <el-table-column
     prop="id"
     label="订单ID"
     width="180">
   </el-table-column>
   <el-table-column
     prop="subOrderID"
     label="子订单ID">
   </el-table-column>
   <el-table-column
     prop="startTime"
     label="子订单开始时间">
   </el-table-column>
   <el-table-column
     prop="finishTime"
     label="子订单结束时间">
   </el-table-column>
  </el-table>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        loading: true,
        spandata: [],
        locatedata: [],
        tableData: []
      };
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          var locate = this.locatedata.indexOf(rowIndex);
          if (locate != -1) {
            return {
              rowspan: this.spandata[locate],
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      updateData(){
        this.loading = true;

        axios.get('/order/plan')
          .then(request => {
            var res = request.data
            if ( res.ret && res.content ){
              for(var i = 0; i < res.content.length; i++){
                this.spandata.push(res.content[i].subOrders.length);
                for(var j=0 ; j<res.content[i].subOrders.length ; j++){
                  var temp = {
                    id: res.content[i].id,
                    subOrderID: res.content[i].subOrders[j].id,
                    startTime: res.content[i].subOrders[j].startTime,
                    finishTime: res.content[i].subOrders[j].finishTime,
                  }
                  this.tableData.push(temp);
                }
              }
              this.locatedata.push(0);
              for(var i = 1; i< this.spandata.length;i++){
                this.locatedata.push(this.locatedata[i-1]+this.spandata[i-1]);
              }
              this.loading=false;
            }
          });

      }
    },
    mounted() {
      this.spandata = [];
      this.tableData = [];
      this.locatedata = [];
      this.updateData();
    }
  };
</script>

<style>
  .cell{
    text-align: center;
  }
</style>
