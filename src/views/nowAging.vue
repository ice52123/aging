<template>
  <div class="all af">
    <div id="section" class="af">
      <div id="tit_1_div">
        <div class="now_aging af">
          <div id="state">
            <div class="name">当前老化批次：</div>
            <el-select id="selected" v-model="selected">
              <el-option v-for="all in alls" :key="all.value" :value="all.agingBatch">{{all.agingBatch}}</el-option>
            </el-select>
            <span style="color:#C0C0C0" v-if="state==0">未开始</span>
            <span style="color:#00FF00" v-else-if="state==1">已开始</span>
            <span style="color:#FF0000" v-else-if="state==2">已结束</span>
            <span style="color:#00FFFF" v-else-if="state==3">已归档</span>
            <span style="color:#000000" v-else>状态</span>
          </div>
          <div class="aging_person lf">
            <span class="name">老化人员：</span>
            <input type="text" id="testuser" placeholder="请输入老化人员名称" v-model="testuser"/>
            <el-button type="warning" :disabled="btn1" @click="begin">开始老化</el-button>
            <el-button type="warning" :disabled="btn2" @click="stop">结束老化</el-button>
            <el-button type="warning" :disabled="btn3" @click="archive">老化归档</el-button>
          </div>
        </div>
        <div class="addaging af">
          <el-button class="na" type="warning" @click="addage1" :disabled="addAging">新增老化</el-button>
          <input type="text" :disabled="disabled" placeholder="请输入要添加的老化批次" id="add_aging" v-model='batchNo'>
          <el-button :disabled="disabled" @click="addage2" type="warning" plain>添加</el-button>
        </div>
        <div class="slide af">
          <div class="add">
            <form id="import_form" method="post">
              <span>添加设备：</span>
              <el-input type="text" placeholder="请输入设备SN号" id='onesn' v-model="onesn" @keyup.enter.native="addOneSN"/></el-input>
              <el-button @click.native.prevent="addOneSN">添加SN</el-button>
              <div class="file-box">
                <input type='button' class='btn' value='选择文件' />
                <input type='text' name='oldtestnum' id='oldtestnum' class='txt' />
                <input type="file" name="moresn" class="file" id="moresn"  onchange="document.getElementById('oldtestnum').value=this.value" @change="importAll()"/>
              </div>
              <el-button @click="addMoreSN()">批量导入SN</el-button>
            </form>
          </div>
        </div>
        <div class="show">
          <el-button @click="allState" :disabled="allNo" round>总共:{{no0}}</el-button>
          <el-button @click="okState" :disabled="allNo" round>正常:{{no1}}</el-button>
          <el-button @click="errState" :disabled="allNo" round>报警:{{no2}}</el-button>
          <el-button @click="offState" :disabled="allNo" round>离线:{{no3}}</el-button>
          <div class="search">
            <input type="text" placeholder="请输入采集器SN号" v-model="conSN" id="conSN">
            <img src="../assets/images/search.png" @click="agingSearch">
          </div>
          <div>
            <span>开始时间:</span>
            <span id="s_time"></span>
            <span id="e_time"></span>
          </div>
          <div>
            <span>下次更新:</span>
            <span id="up_time">{{time}}</span>
          </div>
          <div id="refresh_pic">
            <i class="el-icon-refresh" @click="send" v-show="refresh"></i>
            <i class="el-icon-loading" v-show="noClick"></i>
          </div>
          <div class="change_style">
            <div class="b" v-show="b"></div>
            <div class="s" v-show="s" @click="change1"></div>
            <div class="b2" v-show="b2" @click="change2"></div>
            <div class="s2" v-show="s2"></div>
          </div>
        </div>
        <div class="content">
          <div id="equip_list_div" class="af lf" v-show='list1'>
            <ul v-for="(record,index) in records">
              <li>
                <div class="top">
                  <span>{{record.sn}}</span>
                </div>
                <img src="../assets/images/close.png" class="daimg" @click="deleteSN(index)">
              </li>
              <li>
                <div>逆变器：</div>
                <div>{{record.inverterSn}}</div>
              </li>
              <li>
                <div>状态：</div>
                <div style="color:#00ff00" v-if="record.state==1">正常</div>
                <div style="color:#C0C0C0" v-if="record.state==2">离线</div>
                <div style="color:#ff0000" v-if="record.state==3">报警</div>
              </li>
              <li>
                <div>类型：</div>
                <div>{{record.model}}</div>
              </li>
              <li>
                <div>版本：</div>
                <div>{{record.version}}</div>
              </li>
              <li>
                <div>出厂：</div>
                <div>{{record.createDate | formatDate}}</div>
              </li>
              <li>
                <div>信号：</div>
                <div>{{record.rssiLevel}}</div>
              </li>
              <li>
                <div>条数：</div>
                <div>{{record.infoCount}}</div>
              </li>
              <li>
                <div>更新</div>
                <div v-if="record.timestamp==null">--</div>
                <div v-else>{{parseFloat(record.timestamp) | formatDate}}</div>
              </li>
            </ul>
          </div>
          <div id="equip_list_div2" class="af lf" v-show='list2'>
            <ul v-for="(record,index) in records">
              <li>
                <div class="top">
                  <span>{{record.sn}}</span>
                </div>
                <img src="../assets/images/close.png" class="daimg" @click="deleteSN(index)">
              </li>
              <li>
                <div>逆变器：</div>
                <div>{{record.inverterSn}}</div>
              </li>
              <li>
                <div>状态：</div>
                <div style="color:#00ff00" v-if="record.state==1">正常</div>
                <div style="color:#C0C0C0" v-if="record.state==2">离线</div>
                <div style="color:#ff0000" v-if="record.state==3">报警</div>
              </li>
              <li>
                <div>信号：</div>
                <div>{{record.rssiLevel}}</div>
              </li>
              <li>
                <div>条数：</div>
                <div>{{record.infoCount}}</div>
              </li>
              <li>
                <div>更新</div>
                <div v-if="record.timestamp==null">--</div>
                <div v-else>{{parseFloat(record.timestamp) | formatDate}}</div>
              </li>
            </ul>
          </div>
          <div class="changepage af lf" v-show="pages">
            <span>每页显示的数量</span>
            <el-select v-model="changepage">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div id="equip_page_div" v-if="allshow==1">
            <el-button @click="homePage">首页</el-button>
            <el-button @click="previousPage" icon="el-icon-arrow-left">上一页</el-button>
            <span class="pages">{{nowPage}}/{{allPage}}</span>
            <el-button @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <el-button @click="trailerPage">尾页</el-button>
          </div>
          <div id="equip_page_div" v-if="okshow==1">
            <el-button @click="homePage">首页</el-button>
            <el-button @click="previousPage" icon="el-icon-arrow-left">上一页</el-button>
            <span class="pages">{{nowPage}}/{{okPage}}</span>
            <el-button @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <el-button @click="trailerPage">尾页</el-button>
          </div>
          <div id="equip_page_div" v-if="errshow==1">
            <el-button @click="homePage">首页</el-button>
            <el-button @click="previousPage" icon="el-icon-arrow-left">上一页</el-button>
            <span class="pages">{{nowPage}}/{{errPage}}</span>
            <el-button @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <el-button @click="trailerPage">尾页</el-button>
          </div>
          <div id="equip_page_div" v-if="offshow==1">
            <el-button @click="homePage">首页</el-button>
            <el-button @click="previousPage" icon="el-icon-arrow-left">上一页</el-button>
            <span class="pages">{{nowPage}}/{{offPage}}</span>
            <el-button @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <el-button @click="trailerPage">尾页</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import promise from 'es6-promise';
