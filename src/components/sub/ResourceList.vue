<template>
<div>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="date"
        label="加入日期"
        width="300">
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="number"
        label="资源数量"
        width="300">
      </el-table-column>
      <el-table-column
        prop="shift"
        label="班次"
        width="300">
      </el-table-column>
      <el-table-column
        width="200"
        align="left">
        <template slot="header" slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleAdd(scope.$index, scope.row)">增加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button v-if="typeof scope.row.children == 'undefined'"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-if="typeof scope.row.children == 'undefined'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    center
    title="新增"
    :visible.sync="addFormVisible">
    <el-form
      :model="addForm"
      :label-position="'left'"
      ref="addForm">
      <el-form-item
          label="资源类型"
          :label-width="formLabelWidth">
        <template>
            <el-radio
              v-model="radio"
              :label="1"
            >人力资源</el-radio>
            <el-radio
              v-model="radio"
              :label="2"
            >硬件资源</el-radio>
        </template>
      </el-form-item>
      <el-form-item
        label="资源名称"
        :label-width="formLabelWidth">
        <el-input
          v-model="addForm.name"
          autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item
        label="资源数量"
        :label-width="formLabelWidth">
        <el-input
          v-model="addForm.number"
          autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item
        label="班组信息"
        :label-width="formLabelWidth">
        <template>
          <el-radio
            v-model="shiftRadio"
            :label="1"
            v-if="this.radio==2">全天</el-radio>
          <el-select v-model="shiftRadio" placeholder="请选择" v-if="this.radio==1">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取消</el-button>
      <el-button
        type="primary"
        @click="sumbitAddRow()"
        :loading="addLoading"
      >确定</el-button>
    </span>
  </el-dialog>

  <el-dialog
    center
    title="编辑"
    :visible.sync="editFormVisible">
    <el-form
      :model="editForm"
      ref="editForm">
      <el-form-item
        label="资源类型"
        :label-width="formLabelWidth">
        <template>
          <el-radio
            v-model="radio"
            disabled
            :label="1"
          >人力资源</el-radio>
          <el-radio
            v-model="radio"
            disabled
            :label="2"
          >硬件资源</el-radio>
        </template>
      </el-form-item>
      <el-form-item
        label="资源名称"
        :label-width="formLabelWidth">
        <el-input
          v-model="editForm.name"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="资源数量"
        :label-width="formLabelWidth">
        <el-input
          v-model="editForm.number"
          autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="班组信息"
        :label-width="formLabelWidth">
        <template>
          <el-radio
            v-model="shiftRadio"
            :label="1"
            v-if="this.radio==2">全天</el-radio>
          <el-select v-model="shiftRadio" placeholder="请选择" v-if="this.radio==1">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取消</el-button>
      <el-button
        type="primary"
        @click="sumbitEditRow()"
        :loading="addLoading"
      >确定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import axios from 'axios';
