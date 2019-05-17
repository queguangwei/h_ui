<template>
  <div>
    <h-select
      filterable
      v-model="curItemLevel"
      :clearable='false'
      setDefSelect
      ref="select1"
      style="width:100px"
      @on-change="changeItemLevel">
      <h-option
        v-for="(item) in itemLevelList"
        :value="item['val']"
        :key="item['val']">{{ item['caption'] }}
      </h-option>
    </h-select>
    <h-button type="primary" @click="changeDict">切换下拉框数据</h-button>
    <h-button type="primary" @click="selectSecondOne">选中第二项</h-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curItemLevel: "1",
      itemLevelList: [],
      data1: [{val: "1", caption: "Dict1_11" }, {val: "2", caption: "Dict1_222" },],
      data2: [{val: "1", caption: "Dict1_11" }, {val: "2", caption: "Dict1_222" }, {val: "3", caption: "Dict1_333" },]
    }
  },
  methods:{
    changeDict() {
      if (this.itemLevelList == this.data1) {
        this.itemLevelList = this.data2
      } else {
        this.itemLevelList = this.data1
      }
    },
    selectSecondOne() {
      this.curItemLevel = "2"
    },
    changeItemLevel() {}
  },
  created() {
    this.itemLevelList = this.data1;
  }
}
</script>
<!--<template>
<div>
 <h-button type="primary" @click="ttt">Toggle</h-button>
    <h-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" closeRuleChangeValidate>
        <h-form-item label="姓名" prop="name">
            <h-input v-model="formValidate.name" placeholder="请输入姓名"></h-input>
        </h-form-item>
        <h-form-item label="邮箱" prop="mail">
            <h-input v-model="formValidate.mail" placeholder="请输入邮箱"></h-input>
        </h-form-item> 
        <h-form-item label="城市" prop="city">
            <h-select v-model="formValidate.city" placeholder="请选择所在地">
                <h-option value="beijing">北京市</h-option>
                <h-option value="shanghai">上海市</h-option>
                <h-option value="shenzhen">深圳市</h-option>
            </h-select>
        </h-form-item>
        <h-form-item label="选择日期">
            <h-row>
                <h-col span="11">
                    <h-form-item prop="date">
                        <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></h-date-picker>
                    </h-form-item>
                </h-col>
                <h-col span="2" style="text-align: center">-</h-col>
                <h-col span="11">
                    <h-form-item prop="time">
                        <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></h-time-picker>
                    </h-form-item>
                </h-col>
            </h-row>
        </h-form-item>
        <h-form-item label="性别" prop="gender">
            <h-radio-group v-model="formValidate.gender">
                <h-radio label="male">男</h-radio>
                <h-radio label="female">女</h-radio>
            </h-radio-group>
        </h-form-item>
        <h-form-item label="爱好" prop="interest">
            <h-checkbox-group v-model="formValidate.interest">
                <h-checkbox label="吃饭"></h-checkbox>
                <h-checkbox label="睡觉"></h-checkbox>
                <h-checkbox label="跑步"></h-checkbox>
                <h-checkbox label="看电影"></h-checkbox>
            </h-checkbox-group>
        </h-form-item>
        <h-form-item label="介绍" prop="desc">
            <h-input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></h-input>
        </h-form-item>
        <h-form-item>
            <h-button type="primary" @click="handleSubmit('formValidate')">提交</h-button>
            <h-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</h-button>
        </h-form-item>
    </h-form>
