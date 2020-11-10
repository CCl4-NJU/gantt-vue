<template>
  <div id="appContainer">
    <el-row id="head">
      <el-col :span="3" id="img"> <img src="./assets/APS_Logo.png" height="50" width="100" @click="home()"/> </el-col>
      <el-col :span="16">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
           <el-menu-item index="0">首页</el-menu-item>
           <el-submenu index="1">
             <template slot="title">图表中心</template>
             <el-menu-item index="1-1">订单甘特图</el-menu-item>
             <el-menu-item index="1-2">产品路线图</el-menu-item>
             <el-menu-item index="1-3">资源甘特图</el-menu-item>
             <el-menu-item index="1-4">资源负载图</el-menu-item>
           </el-submenu>
           <el-submenu index="2">
             <template slot="title">表单中心</template>
             <el-menu-item index="2-1">订单计划表</el-menu-item>
             <el-menu-item index="2-2">订单—生产单关系表</el-menu-item>
             <el-menu-item index="2-3">生产单</el-menu-item>
             <el-menu-item index="2-4">生产单-资源关系表</el-menu-item>
           </el-submenu>
           <el-submenu index="3">
             <template slot="title">控制中心</template>
             <el-menu-item index="3-1">订单控制中心</el-menu-item>
             <el-menu-item index="3-2">人力及硬件控制中心</el-menu-item>
           </el-submenu>
         </el-menu>
      </el-col>
      <el-col :span="5"></el-col>
    </el-row>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  name: 'app',
  // components: {ProductGantt},
  data () {
    return {
      activeIndex: "1-1",
    }
  },
  methods: {
    handleSelect(key, keyPath){
      if(key == this.activeIndex){
        console.log("redundant key"+key);
        return;
      }
      this.activeIndex = key;
      switch(key){
        case "0":
          this.$router.push('/');
          break;
        case "1-1":
          this.$router.push('/order');
          break;
        case "1-2":
          //为了能够传参，为实现 resourceView 点击甘特图跳转做铺垫
          this.$router.push({path:"/product", query:{id: 3, date: "2020-11-02"}});
          break;
        case "1-3":
          this.$router.push("/resource");
          break;
        case "1-4":
          this.$router.push("/table");
          break;
        case "2-1":
          this.$router.push("/OPF");
          break;
        case "3-2":
          this.$router.push("/resControll");
          break;
        default:
          console.log("unlocated key: "+key);
      }
    },
    home(){
      this.activeIndex = '0';
      this.$router.push('/');
    },
    initActiveIndex(){
      var url = window.location.hash;
      if(url.indexOf("#/order") != -1){
        this.activeIndex = "1-1";
      }
      else if(url.indexOf("#/product") != -1){
        this.activeIndex = "1-2";
      }
      else if(url.indexOf("#/resource") != -1){
        this.activeIndex = "1-3";
      }
      else if(url.indexOf("#/table") != -1){
        this.activeIndex = "1-4";
      }
      else if(url.indexOf("#/OPF") != -1){
        this.activeIndex = "2-1";
      }
      else if(url.indexOf("#/resControll") != -1){
        this.activeIndex = "3-2";
      }
      else{
        this.activeIndex = "0";
      }
    },
    sendMessage(data, url, method){ //发送信息模板函数，可能需要增加一个请求标志位以防止并发错误
      // console.log("--------sendMessage--------");
      // console.log("--------url: "+url);
      // console.log("--------method: "+method);
      // console.log("--------data:  "+data);
      return "1234";  //测试用

      var xmlhttp = new XMLHttpRequest();
      var self = this;

      if(method == "get"){
        url = url+data; //未测试，大概率有问题
        xmlhttp.open('get', url , true);
        xmlhttp.send()
      }
      else if(method == "post"){
        xmlhttp.open('post', url , true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.send(data);
      }
      xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      		var ans = xmlhttp.responseText;
      		console.log(ans);
      		return ans;
      	}
      }
    },
    changeIndex () {
      var url = this.$route.path;
      if(url.indexOf("order") != -1){
        this.activeIndex = "1-1";
      }
      else if(url.indexOf("product") != -1){
        this.activeIndex = "1-2";
      }
      else if(url.indexOf("resource") != -1){
        this.activeIndex = "1-3";
      }
      else if(url.indexOf("table") != -1){
        this.activeIndex = "1-4";
      }
      else if(url.indexOf("OPF") != -1){
        this.activeIndex = "2-1";
      }
      else if(url.indexOf("resControll") != -1){
        this.activeIndex = "3-2";
      }
      else{
        this.activeIndex = "0";
      }
    }
  },
  mounted () {
    this.initActiveIndex();
  },
  watch: {
    '$route':'changeIndex'
  }
}
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #appContainer{
   position: absolute;
    height: 100%;
    width: 100%;
  }
  .container {
    position: absolute;
    top: 3.75rem;
    bottom: 0rem;
    width: 100%;
  }
 .left-container {
    position: absolute;
    top: 3.75rem;
    bottom: 0rem;
    width: 100%;
  }
  #img{
    padding-left: 2rem;
    padding-top: 0.4375rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
