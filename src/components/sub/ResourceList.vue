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
    center="true"
    title="新增"
    :visible.sync="addFormVisible"
  >
    <el-form
      :model="addForm"
      :label-position="'left'"
      ref="addForm"
    >
      <el-form-item
          label="资源类型"
          :label-width="formLabelWidth"
        >
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
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="addForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="资源数量"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="addForm.number"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
          label="班组信息"
          :label-width="formLabelWidth"
        >
        <template>
            <el-radio
              v-model="shiftRadio"
              :label="1"
            >全天</el-radio>
            <el-radio
              v-model="shiftRadio"
              :label="2"
              :disabled="this.radio==2"
            >早班</el-radio>
            <el-radio
              v-model="shiftRadio"
              :label="3"
              :disabled="this.radio==2"
            >晚班</el-radio>
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
    center="true"
    title="编辑"
    :visible.sync="editFormVisible"
  >
    <el-form
      :model="editForm"
      ref="editForm"
    >
      <el-form-item
          label="资源类型"
          :label-width="formLabelWidth"
        >
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
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="资源数量"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="editForm.number"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
          label="班组信息"
          :label-width="formLabelWidth"
        >
        <template>
            <el-radio
              v-model="shiftRadio"
              :label="1"
            >全天</el-radio>
            <el-radio
              v-model="shiftRadio"
              :label="2"
              :disabled="this.radio==2"
            >早班</el-radio>
            <el-radio
              v-model="shiftRadio"
              :label="3"
              :disabled="this.radio==2"
            >晚班</el-radio>
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
        editForm: [],

        radio: 1,//随点击位置而变，根据radio可以获取到人力资源或硬件资源的children数据
        
        shiftRadio: 1,
        shiftInfo: ['全天','早班','晚班'],

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
        }]
      }
    },
    methods: {
      handleAdd() {
        this.addFormVisible = true;
        this.radio = 1;
        this.shiftRadio = 1;
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
        } else{
          this.radio = 2;
        }

        if(row.shift=='全天'){
          this.shiftRadio = 1;
        } else if(row.shift=='早班'){
          this.shiftRadio = 2;
        } else{
          this.shiftRadio = 3;
        }
        // console.log(index)
        // console.log(_index)
        //取到这一栏的值，也就是明白是在那一栏进行操作，从而将编辑后的数据存到表格中
      },
      sumbitAddRow() {
        var id = this.mockId();
        //todo:请求添加是否成功，成功才加入，后端还要返回资源项id
        var hr = this.radio==1;
        var index = this.radio - 1;
        var shiftIndex = this.shiftRadio - 1;

        var cd = Date.now();

        var todayStr = this.formatDate(cd);

        this.tableData[index].children.push({
          id: id,
          date: todayStr,
          name: this.addForm.name,
          number: this.addForm.number,
          shift: this.shiftInfo[shiftIndex],
          hr: hr
        })
        
        this.addFormVisible = false
      },
      //保存编辑
      sumbitEditRow() {
        //todo:根据后端返回结果确认是否修改成功

        var childrenIndex = this.radio==1 ? 
          this.getChildrenIndex(_index, true) :this.getChildrenIndex(_index, false); 
        
        this.tableData[this.radio-1].children[childrenIndex].name = this.editForm.name;
        this.tableData[this.radio-1].children[childrenIndex].number = this.editForm.number;
        this.tableData[this.radio-1].children[childrenIndex].shift = this.shiftInfo[this.shiftRadio-1];

        this.editFormVisible = false;
      },
      handleDelete(index, row) {
        _index = index;
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
          var childrenIndex = this.getChildrenIndex(_index, row.hr)
          
          this.tableData[this.radio-1].children.splice(childrenIndex, 1)
          //storage.set('tableform', this.tableform)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err
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
          var res = request.data
          if ( res.ret ){
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
        var total = this.tableData.length;
        total += (this.tableData[0].children.length);
        total += (this.tableData[1].children.length);

        return (Date.now()).toString();
      }
    },
    mounted(){
      this.getResourceInfo();
    }
  }
</script>

<style scoped>
  
</style>