</div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate111: {
                    name: [
                        { required: false, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: false, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: false, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: false, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: false, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: false, message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: false, message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: false, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                        { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入个人介绍', trigger: 'blur' },
                        { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ttt(){
                this.ruleValidate=this.ruleValidate111;
                console.log(this.ruleValidate);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$hMessage.success('提交成功!');
                    } else {
                        this.$hMessage.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
-->
<!--<template>
<div>
    <h-button @click="change">改变列隐藏</h-button>
    <h-table :columns="columns1" :data="data1" notSetWidth autoHeadWidth></h-table>
</div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '姓名1111111111111111111',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        hiddenCol: false,
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: '王小明1111111111111111111111111111111111111111111111111',
                        age: 18,
                        address: '北京市朝阳区芍药居11111111111111111111111111111111111111111111'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗',
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
                ]
            }
        },
        methods:{
            change(){
                this.$set(this.columns1[1],'hiddenCol',true)
            }
        }
    }
</script>
-->
<!--<template>
  <div>
    <h-select v-model="model9" style="width:200px" >
     <h-option v-for="item2 in realData" :value="item2.value" :key="item2.value" >
            <span>{{item2.text}}</span>
            <span style="float:right;color:#ccc">{{item2.value}}</span>
      </h-option>
    </h-select>
    <Button @click="tt">赋值</Button>
    {{model9}}
  </div>
</template>
<script>
    export default {
        data () {
            return {
              realData:[{"value":'1',"text":"境外"},{"value":'0',"text":"境内"}],
              model9: ""
            }
        },
        methods:{
        tt(){
        this.model9="3";
        }
        }
    }
</script>
-->
<!--<template>
<div>
  <h-msg-box v-model="changeform" width="900" escClose left="10" > 
    <h-simple-table :columns="columns1" :data="data1"></h-simple-table>
  </h-msg-box>
  <Button @on-click="changeform1">显示隐藏</Button>
</div>
</template>
<script>
import Ceshi from './ceshi.vue'
  export default {
    components:{Ceshi},
    data () {
      return {
        columns1: [
            {
                title: '姓名',
                key: 'name',
                render: (h, params) => {
                  return h(Ceshi)
                }
            },
            {
                title: '年龄',
                key: 'age'
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        data1: [
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
        ],
        changeform:false
      }
    },
    methods:{
      changeform1(){
        this.changeform = !this.changeform;
      },
    },
  }
</script>
-->
<!--<template>
<div>
    <h-table :columns="columns8" :data="data7" size="small" ref="table" :multiLevel="multiLevel"></h-table>
    <br>
    <h-button type="primary" size="large" @click="exportData(1)"><h-icon type="ios-download-outline"></h-icon> 导出原始数据</h-button>
    <h-button type="primary" size="large" @click="exportData(2)"><h-icon type="ios-download-outline"></h-icon> 导出排序和过滤后的数据</h-button>
    <h-button type="primary" size="large" @click="exportData(3)"><h-icon type="ios-download-outline"></h-icon> 导出自定义数据</h-button>
</div>
</template>
<script>
    export default {
        data () {
            return {
              multiLevel:[
                [
                  {'title':'123','cols':2},
                  {'title':'456','cols':3},
                  {'title':'789','cols':2},
                ],
                [
                  {'title':'123','cols':2},
                  {'title':'456','cols':3},
                  {'title':'789','cols':2},
                ]
              ],
              columns8: [
                  {
                      "title": "名称",
                      "key": "name",
                      "fixed": "left",
                      "width": 200,
                      exportRender: (cellData) => {
                          return 'render之后的值<br>换行'
                      }

                  },
                  {
                      "title": "展示",
                      "key": "show",
                      "width": 150,
                      "sortable": true,
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
                      "title": "唤醒",
                      "key": "weak",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "登录",
                      "key": "signin",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "点击",
                      "key": "click",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "激活",
                      "key": "active",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "7日留存",
                      "key": "day7",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "30日留存",
                      "key": "day30",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "次日留存",
                      "key": "tomorrow",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "日活跃",
                      "key": "day",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "周活跃",
                      "key": "week",
                      "width": 150,
                      "sortable": true
                  },
                  {
                      "title": "月活跃",
                      "key": "month",
                      "width": 150,
                      "sortable": true
                  }
              ],
              data7: [
                  {
                      "name": "推广名称1",
                      "fav": 0,
                      "show1": '0007302<br>000345',
                      "weak": 'testtesttest<br>wewerwerwerer',
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
                  {
                      "name": "推广名称8",
                      "fav": 0,
                      "show": 862,
                      "weak": 6520,
                      "signin": 6696,
                      "click": 3209,
                      "active": 6801,
                      "day7": 6364,
                      "day30": 6850,
                      "tomorrow": 9408,
                      "day": 2481,
                      "week": 1479,
                      "month": 2346
                  },
                  {
                      "name": "推广名称9",
                      "fav": 0,
                      "show": 567,
                      "weak": 5859,
                      "signin": 128,
                      "click": 6593,
                      "active": 1971,
                      "day7": 7596,
                      "day30": 3546,
                      "tomorrow": 6641,
                      "day": 1611,
                      "week": 5534,
                      "month": 3190
                  },
                  {
                      "name": "推广名称10",
                      "fav": 0,
                      "show": 3651,
                      "weak": 1819,
                      "signin": 4595,
                      "click": 7499,
                      "active": 7405,
                      "day7": 8710,
                      "day30": 5518,
                      "tomorrow": 428,
                      "day": 9768,
                      "week": 2864,
                      "month": 5811
                  }
              ]
            }
        },
        methods: {
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: '原始数据'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: '自定义数据',
                        columns: this.multiLevel[0],
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            }        
        }
    }
</script>
-->
<!--<template>
<div>
    <h-simple-table :columns="columnsBig" canMove @onMove="test111" 
      :data="bigData" border stripe headAlgin="right" 
      bodyAlgin="left" height="500" rowSelect 
      @on-select="select" @on-select-cancel="select"  
      @on-select-all='change' 
      @on-selection-change="change"></h-simple-table>
</div>
</template>
<script>
let jsonData=[];
let tData =require('../assets/aa.json'); 
for (let i = 0; i < 2; i++) {
      jsonData = jsonData.concat(tData);
    }
    export default {
        data () {
            return {
                columnsBig: [
                 {
                  title:'测试',
                  key:'ceshi',
                  algin:'center',
                 }
                ],
                bigData:jsonData,
            }
        },
        methods: {
        test111(a,b){
        console.log(a);
         console.log(b);
        },
            select (selection,row){//已选择的项和刚刚选择的项
             console.log(selection);
             console.log(row);
            },
            change(e){
              console.log(e);
            },
        },
        mounted (){
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
        }
    }
</script>
-->
<!--<template>
<div>
    <h-simple-table :columns="columnsBig" 
     :row-class-name="rowClassName"  
      :data="bigData" border :stripe=false headAlgin="center"  bodyAlgin="center"  
  :canDrag=false :disabled-hover=true :highlight-row=false
      @on-drag="select" 
      @on-selection-change="change" ref="transferTable"></h-simple-table>
 <h-button type="ghost" size="small" @click="reloadMockData">获取</h-button>
  </div>
</template>
<script>
let jsonData=[];
let tData =require('../assets/aa.json'); 
for (let i = 0; i < 2; i++) {
      jsonData = jsonData.concat(tData);
    }
    export default {
        data () {
            return {
                columnsBig: [
                 {
                  title:'测试',
                  key:'ceshi',
                  algin:'center',
                 }
                ],
                bigData:jsonData,
            }
        },
        methods: {
     rowClassName (row, index) {
              if (index === 1) {
                return 'demo-table-info-row';
              } else if (index === 3) {
                return 'demo-table-error-row';
              }
              return '';
            },
    reloadMockData () {
                console.log(this.$refs.transferTable. getSelection());
            },
            select (selection,index){
             console.log(selection);
            },
selectcancel(selection,row){//已选择的项和刚刚选择的项
             console.log(selection);
             console.log(row);
            },
            change(e){
console.log("change事件触发");
              console.log(e);
            },
selectall(e){
              console.log(e);
            },
        },
        mounted (){
            this.columnsBig=[
                { 
                  type: 'index',
                  align: 'center',
                  key:'index'
                },
                {
                  title: '姓名',
                  key: 'fundId',
                  align: 'center',
                  renderHeader:(h,params)=>{
                    return h('h-icon', {
                        props: {
                          name: 'add'
                        }
                      })
                  },
                  render:(h, params)=>{
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
                  key: 'tradeDate',
                  className: 'demo-table-info-column'
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
        }
    }
</script>
<style>
.demo-table-info-row{
  color: red
}
</style>
-->
<!--<template>
<div>
  <h-checkbox-group v-model="formGroup">
    {{formGroup}}
      <div v-for="(item1,inx) in rightItemLIst" :key="inx">
         <h-checkbox :label="'item1'+inx"></h-checkbox>         
          <h-select v-model="formData[item1.segment_code]" @on-change="onSelectChange" multiple :isString='true'>
            <h-option v-for="item2 in item1.realData" :value="item2.value" :key="item2.value" >{{ item2.text }}</h-option>
          </h-select>
      </div>
  </h-checkbox-group>
</div>
</template>
<script>
    export default {
        data () {
            return {
                formData:{
                  selet1:'',
                  selet2:'',
                  selet3:'',
                  selet4:'',
                },
                formGroup:[],
                rightItemLIst:[
                  {segment_code:'selet1',realData:[{"value":'1',"text":"境外"},{"value":'0',"text":"境内"}]},
                  {segment_code:'selet2',realData:[{"value":'1',"text":"境外"},{"value":'0',"text":"境内"}]},
                  {segment_code:'selet3',realData:[{"value":'1',"text":"境外"},{"value":'0',"text":"境内"}]},
                  {segment_code:'selet4',realData:[{"value":'1',"text":"境外"},{"value":'0',"text":"境内"}]},
                  ]    
            }
        },
        methods:{
          onSelectChange(val){
           
          }
        }
    }
</script>
-->
<!--<template>
    <div>
        
        <h-button @click="click1">先点我</h-button>
        <h-button @click="click2">再点我</h-button>
        <h-form :model="formData" :label-width="100" ref="formMsgbox" :rules="ruleValidate"
        :showMessage='false' :errorFocus='true' class="h-modal-content">
            
            <h-form-item prop="selectName" class="formItem" label="selectName">
                
                <h-simple-select v-model="selectName" placeholder="sdsdads" ref="test">
                    <h-select-block :data="formGroup"></h-select-block>
                </h-simple-select>
            </h-form-item>
            {{selectName}}
        </h-form>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            flag:false,
            val2:"",
            formGroup:[{"value":"1","label":"1"},{"value":"2","label":"2"},{"value":"3","label":"2"},{"value":"4","label":"2"}],
            selectName:"",
            list:[{key:1,text:"xxx"},{key:2,text:"yyy"}],
            formData:{
                aaa:"",
                bbb:"",
                security_code:"",
                market_no:"",
            },
            ruleValidate:{
                aaa:[{
                    required: true,
                    message: "请输入aaa"
                }],
                bbb:[{
                    required: true,
                    message: "请输入bbb"
                }]
            }
        }
    },
    methods:{
        click(){
            this.ruleValidate.aaa[0].required = false
        },
        click1(){
            this.selectName = "1"
        },
        click2(){
            this.selectName = "5"
        },
        getSelection(selection){
            console.info(selection)
        }
    },
}
</script>
-->
<!--<template>
<div>
  <h-select-tree
      v-model="val1"
      style="width:200px"
      :data="baseData1"
      :expanLevel="expandLevel"
      :showCheckbox="true">
  </h-select-tree>   
  <h-date-picker type="daterange"></h-date-picker>
  <h-dropdown @on-click="getItem" trigger="click" placement="bottom-start" adaptParentWidth style="width:100%">
    <h-input v-model="value1"></h-input>
    <h-dropdown-menu slot="list">
        <h-dropdown-item>驴打滚</h-dropdown-item>
        <h-dropdown-item>炸酱面</h-dropdown-item>
        <h-dropdown-item disabled>豆汁儿</h-dropdown-item>
        <h-dropdown-item>冰糖葫芦</h-dropdown-item>
        <h-dropdown-item divided>北京烤鸭</h-dropdown-item>
    </h-dropdown-menu>
  </h-dropdown>
</div>
</template>
<script>
export default{
  data(){
    return {
      val1:'',
      value1:'',
      expandLevel:1,
      baseData1:
          [{
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
                          },
                      ],
                  },
                  {
                    title: 'child2',
                    id: '1-2',
                    children: [],
                  },
              ],
          },
      ],
    }
  },
  methods:{
    getItem(val){
      this.value1 = val;
    }
  },
}
</script>-->
<!--<template>
<div>
    <h-tree :data="baseData" :render="renderContent" notDeepCopy></h-tree>         
