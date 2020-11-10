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
        // var ans = this.$parent.sendMessage('', "/order/plan/production", "get");
        var ans = {
          ret: true,
          content: [
            {
              id: '413095',
              subOrders: [
                {
                  id: '413095_1',
                  resources: [
                    {
                      id: "hr5",
                      name: "5组-童龄（5）"
                    },
                    {
                      id: "hr4",
                      name: "4组-梨花（6）"
                    },
                    {
                      id: "line4",
                      name: "车床4号"
                    },
                    {
                      id: "line5",
                      name: "压缩机5号"
                    },
                  ],
                  tasks: [
                    {
                      resourceId: "hr5",
                      resourceName: "5组-童龄（5）",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "hr4",
                      resourceName: "4组-梨花（6）",
                      startTime: "2020-11-03 09:00",
                      endTime: "2020-11-03 11:00"
                    },
                    {
                      resourceId: "line4",
                      resourceName: "车床4号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "line5",
                      resourceName: "车床5号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                  ]
                },
                {
                  id: '413095_2',
                  resources: [
                    {
                      id: "hr5",
                      name: "5组-童龄（5）"
                    },
                    {
                      id: "hr4",
                      name: "4组-梨花（6）"
                    },
                    {
                      id: "line4",
                      name: "车床4号"
                    },
                    {
                      id: "line5",
                      name: "压缩机5号"
                    },
                  ],
                  tasks: [
                    {
                      resourceId: "hr5",
                      resourceName: "5组-童龄（5）",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "hr4",
                      resourceName: "4组-梨花（6）",
                      startTime: "2020-11-03 09:00",
                      endTime: "2020-11-03 11:00"
                    },
                    {
                      resourceId: "line4",
                      resourceName: "车床4号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "line5",
                      resourceName: "车床5号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                  ]
                },
              ]
            },
            {
              id: '503952',
              subOrders: [
                {
                  id: '50395_1',
                  resources: [
                    {
                      id: "hr5",
                      name: "5组-童龄（5）"
                    },
                    {
                      id: "hr4",
                      name: "4组-梨花（6）"
                    },
                    {
                      id: "line4",
                      name: "车床4号"
                    },
                    {
                      id: "line5",
                      name: "压缩机5号"
                    },
                  ],
                  tasks: [
                    {
                      resourceId: "hr5",
                      resourceName: "5组-童龄（5）",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "hr4",
                      resourceName: "4组-梨花（6）",
                      startTime: "2020-11-03 09:00",
                      endTime: "2020-11-03 11:00"
                    },
                    {
                      resourceId: "line4",
                      resourceName: "车床4号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "line5",
                      resourceName: "车床5号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                  ]
                },
                {
                  id: '50395_2',
                  resources: [
                    {
                      id: "hr5",
                      name: "5组-童龄（5）"
                    },
                    {
                      id: "hr4",
                      name: "4组-梨花（6）"
                    },
                    {
                      id: "line4",
                      name: "车床4号"
                    },
                    {
                      id: "line5",
                      name: "压缩机5号"
                    },
                  ],
                  tasks: [
                    {
                      resourceId: "hr5",
                      resourceName: "5组-童龄（5）",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "hr4",
                      resourceName: "4组-梨花（6）",
                      startTime: "2020-11-03 09:00",
                      endTime: "2020-11-03 11:00"
                    },
                    {
                      resourceId: "line4",
                      resourceName: "车床4号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "line5",
                      resourceName: "车床5号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                  ]
                },
                {
                  id: '50395_3',
                  resources: [
                    {
                      id: "hr5",
                      name: "5组-童龄（5）"
                    },
                    {
                      id: "hr4",
                      name: "4组-梨花（6）"
                    },
                    {
                      id: "line4",
                      name: "车床4号"
                    },
                    {
                      id: "line5",
                      name: "压缩机5号"
                    },
                  ],
                  tasks: [
                    {
                      resourceId: "hr5",
                      resourceName: "5组-童龄（5）",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "hr4",
                      resourceName: "4组-梨花（6）",
                      startTime: "2020-11-03 09:00",
                      endTime: "2020-11-03 11:00"
                    },
                    {
                      resourceId: "line4",
                      resourceName: "车床4号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                    {
                      resourceId: "line5",
                      resourceName: "车床5号",
                      startTime: "2020-11-03 07:00",
                      endTime: "2020-11-03 15:00"
                    },
                  ]
                },
              ]
            }
          ]
        }
        for(var i = 0; i < ans.content.length; i++){
          for(var j=0 ; j<ans.content[i].subOrders.length ; j++){
            this.spandata.push(ans.content[i].subOrders[j].resources.length);
            for(var k=0; k< ans.content[i].subOrders[j].resources.length; k++){
              var temp = {
                id: ans.content[i].subOrders[j].id,
                resID: ans.content[i].subOrders[j].resources[k].id,
                resName: ans.content[i].subOrders[j].resources[k].name,
                startTime: ans.content[i].subOrders[j].tasks[k].startTime,
                finishTime: ans.content[i].subOrders[j].tasks[k].endTime,
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
