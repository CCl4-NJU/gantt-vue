<template>
  <div class="container">
    <el-row id="resourceHeader">
      <el-col :span="6" style="padding-top: 0.625rem; text-align: left;">
        <div id="normalPicker">
          <el-date-picker
            v-model="timeValue"
            align="right"
            type="date"
            placeholder="选择当前时间"
            value-format="yyyy-MM-dd"
            @change="timeChange">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "Config",
    data() {
      return {
        timeValue: ""
      }
    },
    methods: {
      timeChange(){
        if(this.timeValue == null){
          return;
        }
        this.initManagement();
        //  console.log("child get Ans: "+ans);
        //todo 根据接收到的数据设置图
        //this.reload("hour");
      },
      initManagement(){
        var that = this;
        axios.get('/init/'+this.timeValue)
        .then(request => {
          var res = request.data
          if ( res.ret ){
            that.$message({
              type: 'success',
              message: '初始化成功!',
            })
          }
        })
        .catch(function(err){
          that.$message({
            type: 'error',
            message: '初始化失败！'
          })
        })
      }
    }
  }
</script>

<style scoped>
    #resourceHeader{
    height: 3.75rem;
  }
  #rangePicker{
    display: none;
  }
  #redTag2{
    position: relative;
    height: 2.5rem;
    font-size: small;
    padding-top: 0.25rem;
  }
</style>