</div>
</template>
<script> 
    export default {
        data () {
            return {
                baseData: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'child 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: 'child 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ]
          }
        },  
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                  style: {
                      display: 'inline-block',
                      width: 'calc(100% - 20px)'
                  }
                }, [
                  h('span',{
                    style:{
                      display:'inline-block',
                      cursor: 'pointer'
                    },
                    on:{
                      click:(event)=>{ 
                        this.titleClick(event,data) 
                      },
                    }
                  },data.title),
                  h('input',{
                    style:{
                      display:'none'
                    },
                    'class':{
                      treeTitle:true,
                    },
                    attrs:{
                      value:data.title,
                    },
                    on:{
                      blur:(event)=>{
                        this.titleBlur(event,data)
                      }
                    }
                  }),                 
                  h('h-button', {
                      style: {
                          float:'right'
                      },
                      props: Object.assign({}, this.buttonProps, {
                          icon: 'android-remove',
                          size:'small'
                      }),
                      on: {
                          click: () => { this.remove(root, node, data) }
                      }
                  }),
                  h('h-button', {
                      props: Object.assign({}, this.buttonProps, {
                          icon: 'add',
                          size:'small'
                      }),
                      style: {
                          marginRight: '8px',
                          float:'right'
                      },
                      on: {
                          click: () => { this.append(data) }
                      }
                  }),
                ]);
            },
            titleClick(event,data){
              let obj = event.target;
              obj.style.display="none";
              obj.nextElementSibling.style.display="inline-block"
              obj.nextElementSibling.focus()
            },
            titleBlur(event,data){
               let obj = event.target;
              let title = event.target.value
              this.$set(data, 'title', title);
              obj.style.display="none";
              obj.previousElementSibling.style.display="inline-block"
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: '添加名称',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }
          }
      }
