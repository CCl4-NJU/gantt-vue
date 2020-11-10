<template>
  <el-table
   :data="tableData"
   :span-method="objectSpanMethod"
   v-loading="loading"
   border
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
        tableData: []
      };
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          var locate = this.spandata.indexOf(rowIndex);
          if(locate != -1){locate += 1;}
          else{locate = 0;}
          if (rowIndex === 0 || locate != 0) {
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
        // var ans = this.$parent.sendMessage('', "/order/plan", "get");
        var ans = {
          ret: true,
          content: [
            {
              id: '413095',
              subOrders: [
                {
                  id: '413095_1',
                  startTime: '2020-11-03 07:00',
                  finishTime: '2020-11-03 21:00'
                },
                {
                  id: '413095_2',
                  startTime: '2020-11-03 10:00',
                  finishTime: '2020-11-03 17:00'
                },
                {
                  id: '413095_3',
                  startTime: '2020-11-03 19:00',
                  finishTime: '2020-11-03 21:00'
                },
                {
                  id: '413095_4',
                  startTime: '2020-11-03 6:00',
                  finishTime: '2020-11-03 9:00'
                }
              ]
            },
            {
              id: '503952',
              subOrders: [
                {
                  id: '503952_1',
                  startTime: '2020-11-03 07:00',
                  finishTime: '2020-11-03 21:00'
                },
                {
                  id: '503952_2',
                  startTime: '2020-11-03 10:00',
                  finishTime: '2020-11-03 17:00'
                },
                {
                  id: '503952_3',
                  startTime: '2020-11-03 19:00',
                  finishTime: '2020-11-03 21:00'
                },
                {
                  id: '503952_4',
                  startTime: '2020-11-03 6:00',
                  finishTime: '2020-11-03 9:00'
                },
                {
                  id: '503952_5',
                  startTime: '2020-11-03 6:00',
                  finishTime: '2020-11-03 9:00'
                }
              ]
            }
          ]
        }
        console.log(ans);
        console.log(ans.content.length);
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
        this.loading=false;
      }
    },
    mounted() {
      this.updateData();
    }
  };
</script>

<style>
</style>
