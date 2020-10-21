<template>
  <div id="appContainer">
    <el-row id="head">
      <el-col :span="4" id="img"> <img src="./assets/APS_Logo.png" height="50" width="100"/> </el-col>
      <el-col :span="16">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
           <el-menu-item index="1">订单甘特图</el-menu-item>
           <el-menu-item index="2">产品路线图</el-menu-item>
           <el-menu-item index="3">资源甘特图</el-menu-item>
           <el-menu-item index="4">资源负载图</el-menu-item>
         </el-menu>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Common from './Common.vue'
import axios from 'axios'
export default {
  name: 'app',
  // components: {ProductGantt},
  data () {
    return {
      activeIndex: "1",
      dataLoaded: false,
      tasks: {}
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
        case "1":
          this.$router.push('/order');
          break;
        case "2":
          //为了能够传参，为实现 resourceView 点击甘特图跳转做铺垫
          this.$router.push({path:"/product", query:{id: 3}});
          break;
        case "3":
          this.$router.push("/resource");
          break;
        case "4":
          this.$router.push("/HelloWorld");
          break;
      }
    },
    initActiveIndex(){
      var url = window.location.hash;
      switch(url){
        case "#/order":
          this.activeIndex = "1";
          break;
        // case "#/product":
        //   this.activeIndex = "2";
        //   break;
        case "#/resource":
          this.activeIndex = "3";
          break;
        case "#/HelloWorld":
          this.activeIndex = "4";
          break;
        //这边不知道怎么匹配"#/product?{id}"的情况，先用default
        default:
          this.activeIndex = "2";
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
    }
  },
  mounted () {
    // this.getProductInfo();
    this.initActiveIndex();
  },
  watch: {
    activeIndex (newIndex, oldIndex) {
      Common.reloadFlags[newIndex-1] = true;
      Common.reloadFlags[oldIndex-1] = false;
    }
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
   position: fixed;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }
  .container {
    position: absolute;
    top: 3.8125rem;
    bottom: 0rem;
    width: 100%;
  }
 .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  #img{
    padding-left: 2rem;
    padding-top: 0.4375rem;
  }
</style>
