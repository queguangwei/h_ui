<template>
  <div>
    <!-- <h-msg-box v-model="changeform" width="900" escClose left="10" closeDrop> -->
    <!-- <Button @on-click="changeSelect"></Button> -->
    <!-- </h-msg-box> -->
    <!-- {{valll}} -->
    <Hello :column="test"></Hello>
  </div>
</template>
<script>
import Hello from './hello.vue'
import {enterHandler} from '../../src/util/tools.js'
let bigData = [];
for(let i=0;i<60;i++){
  let obj={};
  obj.value="value"+i;
  obj.label="label"+i;
  bigData.push(obj);
}
export default {
  components:{Hello},
  data () {
    return {
      valll:'',
      test:[
        {
          type:'index',
          key:'index'
        },
        {
          title: '姓名',
          key: 'fundId',
          width:200,
          sortable:true,
        },
        {
          title: '年龄',
          key: 'tradeDate',
          sortable:true,
        },
        {
          title: '地址',
          ellipsis:true,
          key: 'securityCode',
        },
      ],
      columns123:[
        {
          type:'selection',
          title:'我是序号',
          fixed:'left'
        },
        {
            title: '姓名',
            key: 'name',
            fixed:'right',
        },
        {
            title: '年龄',
            key: 'age',
            width:200
        },
        {
            title: '地址',
            key: 'address',
            width:200
        },
        {
            title: '姓名',
            key: 'name',
            width:200
        },
        {
            title: '年龄',
            key: 'age'
        }
      ],
      isrequired:true,
      phone:0,
      typeValue:'',
      data123: [
                  {
                      name: '王小明',
                      age: 18,
                      address: '北京市朝阳区芍药居',
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
                  }
              ],
      lists:[{data_value:'男'},{data_value:'女'}],
      model1:'',
      changeform:false,
      formItem1: {
        input: '1',
        select: '',
        select1: [],
        select2: '',
        radio: '',
        money: '',
        moneyrange:'',
        checkbox: [],
        fatdate: '',
        date: '',
        time: '',
        slider: '',
        tree:'',
        textarea: '',
        cascader:[],
        simpleSelect:[],
        simpleSelect1:'value1',
      },
      formItem2:{
        input: '1',
        select: '',
        radio: '',
        money: '1244',
        moneyrange:'',
        checkbox: [],
        fatdate: '',
        date: '',
        time: '',
        slider: '',
        tree:'',
        textarea: '',
        select1: ['1','2'],
        select2: '',
        cascader:[],
        simpleSelect:["value1"],
        simpleSelect1:"value2",
      },
      bigData:[],
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
      cy: {
        value1: '',
        value2: '',
        options1: [
          {
            value: '1',
            label: '&nbsp;<a herf="www.google.com"></a><script><\/script>'
          },
          {
            value: '2',
            label: '从前有座山山上有座庙庙里有个老和尚和一个小和尚'
          },
          {
            value: '3',
            label: '水缸'
          },
          {
            value: '4',
            label: '扁担儿'
          }
        ]
      }
    }
  },
  methods: {
    changeSelect(){
      this.formItem2 = {
        input: '1',
        select: '',
        radio: '',
        money: '1244',
        moneyrange:'',
        checkbox: [],
        fatdate: '',
        date: '',
        time: '',
        slider: '',
        tree:'',
        textarea: '',
        select1: ['1','2'],
        select2: '',
        simpleSelect:["value1"],
        simpleSelect1:"value1",
      }
    },
    changeClick(data,lastdata,inx){
      console.log(data)
      console.log(lastdata)
      console.log(inx)
    },
    changeRequired(){
      this.isrequired=!this.isrequired;
    },
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
    getFocus(){
      this.$refs.formValid.firstNodeFocused();
    },
    getFocus2(){
      this.$refs.formItem1.firstNodeFocused();
    }
  },
  mounted () {
    this.formItem1={
        input: '1',
        select: '',
        select1: [],
        select2: '',
        radio: '',
        money: '',
        moneyrange:'',
        checkbox: [],
        fatdate: '',
        date: '',
        time: '',
        slider: '',
        tree:'',
        textarea: '',
        cascader:[],
        simpleSelect:[],
        simpleSelect1:'value1',
    }
    this.bigData = bigData;
    document.addEventListener('keyup',(event)=>{
      enterHandler(this.$refs.formItem1.$el,event)
    })
  }
}
</script>

