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
        var ans = this.$parent.sendMessage('', "/order/plan/production", "get");
        // var ans = {
        //   ret: true,
        //   content: [
        //     {
        //       id: '413095',
        //       subOrders: [
        //         {
        //           id: '413095_1',
        //           resources: [
        //             {
        //               id: "hr5",
        //               name: "5组-童龄（5）"
        //             },
        //             {
        //               id: "hr4",
        //               name: "4组-梨花（6）"
        //             },
        //             {
        //               id: "line4",
        //               name: "车床4号"
        //             },
        //             {
        //               id: "line5",
        //               name: "压缩机5号"
        //             },
        //           ],
        //           tasks: [
        //             {
        //               resourceId: "hr5",
        //               resourceName: "5组-童龄（5）",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "hr4",
        //               resourceName: "4组-梨花（6）",
        //               startTime: "2020-11-03 09:00",
        //               endTime: "2020-11-03 11:00"
        //             },
        //             {
        //               resourceId: "line4",
        //               resourceName: "车床4号",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "line5",
        //               resourceName: "车床5号",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //           ]
        //         },
        //         {
        //           id: '413095_2',
        //           resources: [
        //             {
        //               id: "hr5",
        //               name: "5组-童龄（5）"
        //             },
        //             {
        //               id: "hr2",
        //               name: "2组-牡丹（3）"
        //             },
        //             {
        //               id: "line7",
        //               name: "车床7号"
        //             },
        //             {
        //               id: "line12",
        //               name: "压缩机12号"
        //             },
        //           ],
        //           tasks: [
        //             {
        //               resourceId: "hr5",
        //               resourceName: "5组-童龄（5）",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "hr4",
        //               resourceName: "4组-梨花（6）",
        //               startTime: "2020-11-03 09:00",
        //               endTime: "2020-11-03 19:00"
        //             },
        //             {
        //               resourceId: "line4",
        //               resourceName: "车床4号",
        //               startTime: "2020-11-03 21:00",
        //               endTime: "2020-11-03 22:00"
        //             },
        //             {
        //               resourceId: "line5",
        //               resourceName: "车床5号",
        //               startTime: "2020-11-03 13:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //           ]
        //         },
        //       ]
        //     },
        //     {
        //       id: '503952',
        //       subOrders: [
        //         {
        //           id: '50395_1',
        //           resources: [
        //             {
        //               id: "hr5",
        //               name: "5组-童龄（5）"
        //             },
        //             {
        //               id: "hr4",
        //               name: "4组-梨花（6）"
        //             },
        //             {
        //               id: "line4",
        //               name: "车床4号"
        //             },
        //           ],
        //           tasks: [
        //             {
        //               resourceId: "hr5",
        //               resourceName: "5组-童龄（5）",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "hr4",
        //               resourceName: "4组-梨花（6）",
        //               startTime: "2020-11-03 09:00",
        //               endTime: "2020-11-03 11:00"
        //             },
        //             {
        //               resourceId: "line4",
        //               resourceName: "车床4号",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //           ]
        //         },
        //         {
        //           id: '50395_2',
        //           resources: [
        //             {
        //               id: "hr1",
        //               name: "1组-百合（5）"
        //             },
        //             {
        //               id: "hr4",
        //               name: "4组-梨花（6）"
        //             },
        //             {
        //               id: "line4",
        //               name: "车床4号"
        //             },
        //             {
        //               id: "line5",
        //               name: "压缩机5号"
        //             },
        //           ],
        //           tasks: [
        //             {
        //               resourceId: "hr5",
        //               resourceName: "5组-童龄（5）",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "hr4",
        //               resourceName: "4组-梨花（6）",
        //               startTime: "2020-11-03 09:00",
        //               endTime: "2020-11-03 11:00"
        //             },
        //             {
        //               resourceId: "line4",
        //               resourceName: "车床4号",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "line5",
        //               resourceName: "车床5号",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //           ]
        //         },
        //         {
        //           id: '50395_3',
        //           resources: [
        //             {
        //               id: "hr5",
        //               name: "5组-童龄（5）"
        //             },
        //             {
        //               id: "hr4",
        //               name: "4组-梨花（6）"
        //             },
        //             {
        //               id: "line4",
        //               name: "车床4号"
        //             },
        //             {
        //               id: "line5",
        //               name: "压缩机5号"
        //             },
        //           ],
        //           tasks: [
        //             {
        //               resourceId: "hr5",
        //               resourceName: "5组-童龄（5）",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "hr4",
        //               resourceName: "4组-梨花（6）",
        //               startTime: "2020-11-03 09:00",
        //               endTime: "2020-11-03 11:00"
        //             },
        //             {
        //               resourceId: "line4",
        //               resourceName: "车床4号",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //             {
        //               resourceId: "line5",
        //               resourceName: "车床5号",
        //               startTime: "2020-11-03 07:00",
        //               endTime: "2020-11-03 15:00"
        //             },
        //           ]
        //         },
        //       ]
        //     }
        //   ]
        // }

        for(var i = 0; i < ans.content.length; i++){
          this.spandata.push(ans.content[i].subOrders.length+1);
          var res = [];
          var subRes = [];
          var timeC = 0;
          var subtimeC = 0;
          for(var j=0 ; j<ans.content[i].subOrders.length ; j++){
            for(var k=0; k< ans.content[i].subOrders[j].resources.length; k++){
              if(res.indexOf(ans.content[i].subOrders[j].resources[k].id) == -1){
                res.push(ans.content[i].subOrders[j].resources[k].id);
              }
              subRes.push(ans.content[i].subOrders[j].resources[k].id);
              var sdate = new Date(ans.content[i].subOrders[j].tasks[k].startTime.replace(/-/g,"/"));
              var edate = new Date(ans.content[i].subOrders[j].tasks[k].endTime.replace(/-/g,"/"));
              var temp = (edate.getTime()-sdate.getTime())/(1000*60*60);
              timeC += temp;
              subtimeC += temp;
            }
            var temp = {
              id: ans.content[i].id,
              subID: ans.content[i].subOrders[j].id,
              resCount: subRes.length,
              timeCount: subtimeC,
            }
            this.tableData.push(temp);
            subRes=[];
            subtimeC = 0;
          }
          var temp = {
            id: ans.content[i].id,
            subID: "合计",
            resCount: res.length,
            timeCount: timeC,
          }
          this.tableData.push(temp);
          res = [];
          timeC = 0;
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
