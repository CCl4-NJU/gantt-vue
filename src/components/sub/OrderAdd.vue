<template>
  <div>
    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <span>产品号</span>
      </el-col>
      <el-col :span="6">
        <span>生产数量</span>
      </el-col>
      <el-col :span="6">
        <span>交付日期</span>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <el-row :gutter="20" class="row" style="text-align: center; width: 100%;">
      <el-col :span="6" style="padding-left: 2rem;">
        <el-autocomplete
          class="inline-input"
          v-model="inputId"
          :fetch-suggestions="querySearch"
          placeholder="输入或从下表中选择"
          :trigger-on-focus="false"
          @select="handleSelect"
          @blur="inputChange"
          style="width: 100%;"
        ></el-autocomplete>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="请输入数量" v-model="quantity"></el-input>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
      <el-col :span="6" style="text-align: left;">
        <el-button type="primary" @click="submit()" style="margin-top: 0rem; margin-bottom: 0rem;">新增订单</el-button>
      </el-col>
    </el-row>
    <div style="width: 100%; padding-left: 1rem; padding-right: 1rem;">
      <el-table
        ref="IdTable"
        :data="tableData"
        stripe
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="产品编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="产品描述">
        </el-table-column>
        <el-table-column
          width="100">
          <template>
            <i class="el-icon-circle-check"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    data() {
      return{
        tableData: [],
        inputId: '',
        quantity: '',
        date: '',
      }
    },
    methods:{
      querySearch(queryString, cb) {
        var tableData = this.tableData;
        var results = queryString ? tableData.filter(this.createFilter(queryString)) : tableData;
        // 调用 callback 返回建议列表的数据
        var ans = []
        for(var i=0; i< results.length; i++){
          var temp = {
            value: results[i].id
          }
          ans.push(temp)
        }
        cb(ans);
      },
      createFilter(queryString) {
        return (item) => {
          return (item.id.startsWith(queryString));
        };
      },
      handleSelect(item) {
        this.inputId = item.value;
        var index = -1
        for(var i=0; i< this.tableData.length; i++){
          if(this.tableData[i].id == this.inputId){
            index = i;
            break;
          }
        }
        if(index != -1){
          this.setCurrent(this.tableData[index]);
        }
      },
      inputChange(){
        var index = -1;
        for(var i=0; i< this.tableData.length; i++){
          if(this.tableData[i].id == this.inputId){
            index = i;
            break;
          }
        }
        if(index != -1){
          this.setCurrent(this.tableData[index]);
        }
        else{
          this.setCurrent({id: this.inputId, describe: ''});
        }
      },
      setCurrent(row) {
        this.$refs.IdTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.inputId = val.id;
      },
      submit(){
        console.log("submit:")
        console.log(this.inputId+'  '+this.quantity+'  '+this.date)
        var data = {
          productId: this.inputId,
          quantity: this.quantity,
          date: this.date
        };

        var se = this;
        var success = null;
        var newId = '';
        try{
          axios.post('/controll/order', data)
            .then(request => {
              var res = request.data;
              console.log(res);
              if ( res.ret ){
                success = true;
                newId = res.content;
              }
              else{
                success = false;
              }
            });
        }
        catch(exception){
          console.log(exception);
        }
        var explain = '';
        if(success == null){
          explain = '网络错误，请稍后再试'
        } else if(success){
          explain = '添加成功，生成的订单号为'+newId;
        } else {
          explain = '添加失败，请稍后再试'
        }
        this.$alert(explain, '新增结果', {
          confirmButtonText: '确定',
        });
      },
      initTable(){
        // var TD = [
        //   {
        //     id: '437956',
        //     describe: '暂无'
        //   }
        // ];
        // this.tableData = TD;
        var se = this;
        this.tableData = [];
        try{
          axios.get('/product/all')
            .then(request => {
              var res = request.data;
              console.log(res);
              if(res.ret){
                for(var i = 0; i< res.content.length; i++){
                  var temp = {
                    id: res.content[i],
                    describe: '暂无',
                  };
                  se.tableData.push(temp);
                }
              }
            });          
        }catch(e){
          console.log(e);
        }
      },
    },
    mounted() {
      this.initTable();
    }
  }
</script>

<style>
  .row{
    text-align: center;
    width: 100%;
    margin-bottom: 1rem;
  }
</style>