<!-- <template>
<div> -->
<!--   <h-edit-gird :columns="columns4" :data="data1" @on-select-all="allSelect" @on-select="select" :rowSelect="true" @on-selection-change="selsetChange" height="200" ref="table1">
  </h-edit-gird> -->
<!--   <h-table :columns="columns3" :data="data2" border></h-table>
  <Button @click = "click">获取数据</Button> -->
<!-- </div>
</template>
<script>
var tData= [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          money: '120.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-01-09T16:00:00.000Z',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          money: '130.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-01-09T16:00:00.000Z',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          money: '140.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-01-09T16:00:00.000Z',
          timing:'16:00:00.00',
          tree:'leaf1'
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          money: '150.00',
          cardId: '6223 5678 1234 5678',
          city: '北京',
          dating:'2018-01-09T16:00:00.000Z',
          timing:'16:00:00.00',
          tree:'leaf1'
        }
  ];
  export default {
    data () {
      return {
        columns4: [
            {
              type: 'selection',
              width: 60,
              align: 'center',
            },
            {
              type: 'text',
              title: '姓名',
              key: 'name',
              width: 200
            },
            {
              type: 'text',
              title: '年龄',
              width: 200,
              key: 'age',
            },
            {
              type: 'textArea',
              rows: 2,
              width: 200,
              title: '地址',
              key: 'address',
            },
            {
              type: 'money',
              title: '金额',
              width: 200,
              integerNum: 3,
              suffixNum: 2,
              bigTips: true,
              key: 'money',
            },
            {
              type: 'card',
              title: '卡号',
              width: 200,
              key: 'cardId',
            },
            {
              type: 'select',
              title: '地区',
              width: 200,
              key: 'city',
              multiple:false,
              option: [
                  {value:"北京"},
                  {value:"上海"},
                  {value:"天津"},
                  {value:"沈阳"},
                  {value:"杭州"},
                  {value:"武汉"},
              ],
            },
            {
              type: 'date',
              title: '日期',
              width: 200,
              key: 'dating',
              dateType:'date',
              editable:false,
              format: 'yyyy-MM-dd'
            },
            {
              type: 'time',
              title: '时间',
              width: 200,
              key: 'timing',
              dateType:'time',
              format: 'HH:mm:ss',
              steps: [],
            },
            {
              type: 'selectTree',
              title: '下拉树',
              width: 200,
              key: 'tree',
              treeData:[{
                expand: true,
                title: 'parent 1',
                children: [{
                  title: 'parent 1-0',
                  expand: true,
                  children: [{
                    title: 'leaf1',
                    disableCheckbox: true
                  }, {
                    title: 'leaf2',
                  }]
                }, {
                  title: 'parent 1-1',
                  expand: true,
                  checked: true,
                  children: [{
                    title: 'leaf3',
                  }]
                }]
              }],
              showCheckbox: false,
              checkStrictly: false,
            }
        ],
        data1: tData,
        columns3: [
          {key:"fund_account",title:"资金账号"},
          {key:"mobile_tel",title:"手机号"},
          {key:"trade_times",title:"交易天数"},
          {key:"business_amount",title:"交易量"},
          {key:"income_ratio",title:"收益率"},
          {key:"open_amount",title:"开仓数量"},
          {key:"drop_amount",title:"平仓数量"},
          {key:"buy_right_amount",title:"认购权利仓"},
          {key:"buy_duty_amount",title:"认购义务仓"},
          {key:"buy_duty_cover_amount",title:"认购备兑义务仓"},
          {key:"sell_right_amount",title:"认沽权利仓"},
          {key:"sell_duty_amount",title:"认沽义务仓"},
          {key:"fare0",title:"佣金"},
          {key:"sharp_30",title:"近30天夏普比率"},
          {key:"sharp_120",title:"近120天夏普比率"},
          {key:"sharp_360",title:"近360天夏普比率"},
          {key:"drawdown_30",title:"近30天最大回撤率"},
          {key:"drawdown_120",title:"近120天最大回撤率"},
          {key:"drawdown_360",title:"近360天最大回撤率"}
        ],
        data2:[
          {fund_account:'1',mobile_tel:'1'}
        ],
      }
    },
    methods: {
      click(){
        console.log(this.$refs.table1.cloneData);
      },
      allSelect (allSelection){
        console.log("allSelect");
        console.log(allSelection);
      },
      select (selection,row){//已选择的项和刚刚选择的项
       console.log("已选择的项和刚刚选择的项");
        console.log(selection);
        console.log(row);
      },
      selsetChange (selection){//选项发生变化时触发已选择的项
     console.log("选项发生变化时触发已选择的项");
        console.log(selection);
      },
    }
  }
