<template>
  <el-table
   :data="tableData"
   :span-method="objectSpanMethod"
   v-loading="loading"
   border
   :header-cell-style= "{'background-color': '#F5F7FA'}"
   style="width: 100%; margin-top: 20px; text-align: center;">
   <el-table-column
     prop="id"
     label="订单ID"
     width="180">
   </el-table-column>
   <el-table-column
     prop="subID"
     label="子订单ID">
   </el-table-column>
   <el-table-column
     prop="resCount"
     label="使用资源数量(单位:种)">
   </el-table-column>
   <el-table-column
     prop="timeCount"
     label="使用时间统计(单位:小时)">
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
                if(res.content[i].subOrders.length != 0){
                  this.spandata.push(res.content[i].subOrders.length+1);
                }
                else{
                  console.error("订单信息错误，没有子订单");
                  console.error("订单ID："+res.content[i].id);
                  continue;
                }
                var collectRes = [];
                var subRes = [];
                var timeC = 0;
                var subtimeC = 0;
                for(var j=0 ; j<res.content[i].subOrders.length ; j++){
                  for(var k=0; k< res.content[i].subOrders[j].resources.length; k++){
                    if(collectRes.indexOf(res.content[i].subOrders[j].resources[k].id) == -1){
                      collectRes.push(res.content[i].subOrders[j].resources[k].id);
                    }
                    subRes.push(res.content[i].subOrders[j].resources[k].id);
                    var sdate = new Date(res.content[i].subOrders[j].tasks[k].startTime.replace(/-/g,"/"));
                    var edate = new Date(res.content[i].subOrders[j].tasks[k].endTime.replace(/-/g,"/"));
                    var temp = (edate.getTime()-sdate.getTime())/(1000*60*60);
                    timeC += temp;
                    subtimeC += temp;
                  }
                  var temp = {
                    id: res.content[i].id,
                    subID: res.content[i].subOrders[j].id,
                    resCount: subRes.length,
                    timeCount: subtimeC,
                  }
                  this.tableData.push(temp);
                  subRes=[];
                  subtimeC = 0;
                }
                var temp = {
                  id: res.content[i].id,
                  subID: "合计（去重）",
                  resCount: collectRes.length,
                  timeCount: timeC,
                }
                this.tableData.push(temp);
                collectRes = [];
                timeC = 0;
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
  }
</script>

<style>
  .cell{
    text-align: center;
  }
</style>
