<template>
  <div class="container" v-if="dataLoaded">
    <el-row id="resourceHeader">
      <el-col :span="5" style="padding-top: 0.625rem; text-align: right;">
        <el-select v-model="value" placeholder="请选择" @change="optionChange()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" style="padding-top: 0.625rem; text-align: left;">
        <div id="normalPicker">
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
        <div id="rangePicker">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            :clearable="false"
            :picker-options="pickerOptions2"
            @change="rangeChange">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="13" style="padding-top: 0.625rem; padding-right: 3rem; text-align: right;">
        <el-tag type="danger" effect="dark" id="redTag2">红色为延期订单</el-tag>
      </el-col>
    </el-row>
    <resource-gantt
      v-if="showHour"
      class="left-container"
      :resTasks="resTasks"
      :start_date="timeValue"
    ></resource-gantt>
    <resource-gantt-day
      v-if="showDay"
      class="left-container"
      :resTasks="resTasks"
      :start_date="dateRange[0]"
      :end_date="dateRange[1]"
    ></resource-gantt-day>
  </div>
</template>

<script>
/* eslint-disable */
import ResourceGantt from '../sub/ResourceGantt.vue';
import ResourceGanttDay from '../sub/ResourceGanttDay.vue';
import axios from 'axios'
export default {
  name: 'resource',
  components: {ResourceGantt, ResourceGanttDay},
  data () {
    return {
      dataLoaded: false,
      resTasks: {},
      value: 'hour',  //以下变量含义与productView相同
      timeValue: "",
      dateRange: "",
      showHour: false,
      showDay: false,
      options: [{
        value: 'hour',
        label: '按小时显示'
      }, {
        value: 'day',
        label: '按天显示'
      }],
      pickerOptions: {
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
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  methods: {
    getResourceInfo () {
      axios.get('/resource-2020-10-01')
        .then(request => {
          var res = request.data
          if ( res.ret && res.tasks ){
            this.resTasks = res.tasks
            this.dataLoaded = true
          }
          this.reload("hour");
        })
    },
    optionChange(){
      // console.log("mode change: "+this.value);
      switch(this.value){
        case "hour":
          document.getElementById("normalPicker").style.display = "";
          document.getElementById("rangePicker").style.display = "none";
          this.reload("hour");
          break;
        case "day":
          document.getElementById("normalPicker").style.display = "none";
          document.getElementById("rangePicker").style.display = "block";
          this.reload("day");
          break;
      }
    },
    timeChange(){
      if(this.timeValue == null){
        return;
      }
      //  console.log(this.timeValue);
       var ans = this.$parent.sendMessage(this.timeValue, "/backendUrl", "get");
      //  console.log("child get Ans: "+ans);
       //todo 根据接收到的数据设置图
       this.reload("hour");
    },
    rangeChange(){
      // console.log(this.dateRange);
      var ans = this.$parent.sendMessage(this.dateRange, "/backendUrl", "get");
      // console.log("child get Ans: "+ans);
      //todo 根据接收到的数据设置图
      this.reload("day");
    },
    reload(model){
      switch(model){
        case "hour":
          this.showDay = false;
          this.showHour = false;
          this.$nextTick(() => (this.showHour = true))
          break;
        case "day":
          this.showHour = false;
          this.showDay = false;
          this.$nextTick(() => (this.showDay = true))
          break;
      }
    }
  },
  mounted () {
    this.getResourceInfo();

    this.timeValue = "2020-10-1";
    this.dateRange = [
      "2020-10-1",
      "2020-10-3"
    ]

    this.reload("hour");
  },
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