promise.polyfill();

export default {
  name: 'NowAging',
  data(){
    return {
      options: [{
        value: '14',
        label: '14'
      }, {
        value: '28',
        label: '28'
      }, {
        value: '42',
        label: '42'
      }],
      changepage:'14',
      value: '',
      alls:[],
      selected:"请选择批次号",
      state:this.state,
      disabled:true,
      text:'',
      batchNo:'',
      onesn:'',
      conSN:'',
      allNo:'',
      btn1:true,
      btn2:true,
      btn3:true,
      no0:this.no0,
      no1:this.no1,
      no2:this.no2,
      no3:this.no3,
      records:this.records,
      nstate:this.nstate,
      testuser:this.agingWorker,
      time:30,
      times:3,
      b:true,
      s:true,
      b2:false,
      s2:false,
      list1:true,
      list2:false,
      canClick: true,
      noClick:false,
      refresh:true,
      pages:false,
      addAging:false,
      allPage:this.allPage,
      okPage:this.okPage,
      errPage:this.errPage,
      offPage:this.offPage,
      allshow:this.allshow,
      okshow:this.okshow,
      errshow:this.errshow,
      offshow:this.offshow,
      nowPage:this.nowPage,
      timer:''
    }
  },
  mounted(){
    let token=window.sessionStorage.getItem("token")
    console.log(token)
    if(token=='' || token==null){
      this.$router.push('/login' )
    }

    axios({
      method: 'post',
      url: '/api/agingBatch/agingBatchList',
      headers: {"token":token}
    }).then(data=>{
      console.log(data)
      this.alls=data.data.data
    })
    if(this.selected=="请选择批次号"){
      this.allNo=true
    }else{
      this.allNo=false
    }

  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    },
  },
  watch: {
    selected: function (val) {
      let b=val
      // console.log(this.changepage)
      this.pages=true
      this.allNo=false
      this.time=30
      // this.canClick = true
      // this.noClick = false
      window.sessionStorage.setItem("agingBatchNo",b)
      let token=window.sessionStorage.getItem("token")
      axios({
        method: 'post',
        url: '/api/agingBatch/agingBatchList?agingBatchNo='+b,
        headers: {"token":token}
      }).then(data=>{
        // console.log(data.data)
        this.state=data.data.data[0].state
        // console.log(this.state)
        if(this.state==1){
          this.addAging=true
        }else{
          this.addAging=false
        }
        this.testuser=data.data.data[0].agingWorker
        // let agingStartDate=decodeURI(data.data.data[0].agingStartDate)
        let agingStartDate=data.data.data[0].agingStartDate
        // let agingState=data.data.data[0].state
        window.sessionStorage.setItem("agingStartDate",agingStartDate)
        window.sessionStorage.setItem("agingState",this.state)
        if(this.state==0){
          this.btn1=false
          this.btn2=true
          this.btn3=true
        }else if(this.state==1){
          this.btn1=true
          this.btn2=false
          this.btn3=true
        }else if(this.state==2){
          this.btn1=false
          this.btn2=true
          this.btn3=false
        }
        // let data={'pageNo':1,'pageSize':14,'agingBatchNo':b,'state':this.state,'agingStartDate':agingStartDate}
        axios({
          method: 'post',
          url: "/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+this.state+"&agingStartDate="+agingStartDate,
          headers: {"token":token}
        }).then(data=>{
          console.log(data)
          this.time=30
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          $("#s_time").html(getLocalTime(timestamp))
        })
        return this.state
      })
      axios({
        method: 'post',
        url: "/api/agingBatch/deviceStateCount?agingBatchNo="+b,
        headers: {"token":token}
      }).then(data=>{
        // console.log(data.data.data)
        this.no0=data.data.data.normal+data.data.data.alert+data.data.data.offline
        this.no1=data.data.data.normal
        this.no2=data.data.data.alert
        this.no3=data.data.data.offline
        if(this.no0==0){
          this.allPage=Math.ceil(this.no0/14)+1
        }else{
          this.allPage=Math.ceil(this.no0/14)
        }
        if(this.no1==0){
          this.okPage=Math.ceil(this.no1/14)+1
        }else{
          this.okPage=Math.ceil(this.no1/14)
        }
        if(this.no2==0){
          this.errPage=Math.ceil(this.no2/14)+1
        }else{
          this.errPage=Math.ceil(this.no2/14)
        }
        if(this.no3==0){
          this.offPage=Math.ceil(this.no3/14)+1
        }else{
          this.offPage=Math.ceil(this.no3/14)
        }
      })
      this.allshow=1
      this.okshow=0
      this.errshow=0
      this.offshow=0
      this.nowPage=1


      if (!this.canClick) return
      this.canClick = false
      let me = this;
      let agingStartDate=window.sessionStorage.getItem("agingStartDate")
      let agingState=window.sessionStorage.getItem("agingState")
      let pageSize=this.changepage
      window.sessionStorage.setItem("pageSize",pageSize)
      // let timer = window.setInterval(function(){
      //   if ((me.time--) <= 0){
      //     me.time = 30;
      //     me.canClick = false
      //     me.noClick = true
      //     setTimeout(function(){
      //       axios({
      //         method: 'post',
      //         url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
      //         headers: {"token":token}
      //       }).then(data=>{
      //         me.canClick = true
      //         me.noClick = false
      //         console.log(data)
      //         console.log(data.data.data.records)
      //         this.records=data.data.data.records
      //         $("#s_time").html(getLocalTime(timestamp))
      //       })
      //     },3000)
      //   }
      // }, 1000);
      let interval = window.setInterval(function(){
        if ((me.time--) <= 0){
          me.time = 30;
          me.canClick = true
          axios({
            method: 'post',
            url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+pageSize+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
            headers: {"token":token}
          }).then(data=>{
            console.log(data)
            // console.log(data.body.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        }
      }, 1000);
    },
    changepage:function(val){
      console.log(val)
      this.changepage=val
      let b=window.sessionStorage.getItem("agingBatchNo")
      let agingStartDate=window.sessionStorage.getItem("agingStartDate")
      let agingState=window.sessionStorage.getItem("agingState")
      let token=window.sessionStorage.getItem("token")
      axios({
        method: 'post',
        url: "/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
        headers: {"token":token}
      }).then(data=>{
        // console.log(data)
        // console.log(data.data.data.records)
        this.records=data.data.data.records
        // $("#s_time").html(getLocalTime(timestamp))
      })

      axios({
          method: 'post',
          url: "/api/agingBatch/deviceStateCount?agingBatchNo="+b,
          headers: {"token":token}
        }).then(data=>{
        // console.log(data.data.data)
        this.no0=data.data.data.normal+data.data.data.alert+data.data.data.offline
        this.no1=data.data.data.normal
        this.no2=data.data.data.alert
        this.no3=data.data.data.offline
        if(this.no0==0){
          this.allPage=Math.ceil(this.no0/this.changepage)+1
        }else{
          this.allPage=Math.ceil(this.no0/this.changepage)
        }
        if(this.no1==0){
          this.okPage=Math.ceil(this.no1/this.changepage)+1
        }else{
          this.okPage=Math.ceil(this.no1/this.changepage)
        }
        if(this.no2==0){
          this.errPage=Math.ceil(this.no2/this.changepage)+1
        }else{
          this.errPage=Math.ceil(this.no2/this.changepage)
        }
        if(this.no3==0){
          this.offPage=Math.ceil(this.no3/this.changepage)+1
        }else{
          this.offPage=Math.ceil(this.no3/this.changepage)
        }
      })
    },
  },
  methods:{
    change1(){
      this.b=false
      this.s=false
      this.b2=true
      this.s2=true
      this.list1=false
      this.list2=true
    },
    change2(){
      this.b=true
      this.s=true
      this.b2=false
      this.s2=false
      this.list1=true
      this.list2=false
    },
    send() {
      // this.times=3
      this.refresh = false
      this.noClick = true
      let _this = this;
      setTimeout(function(){
        _this.refresh = true
        _this.noClick = false
        let b=window.sessionStorage.getItem("agingBatchNo")
        let agingStartDate=window.sessionStorage.getItem("agingStartDate")
        let agingState=window.sessionStorage.getItem("agingState")
        let token=window.sessionStorage.getItem("token")
        let pageSize=window.sessionStorage.getItem("pageSize")
        axios({
          method: 'post',
          url: "/api/agingBatch/deviceList?pageNo=1&pageSize="+pageSize+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
          headers: {"token":token}
        }).then(data=>{
          // console.log(data)
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          // $("#s_time").html(getLocalTime(timestamp))
        })
      },3000);
    },
    agingSearch(){
      let conSN=this.conSN
      let b=window.sessionStorage.getItem("agingBatchNo")
      let token=window.sessionStorage.getItem("token")
      axios({
          method: 'post',
          url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
          headers: {"token":token}
        }).then(data=>{
        this.state=data.data.data[0].state
        let agingStartDate=data.data.data[0].agingStartDate
        let agingState=data.data.data[0].state
        axios({
          method: 'post',
          url:"/api/agingBatch/deviceList?agingBatchNo="+b+"&collectorSn="+conSN,
          headers: {"token":token}
        }).then(data=>{
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          this.allPage=1
        })
      })
    },
    importAll(){
      let reader = new FileReader();
      let inputBox = document.getElementById("moresn");
      reader.readAsBinaryString(inputBox.files[0]);
      reader.onload = function(){
        // console.log(this.result)
        let str=this.result.replace(/\s+/g,",")
        window.sessionStorage.setItem("importAll",str);
      }
    },
    addMoreSN(){
      let moresn=$("#moresn").val()
      console.log(moresn)
      if(moresn=='' || moresn==null){
        alert("请添加文件！")
      }
      let str=window.sessionStorage.getItem("importAll")
      let a=window.sessionStorage.getItem("agingBatchNo")
      let token=window.sessionStorage.getItem("token")
      axios({
          method: 'post',
          url:"/api/agingBatch/addDevice?agingBatchNo="+a+"&deviceIds="+str,
          headers: {"token":token}
        }).then(data=>{
        if(data.data.success==true){
          alert("添加成功！")
          location.reload()
        }else{
          alert("添加失败！")
          location.reload()
        }
      })
    },
    begin(){
      let a=$("#selected").val()
      let name=$("#testuser").val()
      if(a == "" || a==null){
        alert("请先选择正在读取中的老化批次！");
      }else if(name=='' || name==null){
        alert("请输入老化人员名称！")
      }else if (confirm("是否开始老化？")){
      let token=window.sessionStorage.getItem("token")
        axios({
          method: 'post',
          url:"/api/agingBatch/changeState?agingBatchNo="+a+"&state=1"+"&workerName"+name,
          headers: {"token":token}
        }).then(data=>{
          this.state=1
          if(data.data.success==true){
            alert("开始老化成功！")
          }else{
            alert("开始老化失败！")
          }
        })
      }
    },
    stop(){
      let name=$("#testuser").val()
      let a=$("#selected").val()
      if(a == "" || a==null){
        alert("请先选择正在读取中的老化批次！");
      }else if(name=='' || name==null){
        alert("请输入老化人员名称！")
      }else if (confirm("是否结束老化？")){
      let token=window.sessionStorage.getItem("token")
        axios({
          method: 'post',
          url:"/api/agingBatch/changeState?agingBatchNo="+a+"&state=2"+"&workerName"+name,
          headers: {"token":token}
        }).then(data=>{
          this.state=2
          if(data.data.success==true){
            alert("结束老化成功！")
          }else{
            alert("结束老化失败！")
          }
        })
      }
    },
    archive(){
      let name=$("#testuser").val()
      let a=$("#selected").val()
      if(a == "" || a==null){
        alert("请先选择正在读取中的老化批次！");
      }else if(name=='' || name==null){
        alert("请输入老化人员名称！")
      }else if (confirm("是否老化归档？")){
      let token=window.sessionStorage.getItem("token")
        axios({
          method: 'post',
          url:"/api/agingBatch/changeState?agingBatchNo="+a+"&state=3"+"&workerName"+name,
          headers: {"token":token}
        }).then(data=>{
          this.state=3
          if(data.data.success==true){
            alert("老化归档成功！")
          }else{
            alert("老化归档失败！")
          }
        })
      }
    },
    deleteSN(index){
      let b=window.sessionStorage.getItem("agingBatchNo")
      if (confirm("是否删除？")){
      let token=window.sessionStorage.getItem("token")
        axios({
          method: 'post',
          url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b,
          headers: {"token":token}
        }).then(data=>{
          let deleteSN=data.data.data.records[index].sn
          console.log(deleteSN)
          axios({
            method: 'post',
            url:"/api/agingBatch/delDevice?agingBatchNo="+b+"&deviceIds="+deleteSN,
            headers: {"token":token}
          }).then(data=>{
            axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
        this.state=data.data.data[0].state
        let agingStartDate=data.data.data[0].agingStartDate
        let agingState=data.data.data[0].state
        axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          $("#s_time").html(getLocalTime(timestamp))
        })
      })
            
          })
        })
      }
    },
    addage1(){
      this.disabled=false;
    },
    addage2(){
      let name=$("#testuser").val()
      let add_aging=$("#add_aging").val()
      if(name=='' || name==null){
        alert("请输入老化人员名称！")
      }else if(this.batchNo=='' || this.batchNo==null){
        alert("请输入要添加的老化批次！");
      }else if (confirm("是否添加老化批次？")){
      let token=window.sessionStorage.getItem("token")
        axios({
              method: 'post',
              url:"/api/agingBatch/checkOnly?agingBatchNo="+add_aging,
              headers: {"token":token}
            }).then(data=>{
          // console.log(data.data.success)
          if(data.data.success==false){
            alert("批次号已存在，请重新输入！")
          }else if(data.data.success==true){
            axios({
              method: 'post',
              url:"/api/agingBatch/addAging?agingBatchNo="+add_aging+"&workerName="+name,
              headers: {"token":token}
            }).then(data=>{
              if(data.data.success==true){
                alert("添加成功！")
                location.reload()
              }else{
                alert("添加失败！")
                location.reload()
              }
            })
          }
        })
        this.disabled=true;
        this.batchNo='';
      }
    },
    addOneSN(){
      console.log(11111)
      let a=$("#selected").val()
      let onesn=this.onesn
      if(a == "" || a==null || a=="请选择批次号"){
        alert("请先选择正在读取中的老化批次！");
      }else if(onesn==''||onesn==null){
        alert("请输入要添加的SN号！")
      }else if (confirm("是否添加设备SN号？")){
      let token=window.sessionStorage.getItem("token")
        axios({
              method: 'post',
              url:"/api/agingBatch/addDevice?agingBatchNo="+a+"&deviceIds="+onesn,
              headers: {"token":token}
            }).then(data=>{
          if(data.data.success==true){
            alert("添加成功！")
            location.reload()
          }else{
            alert("添加失败！")
            location.reload()
          }
        })
        this.onesn=""
      }
    },
    allState(){
      let b=window.sessionStorage.getItem("agingBatchNo")
      let token=window.sessionStorage.getItem("token")
      axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{

        // this.state=data.data.data[0].state
        let agingStartDate=data.data.data[0].agingStartDate
        let agingState=data.data.data[0].state
        axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          $("#s_time").html(getLocalTime(timestamp))
        })
      })
      this.allshow=1
      this.okshow=0
      this.errshow=0
      this.offshow=0
      this.nowPage=1
    },
    okState(){
      let b=window.sessionStorage.getItem("agingBatchNo")
      let token=window.sessionStorage.getItem("token")
      axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
        // this.state=data.data.data[0].state
        let agingStartDate=data.data.data[0].agingStartDate
        let agingState=data.data.data[0].state
        axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=1"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          $("#s_time").html(getLocalTime(timestamp))
        })
      })
      this.allshow=0
      this.okshow=1
      this.errshow=0
      this.offshow=0
      this.nowPage=1
    },
    errState(){
      let b=window.sessionStorage.getItem("agingBatchNo")
      let token=window.sessionStorage.getItem("token")
      axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
        // this.state=data.data.data[0].state
        let agingStartDate=data.data.data[0].agingStartDate
        let agingState=data.data.data[0].state
        axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=3"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          $("#s_time").html(getLocalTime(timestamp))
        })
      })
      this.allshow=0
      this.okshow=0
      this.errshow=1
      this.offshow=0
      this.nowPage=1
    },
    offState(){
      let b=window.sessionStorage.getItem("agingBatchNo")
      let token=window.sessionStorage.getItem("token")
      axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
        // this.state=data.data.data[0].state
        let agingStartDate=data.data.data[0].agingStartDate
        let agingState=data.data.data[0].state
        axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=2"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
          // console.log(data.data.data.records)
          this.records=data.data.data.records
          $("#s_time").html(getLocalTime(timestamp))
        })
      })
      this.allshow=0
      this.okshow=0
      this.errshow=0
      this.offshow=1
      this.nowPage=1
    },
    homePage(){
      let token=window.sessionStorage.getItem("token")
      if(this.allshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=1
      }else if(this.okshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=1"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=1
      }else if(this.errshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=3"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=1
      }else if(this.offshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo=1&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=2"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=1
      }
    },
    previousPage(){
      let token=window.sessionStorage.getItem("token")
      if(this.allshow==1){
        if(this.nowPage==1){
          return
        }else if(this.nowPage<=this.allPage){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage-1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }else if(this.okshow==1){
        if(this.nowPage==1){
          return
        }else if(this.nowPage<=this.okPage){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage-1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }else if(this.errshow==1){
        if(this.nowPage==1){
          return
        }else if(this.nowPage<=this.errPage){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage-1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }else if(this.offshow==1){
        if(this.nowPage==1){
          return
        }else if(this.nowPage<=this.offPage){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage-1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }
    },
    nextPage(){
      let token=window.sessionStorage.getItem("token")
      if(this.allshow==1){
        if(this.nowPage==this.allPage){
          return
        }else if(this.nowPage>=1){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage+1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }else if(this.okshow==1){
        if(this.nowPage==this.okPage){
          return
        }else if(this.nowPage>=1){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage+1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }else if(this.errshow==1){
        if(this.nowPage==this.errPage){
          return
        }else if(this.nowPage>=1){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage+1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }else if(this.offshow==1){
        if(this.nowPage==this.offPage){
          return
        }else if(this.nowPage>=1){
          let b=window.sessionStorage.getItem("agingBatchNo")
          let previousPage=this.nowPage+1
          axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
            // this.state=data.data.data[0].state
            let agingStartDate=data.data.data[0].agingStartDate
            let agingState=data.data.data[0].state
            axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+previousPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
              // console.log(data.data.data.records)
              this.records=data.data.data.records
              $("#s_time").html(getLocalTime(timestamp))
            })
          })
          this.nowPage=previousPage
        }
      }
    },
    trailerPage(){
      let token=window.sessionStorage.getItem("token")
      if(this.allshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+this.allPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=this.allPage
      }else if(this.okshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+this.okPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=1"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=this.okPage
      }else if(this.errshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+this.errPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=3"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=this.errPage
      }else if(this.offshow==1){
        let b=window.sessionStorage.getItem("agingBatchNo")
        axios({
              method: 'post',
              url:"/api/agingBatch/agingBatchList?agingBatchNo="+b,
              headers: {"token":token}
            }).then(data=>{
          // this.state=data.data.data[0].state
          let agingStartDate=data.data.data[0].agingStartDate
          let agingState=data.data.data[0].state
          axios({
              method: 'post',
              url:"/api/agingBatch/deviceList?pageNo="+this.offPage+"&pageSize="+this.changepage+"&agingBatchNo="+b+"&state="+agingState+"&collectorState=2"+"&agingStartDate="+agingStartDate,
              headers: {"token":token}
            }).then(data=>{
            // console.log(data.data.data.records)
            this.records=data.data.data.records
            $("#s_time").html(getLocalTime(timestamp))
          })
        })
        this.nowPage=this.offPage
      }
    },
  }
}



function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}

