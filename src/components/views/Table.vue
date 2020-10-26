<template>
  <div class="container">
    <el-row id="loadHeadRow">
      <el-col :span="12" class="barCol" style="">
        <div class="progress-wrapper">
          <p>设备总负载</p>
          <p class="smallFont">{{start_date}}-{{end_date}}</p>
          <el-progress :text-inside="true"
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
          <el-progress :text-inside="true"
            :stroke-width="26"
            :percentage="human_percent"
            :color="getColor(human_percent)">
          </el-progress>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      id="table"
      :lazy="false">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        width="150">
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
export default {
  name: 'Table',
  data (){
    return {
    start_date: '2020年10月1日',
    end_date: '2020年10月7日',
    device_percent: 85,
    human_percent: 63,
    loading: true,
    tableData: [{
      date: '2020-10-01',
      progress: [23, 78, 23, 76, 23, 76]
    }, {
      date: '2020-10-02',
      progress: [50, 113, 50, 99, 50, 99]
    }, {
      date: '2020-10-03',
      progress: [68, 23, 58, 50, 58, 50]
    }, {
      date: '2020-10-04',
      progress: [99, 58, 50, 99, 50, 99]
    }, {
      date: '2020-10-05',
      progress: [23, 78, 23, 76, 23, 76]
    }, {
      date: '2020-10-06',
      progress: [50, 113, 50, 99, 50, 99]
    }, {
      date: '2020-10-07',
      progress: [68, 23, 58, 50, 58, 50]
    }, ],

    resourceList: [{
      name: 'Line 1'
    }, {
      name: 'Line 2'
    }, {
      name: '张三'
    }, {
      name: '李四'
    }, {
      name: '张扬'
    }, {
      name: '李彤'
    }],
    colorList: [
      'aqua',
      'deepskyblue',
      'lime',
      'gold',
      'violet',
      'red'
    ]
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
     height: 6rem;
  }
  #table{
    position: absolute;
    top: 6rem;
    bottom: 0;
    width: 100%;
    overflow: scroll;
  }
  .barCol{
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
