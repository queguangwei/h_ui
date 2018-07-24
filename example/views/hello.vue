<template>
<div>
   <h-table :height="tableHeight" :stripe="true" :columns="columns18" :data="data17" border size="small" ref="table">
        <span slot="header">证券日活数据表</span>
        <span slot="footer">恒生电子有限公司提供</span>
    </h-table>
</div>
</template>
<script>
  export default {
    data () {
      return {
        columns18: [
         {
             type: "selection",
             width: 60,
             align: "center",
         },
         {
             title: "名称",
             key: "name",
             align: "center",
             width: 100,
             hiddenCol:true,
         },
         {
             title: "展示",
             key: "show",
             width: 200,
             align: "center",
             sortable: true,
             filters: [
               {
                   label: '大于4000',
                   value: 1
               },
               {
                   label: '小于4000',
                   value: 2
               }
             ],
             filterMultiple: false,
             filterMethod (value, row) {
                 if (value === 1) {
                     return row.show > 4000;
                 } else if (value === 2) {
                     return row.show < 4000;
                 }
             }
         },
         {
             title: "唤醒",
             key: "weak",
             width: 150,
             sortable: true,
             filters: [
               {
                   label: '大于4000',
                   value: 1
               },
               {
                   label: '小于4000',
                   value: 2
               }
             ],
             filterMultiple: false,
             filterMethod (value, row) {
                 if (value === 1) {
                     return row.weak > 4000;
                 } else if (value === 2) {
                     return row.weak < 4000;
                 }
             }
         },
         {
             title: "登录",
             key: "signin",
             width: 150,
             sortable: true
         },
         {
             title: "点击",
             key: "click",
             width: 150,
             sortable: true
         },
         {
             title: "激活",
             key: "active",
             width: 150,
             sortable: true
         },
         {
             title: "7日留存",
             key: "day7",
             width: 150,
             sortable: true
         },
         {
             title: "30日留存",
             key: "day30",
             width: 150,
             sortable: true
         },
         {
             title: "次日留存",
             key: "tomorrow",
             width: 150,
             sortable: true
         },
         {
             title: "日活跃",
             key: "day",
             width: 150,
             sortable: true
         },
         {
             title: "周活跃",
             key: "week",
             width: 150,
             fixed: "right",
             sortable: true,
         },
         {
             title: "月活跃",
             key: "month",
             fixed: "right",
             width: 150,             
             sortable: true,
             filters: [
               {
                   label: '大于4000',
                   value: 1
               },
               {
                   label: '小于4000',
                   value: 2
               }
             ],
             filterMultiple: false,
             filterMethod (value, row) {
                 if (value === 1) {
                     return row.month > 4000;
                 } else if (value === 2) {
                     return row.month < 4000;
                 }
             }
         }
        ],
        data17: [
          {
            "name": "推广名称1",
            "fav": 0,
            "show": 7302,
            "weak": 5627,
            "signin": 1563,
            "click": 4254,
            "active": 1438,
            "day7": 274,
            "day30": 285,
            "tomorrow": 1727,
            "day": 558,
            "week": 4440,
            "month": 5610
          },
          {
              "name": "推广名称2",
              "fav": 0,
              "show": 4720,
              "weak": 4086,
              "signin": 3792,
              "click": 8690,
              "active": 8470,
              "day7": 8172,
              "day30": 5197,
              "tomorrow": 1684,
              "day": 2593,
              "week": 2507,
              "month": 1537
          },
          {
              "name": "推广名称3",
              "fav": 0,
              "show": 7181,
              "weak": 8007,
              "signin": 8477,
              "click": 1879,
              "active": 16,
              "day7": 2249,
              "day30": 3450,
              "tomorrow": 377,
              "day": 1561,
              "week": 3219,
              "month": 1588
          },
          {
              "name": "推广名称4",
              "fav": 0,
              "show": 9911,
              "weak": 8976,
              "signin": 8807,
              "click": 8050,
              "active": 7668,
              "day7": 1547,
              "day30": 2357,
              "tomorrow": 7278,
              "day": 5309,
              "week": 1655,
              "month": 9043
          },
          {
              "name": "推广名称5",
              "fav": 0,
              "show": 934,
              "weak": 1394,
              "signin": 6463,
              "click": 5278,
              "active": 9256,
              "day7": 209,
              "day30": 3563,
              "tomorrow": 8285,
              "day": 1230,
              "week": 4840,
              "month": 9908
          },
          {
              "name": "推广名称6",
              "fav": 0,
              "show": 6856,
              "weak": 1608,
              "signin": 457,
              "click": 4949,
              "active": 2909,
              "day7": 4525,
              "day30": 6171,
              "tomorrow": 1920,
              "day": 1966,
              "week": 904,
              "month": 6851
          },
          {
              "name": "推广名称7",
              "fav": 0,
              "show": 5107,
              "weak": 6407,
              "signin": 4166,
              "click": 7970,
              "active": 1002,
              "day7": 8701,
              "day30": 9040,
              "tomorrow": 7632,
              "day": 4061,
              "week": 4359,
              "month": 3676
          },
          // {
          //     "name": "推广名称8",
          //     "fav": 0,
          //     "show": 862,
          //     "weak": 6520,
          //     "signin": 6696,
          //     "click": 3209,
          //     "active": 6801,
          //     "day7": 6364,
          //     "day30": 6850,
          //     "tomorrow": 9408,
          //     "day": 2481,
          //     "week": 1479,
          //     "month": 2346
          // },
          // {
          //     "name": "推广名称9",
          //     "fav": 0,
          //     "show": 567,
          //     "weak": 5859,
          //     "signin": 128,
          //     "click": 6593,
          //     "active": 1971,
          //     "day7": 7596,
          //     "day30": 3546,
          //     "tomorrow": 6641,
          //     "day": 1611,
          //     "week": 5534,
          //     "month": 3190
          // },
          // {
          //     "name": "推广名称10",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称11",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称12",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称13",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称14",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称15",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称16",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称17",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称18",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称19",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
          // {
          //     "name": "推广名称20",
          //     "fav": 0,
          //     "show": 3651,
          //     "weak": 1819,
          //     "signin": 4595,
          //     "click": 7499,
          //     "active": 7405,
          //     "day7": 8710,
          //     "day30": 5518,
          //     "tomorrow": 428,
          //     "day": 9768,
          //     "week": 2864,
          //     "month": 5811
          // },
        ],
        tableHeight:0,
      }
    },
    methods: {
      setTableHeight() {
        this.$nextTick(()=>{
          this.tableHeight = document.querySelector('#app').clientHeight-100;
        })
      }
    },
    mounted(){
      this.setTableHeight();
      var timer;
      window.addEventListener(
        'resize',
        () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.setTableHeight()
          })
        },
        100
      )
    }
  }
