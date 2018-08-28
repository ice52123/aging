<template>
	<div id="header" class="af">
		<el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <img src="../assets/images/logo.png">
      <router-link to="/nowaging">
        <span>当前老化</span>
      </router-link>
      <router-link to="/data">
        <span>历史数据</span>
      </router-link>
      <router-link to="/list">
        <span>记录列表</span>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#header{
  background: #5D5C64;
  width: 100%;
  height: 50px;
}
.el-menu{
	height: 50px;
}
img{
	height:45px;
	vertical-align:bottom;
	margin-left: 2%;
	margin-top: 2.5px;
}
a{
	height: 40px;
	line-height: 40px;
	color: #fff;
	margin-left: 20px;
}
.router-link-active{
	color: #fff;
}
.router-link-exact-active{
  color: rgb(255, 208, 75);
}
</style>