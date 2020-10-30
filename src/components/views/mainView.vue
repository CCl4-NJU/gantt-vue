<template>
  <div class="container" id="mainContainer">
    <div class="container" id="blur">
    </div>
    <div id="realC">
      <el-row>
        <img src="../../assets/APS.png" height="100" width="320" id="MLogo"/>
      </el-row>
      <el-row :gutter="30" id="funcRow">
        <el-col :span="8">
          <div class="funcBox">
            <p>图表中心</p>
            <el-divider></el-divider>
            <div class="btnBox">
              <el-button round @click="btnClick('/order')">订单甘特图</el-button>
              <el-button round @click="btnClick('/product?id=3')">产品路线图</el-button>
              <el-button round @click="btnClick('/resource')">资源甘特图</el-button>
              <el-button round @click="btnClick('/table')">资源负载图</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="funcBox">
            <p>表单中心</p>
            <el-divider></el-divider>
            <div class="btnBox">
              <el-button round>订单计划表</el-button>
              <el-button round>订单—生产单关系表</el-button>
              <el-button round>生产单</el-button>
              <el-button round>生产单-资源关系表</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="funcBox">
            <p>图表中心</p>
            <el-divider></el-divider>
            <div class="btnBox">
              <el-button round>订单控制中心</el-button>
              <el-button round @click="btnClick('/resControll')">人力及硬件控制中心</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mainView',
    methods:{
      btnClick(url){
        this.$router.push(url);
        this.$parent.initActiveIndex();
      }
    }
  }
</script>

<style>
  #mainContainer{
    text-align: center;
    background-image: url(../../assets/background.jpg);
    background-size: 100% 100%;
    border-top: #E9E9EB solid 0.1rem;
  }
  .btnBox{
    text-align: left;
  }
  .el-button{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    margin-left: 0.625rem;
  }
  #blur{
    top: -0.0625rem;
    background-color: #FFFFFF;
    opacity: 0.75;
  }
  #funcRow{
    padding-left: 5rem;
    padding-right: 5rem;
  }
  .el-divider{
    background-color: #b9b9b9;
  }
  #MLogo{
    margin-top: 4rem;
    margin-bottom: 3rem;
    background-image: url(../../assets/APS.png);
    background-size: 100% 100%;
    height: 100px;
    width: 20rem;
  }
</style>
