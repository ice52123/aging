<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,h1,h2,h3,h4,h5,h6,p,ul,ol,li,dl,dt,dd{
  margin: 0;
  padding: 0;
  list-style:none;
  font-family:"Microsoft YaHei";
  font-size: 16px;
}
img{
  vertical-align:bottom;
}
a{
  text-decoration:none;
}
.lf{float:left;}
.rt{float:right;}
.clear{clear:both;}
.af:after{
  content:"";
  display:block;
  clear:both;
}
</style>