</script>

<!-- <template>
  <div>
    <h-form ref="formItem1" :model="formItem1" :label-width="80" errorFocus cols="2">
      <h-form-item label="输入框" prop="input" required>
        <h-input v-model="formItem1.input" placeholder="请输入"></h-input>
      </h-form-item>
      <h-form-item label="日期控件">
        <h-datePicker type="date" placeholder="选择日期" v-model="formItem1.date"></h-datePicker>
      </h-form-item>
      <h-form-item label="选择器" prop="select" required>
        <h-select v-model="formItem1.select" filterable>
          <h-option value="beijing">北京市</h-option>
          <h-option value="shanghai">上海市</h-option>
          <h-option value="shenzhen">深圳市</h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="金额框" prop="money" required>
        <h-typefield v-model="formItem1.money">
          <h-select v-model="select2" placeholder="" slot="append" style="width: 45px" :isArrow="false" :clearable="false" :tranfer="true">
          <h-option value="com">.com</h-option>
          <h-option value="org">.org</h-option>
          <h-option value="io">.io</h-option>
        </h-select>
        </h-typefield>
      </h-form-item>
      <h-form-item label="单选框" prop="radio" required>
        <h-radio-group v-model="formItem1.radio">
          <h-radio label="male">男</h-radio>
          <h-radio label="female">女</h-radio>
        </h-radio-group>
      </h-form-item>
      <h-form-item label="多选框" prop="checkbox" required>
        <h-checkbox-group v-model="formItem1.checkbox">
            <h-checkbox label="吃饭"></h-checkbox>
            <h-checkbox label="睡觉"></h-checkbox>
            <h-checkbox label="跑步"></h-checkbox>
            <h-checkbox label="看电影"></h-checkbox>
        </h-checkbox-group>
      </h-form-item>
      <h-form-item label="下拉表" prop='slider' required>
        <h-select-table v-model="formItem1.slider" >
          <h-table-option border :columns="columns1" :data="data1"></h-table-option>
        </h-select-table>
      </h-form-item>
      <h-form-item label="下拉树" prop='tree' required>
        <h-select-tree v-model="formItem1.tree" :first-value="firstValc" style="width:200px" :data="baseData1" placement="top" placeholder="你好"></h-select-tree>
      </h-form-item>
      <h-form-item label="文本域" prop="cascader" required>
        <h-cascader v-model="formItem1.cascader" :data="data2" trigger="hover" style="width:200px"></h-cascader>
      </h-form-item>
      <h-form-item label="文本域" prop="textarea" required>
        <h-input v-model="formItem1.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></h-input>
      </h-form-item>
      <h-form-item>
          <h-button type="primary" @click="handleSubmit('formItem1')">提交</h-button>
          <h-button type="ghost" style="margin-left: 8px" @click="handleReset('formItem1')">取消</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
