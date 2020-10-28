<template>
  <div class="container">
    <el-row id="loadHeadRow">
      <el-col :span="12" class="barCol" style="">
        <div class="progress-wrapper">
          <p>设备总负载</p>
          <p class="smallFont">{{start_date}}-{{end_date}}</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="device_percent"
            :color="getColor(device_percent)">
          </el-progress>
        </div>
      </el-col>
      <el-col :span="12" class="barCol" style="">
        <div class="progress-wrapper">
          <p>人员总负载</p>
          <p class="smallFont">{{start_date}}-{{end_date}}</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="human_percent"
            :color="getColor(human_percent)">
          </el-progress>
        </div>
      </el-col>
    </el-row>
    <el-row id="loadPicker">
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
            :picker-options="pickerOptions"
            @change="rangeChange">
          </el-date-picker>
        </div>
        <div id="monthPicker">
          <el-date-picker
            v-model="monthRange"
            type="monthrange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            :clearable="false"
            @change="monthChange"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="13"></el-col>
    </el-row>
    <el-table
      :data="tableData"
      id="table">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150"
        align="center">
      </el-table-column>
      <template v-for="(item, index) in resourceList">
        <el-table-column
          :key="index"
          :label="item.name"
          align="center"
          width="225">
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.progress[index]"
              :type="'circle'"
              :color="getColor(scope.row.progress[index])">
            </el-progress>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Table',
  data (){
    return {
      start_date: '2020年10月1日',
      end_date: '2020年10月7日',
      device_percent: 0,
      human_percent: 0,
      loading: true,
      dateRange: '',
      monthRange: '',
      value: 'day',
      options: [{ //模式选项
        value: 'day',
        label: '按天显示'
      }, {
        value: 'week',
        label: '按周显示'
      }],
      tableData: [],
      resourceList: [],
      colorList: [
        'aqua',
        'deepskyblue',
        'lime',
        'gold',
        'violet',
        'red'
      ],
      pickerOptions: {
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
      pickerOptions2: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        }, {
          text: '今年至今',
          onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().getFullYear(), 0);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setMonth(start.getMonth() - 6);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  computed: {
    getColor () {
      return (percent) => {
        var i = Math.floor(percent / 20)
        if(i>5) i=5
        return this.colorList[i]
      }
    }
  },
  methods:{
    rangeChange(){
      console.log(this.dateRange);
      var ans = this.$parent.sendMessage(this.dateRange, "/backendUrl", "get");
      // console.log("child get Ans: "+ans);
      //todo 根据接收到的数据设置图
    },
    monthChange(){
      console.log(this.monthRange);
      var ans = this.$parent.sendMessage(this.monthRange, "/backendUrl", "get");
      // console.log("child get Ans: "+ans);
      //todo 根据接收到的数据设置图
    },
    optionChange(){
      //console.log("mode change: "+this.value)
      switch(this.value){
        case "day":
          document.getElementById("rangePicker").style.display = "";
          document.getElementById("monthPicker").style.display = "none";
          break;
        case "week":
          document.getElementById("rangePicker").style.display = "none";
          document.getElementById("monthPicker").style.display = "block";
          break;
      }
    },
    getPercentInfo(){
      axios.get('/percent-2020-10-01')
        .then(request => {
          var res = request.data
          if ( res.ret ){
            this.device_percent = res.device_percent
            this.human_percent = res.human_percent
            this.resourceList = res.resourceList
            this.tableData = res.tableData
          }
        })
    }
  },
  mounted () {
    this.getPercentInfo();
  }
}
</script>

<style scoped>
  p{
    margin-top: 0rem;
    margin-bottom: 0rem;
    font-family: "Hiragino Sans GB";
  }
  .el-progress {
    height: 50px !important;
  }
  #loadHeadRow{
     height: 8rem;
     border-top: #E9E9EB solid 0.0625rem;
     border-bottom: #E9E9EB solid 0.0625rem;
  }
  #monthPicker{
    display: none;
  }
  #loadPicker{
    height: 4rem;
    border-bottom: #E9E9EB solid 0.0625rem;
  }
  .barCol{
    padding-top: 0.9rem;
    padding-bottom: 0.6rem;
    border-left: #E9E9EB solid 0.0625rem;
    border-right: #E9E9EB solid 0.0625rem;
    padding-left: 5rem;
    padding-right: 5rem;
  }
  .progress-wrapper{
    text-align: center;
    padding-top: 0.6rem;
  }
  .smallFont{
    font-size: xx-small;
    color: #848484;
  }
</style>