</script>
 -->


<!-- <template>
  <div class="wrapper">
    <h2>hUI</h2>
    <p>h_ui是由恒生电子研发中心推出的一套专用于服务金融IT的UI基础组件库</p>
    <h1>datagird示例2</h1>
    <h-table border :columns="columns" :data="data"></h-table>
    <h-page></h-page>
  </div>
</template>

<script>
var data = [
  {
    name: '王小明',
    age: 18,
    address: '北京市朝阳区芍药居'
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
  }
];
export default {
  name: 'home',
  data() {
    return {
      msg:'this is home component',
      data:data,
      columns:[
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('h-icon', {
                props: {
                  name: 'addressbook'
                }
              }),
              h('strong', params.row.name)
            ]);
          }
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '邮箱',
          key: 'mail'
        },
        {
          title: '电话',
          key: 'phone'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('h-dropdown',
                {
                  props: {
                    trigger: 'click'
                  },
                  on:{
                    'on-click':(v)=>{
                      this.show(v,params.index)
                    }
                  },
                  nativeOn: {
                    click: () => {
                      // alert(1);
                    }
                  }
                },
                [
                  h('h-button',
                    {
                      props: {
                        type: 'primary',
                      },
                      on:{
                        cilck:()=>{
                          alert(1);
                        }
                      }
                    },
                    [
                      '操作',
                      h('h-icon', {
                        props: {
                          name: 'arrowdownb'
                        }
                      })
                    ]
                  ),
                  h('h-dropdown-menu',
                    {
                      slot: 'list'
                    },
                    [
                      h('h-dropdown-item', {
                        props: {
                          name: 'delete'
                        }
                      }, '删除'),
                      h('h-dropdown-item', {
                        props: {
                          name: 'revise'
                        }
                      }, '修改'),
                      h('h-dropdown-item', {
                        props: {
                          name: 'search'
                        }
                      }, '查看')
                    ]
                  ),
                ]
              )
            ]);
          }
        }
      ]
    }
  },
  methods:{
    show (v,index) {
      if (v=='delete') {
        this.data.splice(index, 1);
      }else if(v=='search'){
        this.$hMsgBox.info({
          title: '用户信息',
          content: `姓名：${this.data[index].name}<br>年龄：${this.data[index].age}<br>地址：${this.data[index].address}`
        });
      }else{
        this.$hMsgBox.info({
          title: '用户信息',
          content: '你点击了修改操作'
        });
      }

    }
  }
}
</script>
<style lang='scss' scoped>
</style> -->
