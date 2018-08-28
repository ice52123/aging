<template>
  <div id="login">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click.native.prevent="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'

export default {
  // name: 'login',
  data(){
    return{
      ruleForm:{
        name:'',
        password:'',
      }
    }
  },
  created(){
    // let b_name = navigator.appName;
    // let b_version = navigator.appVersion;
    // let version = b_version.split(";");
    // let trim_version = version[1].replace(/[ ]/g, "");
    // let s=trim_version.replace("MSIE", "")
    // console.log(parseInt(s))
    // let VS=parseInt(s)
    // if (b_name == "Microsoft Internet Explorer") {
    //     /*如果是IE9及其以下*/
    //     if (VS <=9) {
    //         alert("IE浏览器版本过低，请更新IE浏览器或使用其他浏览器");
    //         //然后跳到需要连接的下载网站 
    //         window.location.href="https://support.dmeng.net/upgrade-your-browser.html"; 
    //     }
    // }
  },
  methods:{
    login(){
      if(this.ruleForm.name==''||this.ruleForm.name==null){
        return
      }
      if(this.ruleForm.password==''||this.ruleForm.password==null){
        return
      }
      let password=md5(this.ruleForm.password)
      console.log(md5(this.ruleForm.password))
      let data={"userInfo":this.ruleForm.name,"passWord":password}
      // let data={"userInfo":this.ruleForm.name,"passWord":this.ruleForm.password}
      axios.post("/api/user/login1",data).then(data=>{
        // console.log(data)
        // console.log(data.data.csrfToken)
        if(data.data.success==false){
          this.$message.error(data.data.msg)
        }else if(data.data.success==true){
          window.sessionStorage.setItem("token",data.data.csrfToken);
          this.$router.push('/nowaging')
        }
      })
    }
  }
}
</script>

<style scoped>
  #login{
    width: 20%;
    margin: 100px 38%;
  }
  .btn{
    text-align: center;
  }
  button{
    margin-right:30px;
  }
</style>
