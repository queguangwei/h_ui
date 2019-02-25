<template>
  <div>
    <h2>基础</h2>
    <Button @click="loadData">加载数据</Button>
    <Button @click="loadData1">原生加载数据</Button>
    <h-button @click="setLoading">切换状态</h-button>
    <h-button @click="exportData('csv')">下载数据csv</h-button>
    <h-button @click="exportData('xls')">下载数据xls</h-button>
    <h2>不带边线 单选 on-current-change</h2>
    <!-- :multiLevel="multiLevel2" -->
    <!-- notAdaptive splitIndex -->
     <h-simple-table ref="table" :columns="columnsBig1" notAdaptive border :data="bigData" no-data-text="数据为空" :loading="loading" :height="tableHeight" @on-selection-change="select" :itemHeight="30" :highlight-row="true" @on-current-change="select" @on-current-change-cnacle="select" notSort>
    </h-simple-table> 
  </div>
</template>
<script>

import TexpandRow from './Texpand-row.vue'
let jsonData=[];
let tData =require('../assets/aa.json');
let bigData = require('../assets/test.json') 
for (let i = 0; i < 5; i++) {
  jsonData = jsonData.concat(bigData);
}
console.log(jsonData.length);
export default {

  components:{TexpandRow},
  data () {
    return {
      checked:false,
      msgbox:false,
      loading:false,
      bigData:[],
      bigData1:[],
      tableHeight:0,
      columnsBig1: [
        {
          type: "index",
          width: 60,
          align: "center",
          key:'index',
          fixed: "left",
        },
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        //   fixed: "left",
        // },
        {
          title: "基金代码",
          key: "security_code",
          keyPoint: true,
          ellipsis: true,
          width: 100,
          // fixed: "left",
          render: (h, params) => {
            return h('div', '基金代码'+ params.index)
          }
        },
        {
          title: "基金名称",
          key: "security_name",
          width: 100,
          ellipsis: true,
          // fixed: "left",
          // render: (h, params) => {
          //   return h('div', '基金名称' + params.index)
          // }
        },
        {
          title: "交易市场",
          key: "market_no",
          width: 100,
          keyPoint: true,
          ellipsis: true,
          // fixed: "left",
          // render: (h, params) => {
          //   return h('div', '交易市场' + params.index)
          // }
        },
        {
          title: "基金类别",
          width: 100,
          key: "asset_ex1",
          ellipsis: true,
          // render: (h, params) => {
          //   return h('div', '基金类别' + params.index)
          // }
        },
        // {
        //   title: "投资类别",
        //   width: 100,
        //   key: "asset_ex2",
        //   ellipsis: true,
        //   // render: (h, params) => {
        //   //   return h('div', '投资类别' + params.index)
        //   // }
        // },
        // {
        //   title: "ETF类别",
        //   width: 100,
        //   key: "etf_type",
        //   ellipsis: true,
        //   // render: (h, params) => {
        //   //   return h('div', 'ETF类别' + params.index)
        //   // }
        // },
        // {
        //   title: "货币基金收益类别",
        //   width: 100,
        //   key: "moneyfund_bonustype",
        //   ellipsis: true,
        //   // render: (h, params) => {
        //   //   return h('div', '货币基金收益类别' + params.index)
        //   // }
        // },
        // {
        //   width: 100,
        //   title: "交易币种",
        //   key: "trade_currency",
        //   ellipsis: true,
        // },
        // {
        //   title: "面值",
        //   width: 100,
        //   key: "parvalue",
        //   ellipsis: true
        // },
        // {
        //   title: "分级产品级别",
        //   width: 100,
        //   key: "ratingfund_level",
        //   ellipsis: true,
        // },
        // {
        //   width: 100,
        //   title: "母基金代码",
        //   key: "fund_parent",
        //   ellipsis: true
        // },
        // {
        //   title: "是否保本",
        //   key: "isbreakeven",
        //   width: 100,
        //   ellipsis: true,
        // },
        
        // {
        //   title: "修改人",
        //   key: "user_operate",
        //   width: 100,
        //   ellipsis: true,
        // },
        {
          title: "修改时间",
          key: "dtime_operate",
          align: "center",
          width: 100,
          ellipsis: true,
        },
      ],
      multiLevel2:[
        [
          {title:'123',cols:2,align:'center',className:'demo-table-info-column'},
          {title:'456',rows:2,align:'center'},
          {title:'789',align:'right'},
        ],
        [
          {title:'123',cols:2,hiddenCol:true},
          {title:'456'},
        ],
        [
          {title:'234'},
          {title:'678',cols:2},
        ],
      ],
      
    }
  },
  methods:{
    loadData(){
      this.tableHeight=500;
      let old = new Date().getTime()
      console.log(old)
      // this.bigData = jsonData.slice(0, 100);
      this.$nextTick(() => {
        let newDate = new Date().getTime() - old
        console.log(newDate)
        this.bigData = jsonData.slice(0,60);
      })
      
    },
    loadData1(){
      let old = new Date().getTime()
      console.log(old)
      // this.bigData = jsonData;
      this.bigData1 = jsonData.slice(0, 100);
      this.$nextTick(() => {
        let newDate = new Date().getTime() - old
        console.log(newDate)
      })
    },
    changemsg(){
      this.msgbox = !this.msgbox;
    },
    onDrag(e,i){
      console.log(e);
      console.log(i);
    },
    onMove(i,j){
      console.log(i);
      console.log(j);
    },
    change(e){
      console.log(e);
    },
    scroll(num){
    },
    setLoading(){
      this.loading = !this.loading;
    },
    click1 (selection) {
      console.log(selection);
    },
    rowclick(){
      console.log('你点击了某一行');
    },
    rowdblclick(e,i){
      console.log('你双击了某一行');
    },
    expand(row,status){
      console.log(status);
    },
    sortChange(obj){
      if (obj.order == 'asc') {
        let len = this.data5.length-1;
        let item = this.data5[len];
        this.data5.splice(len,1);
        this.data5.splice(0,0,item);
      }else{
        console.log('你点击勒向下排序按钮');
      }
    },
    rowClassName (row, index) {
      if (index === 1) {
        return 'demo-table-info-row';
      } else if (index === 3) {
        return 'demo-table-error-row';
      }
      return '';
    },
    radioChange (currentRow,oldRow){
      console.log(currentRow);
      console.log(oldRow);
    },
    allSelect (allSelection){
      console.log(allSelection);
    },
    select (selection,row){//已选择的项和刚刚选择的项
      console.log('12312')
      console.log(selection);
      console.log(row);
    },
    selsetChange (selection){//选项发生变化时触发已选择的项
      console.log(selection);
    },
    show (index) {
      this.$hMsgBox.info({
        title: '用户信息',
        content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
      });
    },
    remove (index) {
      this.data6.splice(index, 1);
    }, 
    exportData(format){
      this.$refs.table.exportCsv({
        format: format,
      });
    }
  },
  mounted(){
    this.columns1=[
        { 
          type: 'selection',
          align: 'center',
        },
        { 
          type: 'index',
          align: 'center',
        },
        {
          title: '姓名',
          key: 'name',
          align: 'center',
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '地址',
          ellipsis:true,
          key: 'address',
        },
        {
          title: '地址1',
          key: 'address1',
        },
        {
          title: '地址2',
          key: 'address2',
        },
        {
          title: '地址3',
          key: 'address3',
        },
        {
          title: '地址4',
          key: 'address4',
        },
        {
          title: '地址5',
          key: 'address5',
        },
        {
          title: '地址6',
          key: 'address6',
          sortType:'address',
        }
    ]
    this.columnsBig=[
        { 
          type: 'selection',
          align: 'center',
        },
        { 
          type: 'index',
          align: 'center',
          key:'index'
        },
        {
          title: '姓名',
          key: 'fundId',
          align: 'center',
          ellipsis:true,
        },
        {
          title: '年龄',
          key: 'tradeDate',
        },
        {
          title: '地址',
          key: 'securityCode',
        },
        {
          title: '地址1',
          key: 'securityName',
          ellipsis:true,
        },
        {
          title: '地址2',
          key: 'securityId',
        },
        {
          title: '地址3',
          key: 'tradeDir',
        },
        {
          title: '地址4',
          key: 'tradeSubtype',
        },
        {
          title: '地址5',
          key: 'marketNo',
        },
        {
          title: '地址6',
          key: 'tradeQuantity',
        }
    ]
    // this.columnsBig1.push({
    //   title: '地址6',
    //   key: 'tradeQuantity',
    // })
  }
}
</script>
<style type="text/css">
.h-ui-security_code{
  color: #ff6600;
}
.h-table td {
  transition: none;
}
.h-table th, .h-table td {
  height: 30px !important;
}
.h-table .demo-table-info-row td{
  background-color: #2db7f5 !important;
  color: #fff;
}
.h-table .demo-table-error-row td{
  background-color: #ff6600!important;
  color: #fff;
}
.h-table td.demo-table-info-column{
  background-color: #2db7f5!important;
  color: #fff;
}
.h-table .demo-table-info-cell-name {
  background-color: #2db7f5!important;
  color: #fff;
}
.h-table .demo-table-info-cell-age {
  background-color: #ff6600!important;
  color: #fff;
}
.h-table .demo-table-info-cell-address {
  background-color: #187!important;
  color: #fff;
}
.h-table-title, .h-table-footer{
  background-color: #7eb8f1;
  text-align: center;
}
</style>