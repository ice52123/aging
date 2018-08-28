<template>
  <div id="tit_2_div">
    <div class="bdiv af">
      <span>采集器：</span>
      <input type="text" id="gsn" placeholder="请输入逆变器SN号"/>
      <span style="margin-left: 20px;">起始日期：</span>
      <input type="text" id="sdate"/>
      <span style="margin:0 5px;">至</span>
      <input type="text" id="edate"/>
      <span style="display:none" id="rep_loading"><img src="images/loding.gif"/></span>
      <input class="btn_same" type="button" value="查询" @click=""/>
      <input class="btn_same" type="button" value="导出" @click=""/>
      <input class="btn_same" type="button" value="全部导出" @click=""/>
    </div>
    <div class="list_data af">
      <div style="overflow: auto;">
        <table style="white-space: nowrap" width="100%" border="0" cellspacing="0">
          <tr id="fac_head">
            <th>采集器SN</th>
            <th>逆变器SN</th>
            <th>总工作时间(秒数) </th>
            <th>本次上电至今的时间(秒数)</th>
            <th>采集器实际通讯地址</th>
            <th>温度</th>
            <th>直流电压1</th>
            <th>直流电压2</th>
            <th>直流电流1</th>
            <th>直流电流2</th>
            <th>交流电流R</th>
            <th>交流电流S</th>
            <th>交流电流T</th>
            <th>频率</th>
            <th>有功功率</th>
            <th>当天发电量</th>
            <th>总发电量</th>
            <th>型号</th>
            <th>错误码</th>
            <th>服务器IP</th>
            <th>更新时间</th>
          </tr>
          <tbody id="his_data">
          <tr>
            <td>1111</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bdiv{
  margin: 2%;
}
.bdiv span{
  font-size: 16px;
  line-height: 40px;
  float: left;
  color: #39426A;
}
.bdiv input{
  float: left;
  border: 1px solid #E5E8EF;
  padding-left: 10px;
  height: 36px;
  line-height: 36px;
}
.bdiv .btn_same{
  padding: 0 20px;
  margin-left:10px;
  color: #fff;
  background: #EF833A;
  border: 1px solid #EF833A;
  border-radius: 3px;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
}
.list_data{
  background: #F9FAFC;
  padding: 0 2%;
}
#fac_head table{
  margin-top: 2%;
}
#fac_head th{
  font-weight: normal;
  padding-right: 2%;
  height: 60px;
  line-height: 60px;
}
#his_data tr td{
  background: #fff;
  height: 60px;
  line-height: 60px;
}
</style>