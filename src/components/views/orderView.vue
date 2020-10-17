<template>
  <div class="container" v-if="dataLoaded">
    <el-row id="headRow">
      <el-col :span="6">
        <div id="datePicker">
          <p id="DPfont">当前显示日期</p>
          <el-date-picker
            v-model="timeValue"
            align="right"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            @change="timeChange">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="12" id="barCol" style="">
        <div id="progress">
          <p>按期交货率</p>
          <p class="smallFont" id="ddl">截至{{ddl}}之前</p>
          <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage" :status="status"></el-progress>
        </div>
      </el-col>
      <el-col :span="6"><el-tag type="danger" effect="dark" id="redTag">红色为延期订单</el-tag></el-col>
    </el-row>
    <order-gantt class="left-container" :tasks="tasks"></order-gantt>
  </div>
</template>

<script>
/* eslint-disable */
import OrderGantt from '../sub/OrderGantt.vue'
import axios from 'axios'
export default {
  name: 'order',
  components: {OrderGantt},
  data () {
    return {
      dataLoaded: false,
      tasks: {},
      timeValue: '',  //当前选择时间，变化时触发timechange函数
      ddl: '2017年10月1日' , //中间按期交货率的截至日期说明
      percentage: 70, //按期交货率
      status: 'warning',  //按期交货率颜色，根据百分比自动变化，在setProgress函数中自动设置
                          // <60为红色，60~80为橙色，80~100为绿色
      pickerOptions: {  //快捷时间选择的设置
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  methods: {
    getOrderInfo () {
      axios.get('/order-2020-10-01')
        .then(request => {
          var res = request.data
          if ( res.ret && res.tasks ){
            this.tasks = res.tasks
            this.dataLoaded = true
          }
        })
    },
    timeChange(){
      var ans = this.$parent.sendMessage(this.timeValue, "/backendUrl", "get");
      console.log("child get Ans: "+ans);
      //todo 根据接收到的数据设置图和按期交货率
    },
    setProgress(per){
      this.percentage = per;
      if(this.percentage <= 60 && this.percentage >= 0){
        this.status = "exception";
      }
      else if(this.percentage <= 80 && this.percentage > 60){
        this.status = "warning";
      }
      else if(this.percentage <= 100 && this.percentage > 80){
        this.status = "success";
      }
      else{
        console.log("percentage error, <0 or >100");
      }
    },
  },
  mounted () {
    this.getOrderInfo();
    this.setProgress(92);
    this.timeValue = "2020-10-17";
    this.timeChange();
  },
}
</script>

<style>
  #headRow{
    height: 6rem;
  }
  .el-col{
    height: 100%;
  }
  #datePicker{
    top: 0.625rem;
    text-align: center;
  }
  .smallFont{
    font-size: xx-small;
    color: #848484;
  }
  #redTag{
    position: relative;
    top: 2.8rem;
    left: 20%;
    width: 9rem;
    height: 2.5rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3125rem;
    padding-left: 0.8rem;
    padding-right: 0.75rem;
    font-size: medium;
  }
  #progress{
    text-align: center;
    padding-top: 0.6rem;
  }
  #DPfont{
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  #ddl{
    margin-bottom: 0.5rem;
  }
  #barCol{
    border-left: #E9E9EB solid 0.0625rem;
    border-right: #E9E9EB solid 0.0625rem;
    padding-left: 5rem;
    padding-right: 5rem;
  }
  p{
    margin-top: 0rem;
    margin-bottom: 0rem;
    font-family: "Hiragino Sans GB";
  }
</style>