// var timestamp = Date.parse(new Date())/1000
// function getLocalTime(nS) {     
//   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")    
// }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*初始样式*/
data,h1,h2,h3,h4,h5,h6,p,ul,ol,li,dl,dt,dd{
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

/************************/
.changepage{
  width: 200px;
  margin-left: 2%;
}
.changepage .el-select{
  width: 70px;
  margin-left:10px;
}
.changepage span{
  height: 40px;
  line-height: 40px;
  float: left;
}
input::-webkit-input-placeholder{
  color:#CDD0D7;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:#CDD0D7;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color:#CDD0D7;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  color:#CDD0D7;
}
#header{
  background: #5D5C64;
  width: 100%;
  height: 50px;
}
.logo{
  padding-left:2%;
  margin-top: 6.5px;
}
.logo img{
  width: 50%;
}
#title_div{
  margin-top: 14px;
  color: #AAABB0;
}
#title_div input{
  height: 36px;
}
#title_div span{
  padding: 8px 3px;
  margin: 0 20px;
  cursor: pointer;
}
#tit_1_div{
  float: left;
  width: 100%;
}
.sel{
  color:#fff;
  border-bottom:2px solid #EF833A;
}
.btn_same{
  padding: 0 20px;
  margin-left: 40px;
  color: #fff;
  background: #EF833A;
  border: 1px solid #EF833A;
  border-radius: 3px;
  cursor: pointer;
  font-size: 14px;
}
#section{
  /*padding:30px 40px;*/
  float: left;
  width: 100%;
}
.form-control{
  width: 30%;
  height: 40px;
}
.now_aging{
  color: #39426A;
  padding:.3% 2%;
  background: #EEF3F7;
  width: 96%;
}
#state .name{
  float: left;
  width: 150px;
  line-height: 40px;
}
#state span{
  font-size: 16px;
  line-height: 40px;
  float: left;
  margin-left: 30px;
}
.now_aging select{
  float: left;
}
#state{
  float: left;
  width: 32%;
}
#state span{
  font-size: 18px;
  font-weight: bold;
}
.el-select{
  float: left;
}
.shrink{
  width: 38px;
  height: 38px;
  float: right;
  margin: 1px;
  cursor: pointer;
  position: absolute;
  right:6.5%;
  top: 33%;
  z-index: 1111;
}
.drag-down{
  background: url(../assets/images/drag-down.png);
}
.drag-up{
  background: url(../assets/images/drag-up.png);
}
.slide{
  width: 100%;
  background: #fff;
  float: left;
}
#old_test_num{
  color: #EF833A;
  display: block;
  float: left;
  text-align: center;
}
#old_test_status{
  display: block;
  float: left;
  height: 36px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-left: 20px;
  font-size: 16px;
  border: 2px solid #58CDCC;
  line-height: 36px;
  padding: 0 15px;
  color: #58CDCC;
}
.modify img{
  margin: 4px 0;
  margin-left: 20px;
  float: right;
  width: 32px;
  cursor: pointer;
}
#oldtestname_txt{
  margin-left: 20px;
  width: 220px;
  padding-left: 10px;
  border: 1px solid #E5E8EF;
  border-radius: 2px;
  height: 36px;
  line-height: 36px;
}
.add button{
  float: left;
  margin: 0 20px;
}
.addaging{
  float: left;
  width: 96%;
  padding: .5% 2% 0 2%;
}
.addaging div{
  width: 38px;
  height: 38px;
  background: url(../assets/images/add.png) no-repeat;
  float: left;
  margin: 0 10px;
  cursor: pointer;
}
.el-select-dropdown__item{
  padding-left: 10px;
}
.addaging input{
  border: 1px solid #E5E8EF;
  padding:0 10px;
  width: 195px;
  height: 38px;
  /*line-height: 40px;*/
  float: left;
}
/*.addaging .btn_same{
  margin-left: 0;
  width: 100px;
  margin-right: 50px;
  height: 40px;
}*/
.addaging .na{
  margin-right: 50px;
  margin-left: 0;
}
.addaging button{
  margin-left: 20px;
  float: left;
}
.show2{
  display: none;
}
.choose_aging{
  margin-top: 20px;
  float: left;
  width: 100%;
  padding: 0 2%;
  box-sizing: border-box;
}
.choose_aging span,.add span,.aging_person span{
  font-size: 16px;
  line-height: 40px;
  float: left;
  color: #39426A;
  width: 150px;
}
.choose_aging ul{
  width: 88%;
}
.choose_aging li{
  width: 14.2%;
  height: 36px;
  line-height: 36px;
  float: left;
  text-align: center;
  border: 2px solid #EF833A;
  margin-right:2%;
  margin-bottom: 1%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
}
#onesn{
  border: 1px solid #E5E8EF;
  padding-left: 10px;
  width: 260px;
  float: left;
}
#import_form .el-input{
  float: left;
  width: 217px;
}
.add{
  width: 100%;
  float: left;
  padding:.5% 2% 0 2%;
  box-sizing: border-box;
}
.add input,.aging_person input{
  height: 36px;
  /*line-height: 36px;*/
}
.aging_person .btn_same{
  height: 40px;
  line-height: 40px;
  margin-left: 15px;
}
/*.add .btn_same{
  background: #F5F5F5;
  border: 1px solid #E6E8EF;
  color: #39426A;
  margin:0 20px;
  height: 40px;
  float: left;
}*/
/*.aging_person .el-button{
  background: #EF833A;
  color: #fff;
}*/
#moresn{
  line-height: 33px;
  height: 40px;
}
.aging_person{
  width: 65%;
  float: left;
  margin-left: 3%;
}
#testuser{
  border: 1px solid #E5E8EF;
  padding-left: 10px;
  width: 260px;
}
.file-box{
  position:relative;
  float: left;
}
.txt{
  border:1px solid #cdcdcd;
  width:220px;
}
.file-box .btn{
  background:#FFF;
  border:1px solid #CDCDCD;
  height:40px;
  width:80px;
}
.file{
  position:absolute;
  top:0;
  right:0;
  opacity:0;
  width:300px
}
.show{
  width: 100%;
  float: left;
  padding:.3% 2%;
  box-sizing: border-box;
}
.show>div{
  float: left;
  padding:0 20px;
  cursor: default;
}
.show button{
  margin-right: 10px;
  float: left;
}
.show .search{
  padding: 0;
  position: relative;
}
.search input{
  height: 36px;
  line-height: 36px;
}
.search input{
  padding-left: 10px;
  padding-right: 40px;
  border: 1px solid #E5E8EF;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.search img{
  position: absolute;
  top: 10.5px;
  right: 5px;
  cursor: pointer;
}
.show .change_style{
  float: right;
  padding-left: 20px;
  padding-right: 0;
}
.change_style div{
  display: block;
  cursor: pointer;
  width: 40px;
  height: 40px;
  float: left;
}
#refresh_pic i{
  font-size: 40px;
  color: #999;
  cursor: pointer;
}
.b{
  background: url("../assets/images/big2.png");
}
.s{
  background: url("../assets/images/small1.png");
}
.b2{
  background: url("../assets/images/big1.png");
}
.s2{
  background: url("../assets/images/small2.png");
}
.show>div span{
  padding: 10px 0;
  height: 40px;
  line-height: 40px;
}
#up_time{
  display: block;
  width: 30px;
  line-height: 40px;
  float: right;
  padding: 0;
}
.choose,.show .state:hover{
  background: #EF833A;
  border: 1px solid #EF833A;
  color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  cursor: pointer;
}
.content{
  width: 100%;
  float: left;
  padding-bottom: 40px;
  background: #F9FAFC;
  border-top: 1px solid #E5E8EF;
}
.content ul{
  margin:1% .5% 0 .5%;
  width:13.28571428571429%;
  float: left;
  border: 1px solid #E5E8EF;
  box-sizing: border-box;
}
.content ul li{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 10px;
  color: #9B9B9B;
}
.content ul li div:first-child{
  width: 40%;
  float: left;
}
.content ul li div:nth-child(2){
  width: 60%;
  float: right;
}
.content ul li:first-child{
  background: #EFF4F8;
  position: relative;
  font-size: 16px;
  color: #000;
  border-bottom: 1px solid #E5E8EF;
}
.content ul li:first-child img{
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
#equip_list_div{
  margin-bottom: 20px;
  width: 100%;
}
#equip_list_div2{
  width: 100%;
  margin-bottom: 20px;
}
#equip_page_div{
  margin-right: 10%;
  text-align: center;
}
.pages{
  margin: 0 10px;
}
</style>
