<template>
  <div class="container">
    <el-row id="ProductHeader">
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
      <el-col :span="13"></el-col>
    </el-row>
    <product-gantt v-if="showHour&&dataLoaded"
      class="left-container"
      :pdtTasks="pdtTasks"
      :start_date="timeValue"
    ></product-gantt>
   <product-gantt-day v-if="showDay&&dataLoaded"
      class="left-container"
      :pdtTasks_day="pdtTasks_day"
      :start_date="dateRange[0]"
      :end_date="dateRange[1]"
    ></product-gantt-day>
  </div>
</template>

<script>
/* eslint-disable */
import ProductGantt from '../sub/ProductGantt.vue';
import ProductGanttDay from '../sub/ProductGanttDay.vue';
import axios from 'axios'
export default {
  name: 'product',
  components: {ProductGantt, ProductGanttDay},
  data () {
    return {
      dataLoaded: false,
      pdtTasks: {data: [], links: []},
      pdtTasks_day: {data: [], links: []},
      value: 'hour',  //当前展示模式是按小时展示还是按天展示
      timeValue: "",  //如果是按小时展示的话，时间数值，变化时触发timechange函数
      dateRange: "",  //如果是按天展示的话，时间区间，List格式，dateRange[0]~dateRange[1]，变化时触发rangeChange函数
      showHour: false,
      showDay: false,
      options: [{ //模式选项
        value: 'hour',
        label: '按小时显示'
      }, {
        value: 'day',
        label: '按天显示'
      }],
      pickerOptions: {  //快捷时间选项
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
    getProductInfo (byHour, pdata) {
      var that = this;
      if(byHour){
        axios.get('/product/'+this.$route.query.id+'/'+this.timeValue)
        .then(request => {
          var res = request.data;
          if ( res.ret && res.content ){
            var tempTask = res.content.tasks;

            for(var i=0; i<tempTask.data.length; i++){
              tempTask.data[i].text = res.content.product_name;
            }
            for(var i=0; i<tempTask.links.length; i++){
              tempTask.links[i].type = "0";
            }

            this.pdtTasks = tempTask;
            this.dataLoaded = true
          }
          this.reload("hour")
        })
        .catch(function (error) {
          that.pdtTasks = {data: [], links: []};
          that.reload("hour");
        });
      }
      else{
        axios.post('/product/'+this.$route.query.id, pdata)
        .then(request => {
          var res = request.data;
            if ( res.ret && res.content ){
              var tempTask = res.content.tasks;

              for(var i=0; i<tempTask.data.length; i++){
                tempTask.data[i].text = res.content.product_name;
              }
              for(var i=0; i<tempTask.links.length; i++){
                tempTask.links[i].type = "0";
              }

              this.pdtTasks_day = tempTask;
              this.dataLoaded = true
            }
          this.reload("day")
        })
        .catch(function (error) {
          that.pdtTasks = {data: [], links: []};
          that.reload("day");
        });
      }
    },
    optionChange(){
      //console.log("mode change: "+this.value)
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
       var ans = this.$parent.sendMessage(this.timeValue, "/backendUrl", "get");
       //console.log("child get Ans: "+ans);
       //todo 根据接收到的数据设置图
       this.getProductInfo(true, {});
    },
    rangeChange(){
      // console.log(this.dateRange);
      var ans = this.$parent.sendMessage(this.dateRange, "/backendUrl", "get");
      var pdata = {
        start_date: this.dateRange[0],
        end_date: this.dateRange[1]
      }
      // console.log("child get Ans: "+ans);
      //todo 根据接收到的数据设置图
      this.getProductInfo(false, pdata);
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
    },
    formatDate(date) {
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
    
      return [year, month, day].join('-');
    }
  },
  mounted () {
    this.timeValue = this.$route.query.date;
    this.dateRange = [
      this.formatDate(Date.now()),
      this.formatDate(Date.now())
    ]

    // this.pdtTasks = {data: [], links: []};
    // this.pdtTasks_day = {data: [], links: []};

    this.getProductInfo(true, {});
  },
}
</script>

<style scoped>
  #ProductHeader{
    height: 3.75rem;
  }
  #rangePicker{
    display: none;
  }
</style>
