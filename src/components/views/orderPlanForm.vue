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
        var ans = this.$parent.sendMessage('', "/order/plan", "get");
        // var ans = {
        //   ret: true,
        //   content: [
        //     {
        //       id: '413095',
        //       subOrders: [
        //         {
        //           id: '413095_1',
        //           startTime: '2020-11-03 07:00',
        //           finishTime: '2020-11-03 21:00'
        //         },
        //         {
        //           id: '413095_2',
        //           startTime: '2020-11-03 10:00',
        //           finishTime: '2020-11-03 17:00'
        //         },
        //         {
        //           id: '413095_3',
        //           startTime: '2020-11-03 19:00',
        //           finishTime: '2020-11-03 21:00'
        //         },
        //         {
        //           id: '413095_4',
        //           startTime: '2020-11-03 6:00',
        //           finishTime: '2020-11-03 9:00'
        //         }
        //       ]
        //     },
        //     {
        //       id: '503952',
        //       subOrders: [
        //         {
        //           id: '503952_1',
        //           startTime: '2020-11-03 07:00',
        //           finishTime: '2020-11-03 21:00'
        //         },
        //         {
        //           id: '503952_2',
        //           startTime: '2020-11-03 10:00',
        //           finishTime: '2020-11-03 17:00'
        //         },
        //         {
        //           id: '503952_3',
        //           startTime: '2020-11-03 19:00',
        //           finishTime: '2020-11-03 21:00'
        //         },
        //         {
        //           id: '503952_4',
        //           startTime: '2020-11-03 6:00',
        //           finishTime: '2020-11-03 9:00'
        //         },
        //         {
        //           id: '503952_5',
        //           startTime: '2020-11-03 6:00',
        //           finishTime: '2020-11-03 9:00'
        //         }
        //       ]
        //     }
        //   ]
        // }
        
        for(var i = 0; i < ans.content.length; i++){
          this.spandata.push(ans.content[i].subOrders.length);
          for(var j=0 ; j<ans.content[i].subOrders.length ; j++){
            var temp = {
              id: ans.content[i].id,
              subOrderID: ans.content[i].subOrders[j].id,
              startTime: ans.content[i].subOrders[j].startTime,
              finishTime: ans.content[i].subOrders[j].finishTime,
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
