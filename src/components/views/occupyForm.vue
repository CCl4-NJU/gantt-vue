<template>
  <div>
    <el-row>
      <el-col :span="4" style="text-align: right;">
        <p>显示信息的日期：</p>
      </el-col>
      <el-col :span="12">
        <el-date-picker
          v-model="timeValue"
          type="date"
          placeholder="选择日期"
          :clearable="true"
          @change="updateData"
          style="margin-top: 0.5rem;"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
      <el-col :span="8">
        <p>此数据其他形式可参考资源甘特图</p>
      </el-col>
    </el-row>
    <el-table
     :data="tableData"
     :span-method="objectSpanMethod"
     v-loading="loading"
     border
     style="width: 100%; ">
     <el-table-column
       prop="resId"
       label="资源ID"
       width="180">
     </el-table-column>
     <el-table-column
       prop="resName"
       label="资源名">
     </el-table-column>
     <el-table-column label="占用时间段">
       <el-table-column
         prop="startTime"
         label="开始使用时间">
       </el-table-column>
       <el-table-column
         prop="finishTime"
         label="结束使用时间">
       </el-table-column>
       <el-table-column
         prop="subOrderId"
         label="被该子订单占用">
       </el-table-column>
       <el-table-column
         prop="orderId"
         label="被该订单占用">
       </el-table-column>
     </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timeValue: "",
        loading: true,
        spandata: [],
        locatedata: [],
        tableData: []
      };
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 1) {
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
        if(this.timeValue == null){
          return;
        }
        else{
          console.log(this.timeValue)
        }
        this.loading = true;
        this.spandata = [];
        this.tableData = [];
        this.locatedata = [];
        // var ans = this.$parent.sendMessage('', "/resource/occupyInfo/"+this.timeValue, "get");
        var ans = {
          ret: true,
          content: {
            human: [
              {
                resourceId: "hr1",
                resourceName: "1组-彭辉（5）",
                occupyInfoList: [
                  {
                    startTime: "2020-11-03 13:00:00",
                    endTime: "2020-11-03 15:00:00",
                    orderId: "416153",
                    subOrderId: "416153_1"
                  },
                  {
                    startTime: "2020-11-03 15:00:00",
                    endTime: "2020-11-03 17:00:00",
                    orderId: "416153",
                    subOrderId: "416153_2"
                  },
                  {
                    startTime: "2020-11-04 07:00:00",
                    endTime: "2020-11-04 12:00:00",
                    orderId: "509867",
                    subOrderId: "509867_1"
                  }
                ]
              },
            ],
            device: [
              {
                resourceId: "line1",
                resourceName: "1号生产线",
                occupyInfoList: [
                  {
                    startTime: "2020-11-04 07:00:00",
                    endTime: "2020-11-04 12:00:00",
                    orderId: "416153",
                    subOrderId: "416153_1"
                  },
                  {
                    startTime: "2020-11-03 15:00:00",
                    endTime: "2020-11-03 17:00:00",
                    orderId: "416153",
                    subOrderId: "416153_2"
                  },
                  {
                    startTime: "2020-11-03 21:00:00",
                    endTime: "2020-11-03 23:00:00",
                    orderId: "379524",
                    subOrderId: "379524_1"
                  },
                  {
                    startTime: "2020-11-04 07:00:00",
                    endTime: "2020-11-04 12:00:00",
                    orderId: "509867",
                    subOrderId: "509867_1"
                  },
                  {
                    startTime: "2020-11-04 12:00:00",
                    endTime: "2020-11-04 18:00:00",
                    orderId: "509867",
                    subOrderId: "509867_2"
                  },
                ]
              }
            ]
          }
        }

        for(var i = 0; i < ans.content.human.length; i++){
          this.spandata.push(ans.content.human[i].occupyInfoList.length);
          for(var j=0; j< ans.content.human[i].occupyInfoList.length; j++){
            var temp = {
              resId: ans.content.human[i].resourceId,
              resName: ans.content.human[i].resourceName,
              startTime: ans.content.human[i].occupyInfoList[j].startTime,
              finishTime: ans.content.human[i].occupyInfoList[j].endTime,
              subOrderId: ans.content.human[i].occupyInfoList[j].subOrderId,
              orderId: ans.content.human[i].occupyInfoList[j].orderId
            }
            this.tableData.push(temp);
          }
        }
        for(var i = 0; i < ans.content.device.length; i++){
          this.spandata.push(ans.content.device[i].occupyInfoList.length);
          for(var j=0; j< ans.content.device[i].occupyInfoList.length; j++){
            var temp = {
              resId: ans.content.device[i].resourceId,
              resName: ans.content.device[i].resourceName,
              startTime: ans.content.device[i].occupyInfoList[j].startTime,
              finishTime: ans.content.device[i].occupyInfoList[j].endTime,
              subOrderId: ans.content.device[i].occupyInfoList[j].subOrderId,
              orderId: ans.content.device[i].occupyInfoList[j].orderId
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
      this.timeValue = "2020-11-03"
      this.updateData();
    }
  };
</script>

<style>
  .cell{
    text-align: center;
  }
</style>