import { on, off } from '../../src/util/dom.js';
import {typeOf } from '../../src/util/tools.js';
function findCurNode(obj) {
  while(obj.parentElement.className.indexOf('h-form-item-content')==-1){
    obj = obj.parentNode;
  }
  return obj
}
function getNextElement(ele,field) {
    var curNode =findCurNode(field);
    curNode.__vue__.blur();
    var form = ele;
    var nodes = form.children;
    var index = 0;
    for(var i=0;i<nodes.length;i++){
      if (nodes[i].children&&curNode == nodes[i].children[1].children[0]){
        index = i+1;
        break;
      }
    }
    while(nodes[index].children[1].children[0].classList.value.indexOf('h-radio')!=-1 || nodes[index].children[1].children[0].classList.value.indexOf('h-checkbox')!=-1){
      index = index+1;
    }
    if (index == 0) return;
    return nodes[index].children[1].children[0];
}  
function enterHandler(ele,evt) {
  var isie = (document.all) ? true : false;
  var key;
  var srcobj;
  if (isie) {
      key = event.keyCode;
      srcobj=event.srcElement;
  }
  else {
      key = evt.which;
      srcobj=evt.target;
  } 
  if(key==13 && srcobj.type!='button' && srcobj.type!='submit' &&srcobj.type!='reset' && srcobj.type!='textarea' && srcobj.type!='') {
    if(isie)
      event.keyCode=9;
    else {
      var el=getNextElement(ele,evt.target);
      if(!el)
        return false;
      else
        el.__vue__.focus();
    }
  }
}
  export default {
    data () {
      return {
        phone:0,
        lists:[{data_value:'男'},{data_value:'女'}],
        model1:'',
        changeform:false,
        formItem1: {
          input: '1',
          select: [],
          radio: '',
          money: '',
          checkbox: [],
          fatdate: '',
          date: '',
          time: '',
          slider: '',
          tree:'',
          textarea: '',
          cascader:[]
        },
        data2: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
          }, 
          {
            value: 'jiangsu',
            label: '江苏',
            children: [
              {
                value: 'nanjing',
                label: '南京',
                children: [
                  {
                      value: 'fuzimiao',
                      label: '夫子庙',
                  }
                ]
              },
              {
                value: 'suzhou',
                label: '苏州',
                children: [
                  {
                    value: 'zhuozhengyuan',
                    label: '拙政园',
                  },
                  {
                    value: 'shizilin',
                    label: '狮子林',
                  }
                ]
              }
            ],
          }
        ],
        formValid: {
          user: '你好',
          stringInput:'',
          password: '',
          test1: '',
          test2: ''
        },
        select1:'',
        select2:'',
        stringRule:['email'],
        regRule: [{test:/^[a-zA-Z]+$/, message:'不全是字母',trigger:'blur'}],
        columns1: [
          {
            title: '姓名',
            key: 'name',
            ellipsis: true
          },
          {
            title: '年龄',
            key: 'age',
            hiddenCol:true
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data1:[
          {
            name: '王小明',
            age: 18,
            address: '北京市朝阳区芍药居'
            // _highlight: true//默认选择当前项
          },
          {
            name: '张小刚',
            age: 25,
            address: '北京市海淀区西二旗'
          },
          {
            name: '李小红',
            age: 30,
            address: '上海市浦东新区世纪大道'
          },
          {
            name: '周小伟',
            age: 26,
            address: '深圳市南山区深南大道'
          },
        ],
        baseData1: [
          {
            title: 'parent',
            id: '1-0',
            children: [
              {
                title: 'child1',
                id: '1-1',
                children: [
                  {
                    title: 'child1-1-1',
                    id: '1-1-1'
                  },
                  {
                    title: 'child1-1-2',
                    id: '1-1-2'
                  }
                ]
              },
              {
                title: 'child2',
                id: '1-2',
                children: []
              }
            ]
          }
        ],
        firstValc: 'parent',
      }
    },
    methods: {
      changeform1(){
        this.changeform = !this.changeform;
      },
      handleSubmit (name) {
        let _this=this
        this.$refs[name].validate((valid) => {
            if (valid) {
              _this.$hMessage.success('提交成功!');
            } else {
              _this.$hMessage.error('表单验证失败!');
            }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      totest() {
        this.$refs.changeDrop.focus();
      },
      thandler(evt) {
        enterHandler(this.$refs.formItem1.$el,evt);
      }
    },
    mounted(){
      this.$nextTick(()=>{
        on(this.$refs.formItem1.$el,'keydown',this.thandler)
      })
    },
    beforeDestroy(){
      off(this.$refs.formItem1.$el,'keydown',this.thandler);
    }
  }
</script>
 -->