var _index;
  export default {
    name: 'ResourceList',
    data() {
      return {
        formLabelWidth: '150px',

        addFormVisible: false,//是否显示新增窗口
        addLoading: false,
        addForm: [],

        editFormVisible: false,//是否显示编辑窗口
        editId: '',
        editForm: [],

        radio: 1,//随点击位置而变，根据radio可以获取到人力资源或硬件资源的children数据

        shiftRadio: '',
        shiftInfo: ['全天','早班(7-19)','晚班(19-7)','早班(7-15)','中班(15-23)','晚班(23-7)'],

        tableData: [{
          id: 1,
          date: '',
          name: '人力资源',
          number: '',
          children: []
        }, {
          id: 2,
          date: '',
          name: '硬件资源',
          number: '',
          children: []
        }],
        options: [{
          label: '两班倒',
          options: [{
          value: '2',
          label: '早班(7-19)'
          }, {
          value: '3',
          label: '晚班(19-7)'
          }]
        }, {
          label: '三班倒',
          options: [{
          value: '4',
          label: '早班(7-15)'
          }, {
          value: '5',
          label: '中班(15-23)'
          }, {
          value: '6',
          label: '晚班(23-7)'
          },]
        }],
      }
    },
    methods: {
      handleAdd() {
        this.addFormVisible = true;
        this.radio = 1;
        this.shiftRadio = '';
        this.addForm = {
          name: '',
          number: ''
        };
      },
      handleEdit(index, row) {
        this.editFormVisible = true;

        _index = index;
        this.editForm = Object.assign({}, row);

        if(row.hr){
          this.radio = 1;
          this.shiftRadio = '';
        } else{
          this.radio = 2;
          this.shiftRadio = 1;
        }


        this.editId = row.id;
        // console.log(index)
        // console.log(_index)
        //取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
      },
      sumbitAddRow() {
        var that = this;
        var todayStr = this.formatDate(Date.now());

        var addItem = {
          date: todayStr,
          type: this.radio,
          name: this.addForm.name,
          number: this.addForm.number,
          shift: this.shiftRadio
        }
        axios.post('/addResource', addItem)
        .then(request => {
          var hr = that.radio==1;
          var index = that.radio - 1;
          var shiftIndex = that.shiftRadio - 1;

          var res = request.data
          console.log(res);
          if ( res.ret ){
            var id = res.content.id;

            that.tableData[index].children.push({
              id: id,
              date: todayStr,
              name: that.addForm.name,
              number: that.addForm.number,
              shift: that.shiftInfo[shiftIndex],
              hr: hr
            })

            that.$message({
              type: 'success',
              message: '添加成功！'
            })
          } else{
            that.$message({
              type: 'error',
              message: res.content
            })
          }
        })
        .catch(function(err){
          this.$message({
            type: 'error',
            message: '插入失败!',
          })
        })

        this.addFormVisible = false
      },
      //保存编辑
      sumbitEditRow() {
        var that = this;
        var changeItem = {
          id: this.editId,
          name: this.editForm.name,
          number: this.editForm.number,
          shift: this.shiftRadio
        }
        axios.post('/updateResource', changeItem)
        .then(request => {
          var res = request.data;
          if( res.ret ){
            var childrenIndex = that.radio==1 ?
            that.getChildrenIndex(_index, true) :that.getChildrenIndex(_index, false);

            that.tableData[that.radio-1].children[childrenIndex].name = that.editForm.name;
            that.tableData[that.radio-1].children[childrenIndex].number = that.editForm.number;
            that.tableData[that.radio-1].children[childrenIndex].shift = that.shiftInfo[that.shiftRadio-1];


            that.$message({
              type: 'success',
              message: '编辑成功！'
            })
          } else{
            that.$message({
              type: 'error',
              message: res.content
            })
          }
        })
        .catch(function(err){
          this.$message({
            type: 'error',
            message: '编辑失败!',
          })
        })

        this.editFormVisible = false;
      },
      handleDelete(index, row) {
        _index = index;
        var that = this;
        if(row.hr){
          this.radio = 1;
        } else{
          this.radio = 2;
        }

        this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //todo,根据后端返回结果确认是否删除成功
          axios.get('/deleteResource/'+row.id)
          .then(request => {
            var res = request.data;
            if( res.ret ){
              var childrenIndex = that.getChildrenIndex(_index, row.hr)

              that.tableData[that.radio-1].children.splice(childrenIndex, 1)

              that.$message({
                type: 'success',
                message: '删除成功!',
              })
            } else{
              that.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
          .catch(function(err){
            that.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '删除取消!'
          })
        })
      },
      cancel() {
        this.addFormVisible = false;
        this.editFormVisible = false;
      },
      formatDate(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
      },
      getChildrenIndex(index, isHuman){
        if(isHuman) return index - 1;
        else{
          var humanNum = this.tableData[0].children.length;
          return index - humanNum - 2;
        }
      },
      getResourceInfo(){
        axios.get('/resourceInfo')
        .then(request => {
          if ( request.data.ret ){
            var res = request.data.content;
            var human_list = res.human;
            for(var i=0; i<human_list.length; i++){
              var human_item = human_list[i];
              human_item.hr = true;
              human_item.shift = this.shiftInfo[human_item.shift - 1];
              this.tableData[0].children.push(human_item);
            }

            var device_list = res.device;
            for(var i=0; i<device_list.length; i++){
              var device_item = device_list[i];
              device_item.hr = false;
              device_item.shift = this.shiftInfo[device_item.shift - 1];
              this.tableData[1].children.push(device_item);
            }
          }
        })
      },
      mockId(){
        return ""+new Date().valueOf();
      }
    },
    mounted(){
      this.getResourceInfo();
    }
  }
</script>

<style scoped>

</style>