</script>
<style>
 .treeTitle{
   border: 1px solid #D7DDE4;
   border-radius: 4px;
   color: #495060;
   padding:2px 8px;
 }
</style>
-->
<!--<template>
<div>
  <h-button @click="setData">赋值</h-button>
  <h-table :columns="columns1" :data="data1" notSetWidth></h-table>
  <h-table :columns="columns1" :data="data2" border ctrSelection clickToSelect></h-table>
</div>
</template>
<script> 
    export default {
        data () {
            return {
                columns1: [
                    {
                        type: 'selection',
                        // fixed:'left',
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        // fixed:'left',
                        width:200,
                        align:'right'
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '年龄11111111111111',
                        key: 'age',
                        // width:600
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    // {
                    //     title: '地址1',
                    //     key: 'address'
                    // },
                    // {
                    //     title: '地址2',
                    //     key: 'address'
                    // },
                    // {
                    //     title: '地址3',
                    //     key: 'address'
                    // },
                    // {
                    //     title: '地址4',
                    //     key: 'address'
                    // },
                    // {
                    //     title: '地址5',
                    //     key: 'address'
                    // },
                ],
                data2:[],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居北京市'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        address: '北京市海淀区西二旗北京市朝阳区'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        address: '上海上海市浦东新区世纪大道北京市朝阳区芍药居北京市朝阳区芍药居上海市浦东新区世纪大道北京市朝阳区芍药居北京市朝阳区芍药居上海市浦东新区世纪大道北京市朝阳区芍药居北京市朝阳区芍药居上海市浦东新区世纪大道北京市朝阳区芍药居北京市朝阳区芍药居市浦东新区世纪大道北京市朝阳区芍药居北京市朝阳区芍药居'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        address: '深圳市南山区深南大道北京市朝阳区芍药居北京市朝阳区芍药居'
                    }
                ]
            }
        },
        methods:{
          setData(){
            this.data2 = this.data1;
          },
          scroll(num){
            console.log(num)
            if(num==0){
              this.data2=this.data2.concat(this.data1);
            }
          }
        }
    }

</script>
-->
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