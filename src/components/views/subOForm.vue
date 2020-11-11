<template>
  <el-table
   :data="tableData"
   :span-method="objectSpanMethod"
   v-loading="loading"
   border
   style="width: 100%; margin-top: 20px; text-align: center;">
   <el-table-column
     prop="id"
     label="子订单ID"
     width="180">
   </el-table-column>
   <el-table-column label="使用资源">
     <el-table-column
       prop="resID"
       label="资源ID">
     </el-table-column>
     <el-table-column
       prop="resName"
       label="资源名称">
     </el-table-column>
     <el-table-column
       prop="startTime"
       label="开始使用时间">
     </el-table-column>
     <el-table-column
       prop="finishTime"
       label="结束使用时间">
     </el-table-column>
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

        axios.get('/order/plan/production')
          .then(request => {
            var res = request.data
            if ( res.ret && res.content ){
              for(var i = 0; i < res.content.length; i++){
                for(var j=0 ; j<res.content[i].subOrders.length ; j++){
                  if(res.content[i].subOrders[j].resources.length != 0){
                    this.spandata.push(res.content[i].subOrders[j].resources.length);
                  }
                  else{
                    console.error("订单信息错误，子订单没有资源");
                    console.error("子订单ID："+res.content[i].subOrders[j].id);
                    continue;
                  }
                  for(var k=0; k< res.content[i].subOrders[j].resources.length; k++){
                    var temp = {
                      id: res.content[i].subOrders[j].id,
                      resID: res.content[i].subOrders[j].resources[k].id,
                      resName: res.content[i].subOrders[j].resources[k].name,
                      startTime: res.content[i].subOrders[j].tasks[k].startTime,
                      finishTime: res.content[i].subOrders[j].tasks[k].endTime,
                    }
                    this.tableData.push(temp);
                  }
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
