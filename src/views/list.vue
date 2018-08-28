<template>
  <div id="tit_3_div">
    <div style="margin: 15px 2%;width: 25%;">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择查询方式" style="width: 150px;">
          <el-option label="按照SN号查询" value="1"></el-option>
          <el-option label="按照批次查询" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="batch af">
      <table border="0" cellspacing="0">
        <thead>
          <tr>
            <th>老化批次</th>
            <th>测试时间</th>
            <th>测试人</th>
            <th>设备数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="log_data">
        </tbody>
      </table>
      <div id="log_page_div"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      select: ''
    }
  }
}
</script>

<style scoped>
.el-input__inner{
  width: 200px;
}
.record_list .search{
  padding: 0;
  position: relative;
}
.record_list{
  padding: 2%;
}
.record_list select{
  height: 38px;
  line-height: 38px;
  border: 1px solid #E5E8EF;
  float: left;
  margin:2px 20px 2px 0;
}
.search input{
  height: 38px;
  line-height: 38px;
}
.search2{
  display: none;
}
.record_list .search input{
  width: 200px;
}
.record_list>input{
  height: 40px;
  line-height: 40px;
}
.batch{
  padding: 2%;
  background: #F9FAFC;
}
.batch table{
  width: 100%;
}
.batch tr th{
  text-align: left;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
}
.batch tr th:first-child,.batch tr td:first-child{
  width: 18%;
}
.batch tr th:nth-child(2),.batch tr td:nth-child(2){
  width: 35%;
}
.batch tr th:nth-child(3),.batch tr td:nth-child(3){
  width: 12%;
}
.batch tr th:nth-child(4),.batch tr td:nth-child(4){
  width: 15%;
  text-align: center;
}
.batch tr th:last-child,.batch tr td:last-child{
  width: 20%;
}
.batch tr td{
  height: 40px;
  line-height: 40px;
  background: #fff;
  padding: 10px 0;
}
.batch tr td img{
  margin-bottom: 2px;
  cursor: pointer;
}
</style>