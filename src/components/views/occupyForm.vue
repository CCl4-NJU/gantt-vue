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
  import axios from 'axios'
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
        axios.get('/resource/occupyInfo/'+this.timeValue)
          .then(request => {
            var res = request.data;
            if ( res.ret && res.content ){
              for(var i = 0; i < res.content.human.length; i++){
                if(res.content.human[i].occupyInfoList.length != 0){
                  this.spandata.push(res.content.human[i].occupyInfoList.length);
                }
                else{
                  this.spandata.push(1);
                  var temp = {
                    resId: res.content.human[i].resourceId,
                    resName: res.content.human[i].resourceName,
                    startTime: "未分配任务",
                    finishTime: "",
                    subOrderId: "",
                    orderId: ""
                  }
                  this.tableData.push(temp);
                  continue;
                }
                for(var j=0; j< res.content.human[i].occupyInfoList.length; j++){
                  var temp = {
                    resId: res.content.human[i].resourceId,
                    resName: res.content.human[i].resourceName,
                    startTime: res.content.human[i].occupyInfoList[j].startTime,
                    finishTime: res.content.human[i].occupyInfoList[j].endTime,
                    subOrderId: res.content.human[i].occupyInfoList[j].subOrderId,
                    orderId: res.content.human[i].occupyInfoList[j].orderId
                  }
                  this.tableData.push(temp);
                }
              }
              for(var i = 0; i < res.content.device.length; i++){
                if(res.content.device[i].occupyInfoList.length != 0){
                  this.spandata.push(res.content.device[i].occupyInfoList.length);
                }
                else{
                  this.spandata.push(1);
                  var temp = {
                    resId: res.content.device[i].resourceId,
                    resName: res.content.device[i].resourceName,
                    startTime: "未分配任务",
                    finishTime: "",
                    subOrderId: "",
                    orderId: ""
                  }
                  this.tableData.push(temp);
                  continue;
                }
                for(var j=0; j< res.content.device[i].occupyInfoList.length; j++){
                  var temp = {
                    resId: res.content.device[i].resourceId,
                    resName: res.content.device[i].resourceName,
                    startTime: res.content.device[i].occupyInfoList[j].startTime,
                    finishTime: res.content.device[i].occupyInfoList[j].endTime,
                    subOrderId: res.content.device[i].occupyInfoList[j].subOrderId,
                    orderId: res.content.device[i].occupyInfoList[j].orderId
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
      this.timeValue = "2018-11-04"
      this.updateData();
    }
  };
</script>

<style>
  .cell{
    text-align: center;
  }
</style>
