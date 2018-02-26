<template>
  <div>
    <h2>基础</h2>
    <h3>单选</h3>

    <h-edit-gird :columns="columns1" :data="data1" size="small" :disabled-hover="true" :highlight-row="true" @on-current-change="click1" ref="editGird" stripe :show-header="false"></h-edit-gird>
    <p>小</p>
    <h-edit-gird :columns="columns1" :data="data1" @on-current-change="click1" @on-row-click="click1" ref="editGird" width="800" no-data-text="你好呀"></h-edit-gird>
    <p>中</p>
    <h-edit-gird :columns="columns1" :data="data1" size="large" :disabled-hover="true" :highlight-row="true" @on-current-change="click1" @on-select-cancel="click1" ref="editGird" stripe></h-edit-gird>
    <p>大</p>
    <Button @click="getDate">获取数据</Button>
    <Button @click = "addDate">新增一行</Button>
    <h3>多选</h3>
<!--     <h-edit-gird :columns="columns4" :data="data1" @on-select-all="allSelect" @on-select="select" :rowSelect="true" @on-select-cancel="select" height="200"></h-edit-gird> -->
    <h-edit-gird :columns="columns4" :data="data1" @on-select-all="allSelect" @on-selection-change="selsetChange" height="200"></h-edit-gird>
    <h3>直接显示编辑框</h3>
    <h-edit-gird :columns="columns1" :data="data1" size="small" :disabled-hover="true" :highlight-row="true" @on-current-change="click1" :showEditInput="true" height="200"></h-edit-gird>
  </div>
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
    // _highlight: true//默认选择当前项
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
  data() {
    return {
      columns1: [
        {
          type: 'text',
          title: '姓名',
          key: 'name',
          width: 200,
          rule: { required: true, message: '姓名不能为空'},
        },
        {
          type: 'number',
          title: '年龄',
          width: 200,
          key: 'age',
          hiddenCol:false,
          rule: { required: true, message: '年龄不能为空'},
        },
        {
          type: 'textArea',
          rows: 2,
          width: 200,
          title: '地址',
          key: 'address',
          rule: { required: true, message: '地址不能为空'},
        },
        {
          type: 'money',
          title: '金额',
          width: 200,
          integerNum: 14,
          suffixNum: 3,
          // suffixNum: 2,
          bigTips: true,
          key: 'money',
          rule: { required: true, message: '金额不能为空'},
        },
        {
          type: 'card',
          title: '卡号',
          width: 200,
          key: 'cardId',
          rule: { required: true, message: '卡号不能为空'},
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
          rule:{ required: true, message: '请选择城市', trigger: 'blur,change' }
        },
        {
          type: 'date',
          title: '日期',
          width: 200,
          key: 'dating',
          dateType:'date',
          format: 'yyyy-MM-dd',
          rule:{ required: true, message: '请选择日期', trigger: 'blur,change' }
        },
        {
          type: 'time',
          title: '时间',
          width: 200,
          key: 'timing',
          dateType:'time',
          format: 'HH:mm:ss',
          steps: [2,2,2],
          rule:{ required: true, message: '请选择时间', trigger: 'blur,change' }
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
          rule:{ required: true, message: '请选择子节点', trigger: 'blur,change' }
        }
      ],
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
          placeholder:'哎呀妈呀',
          icon: 'add',
          width: 200,
        },
        {
          type: 'number',
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
          integerNum: 14,
          suffixNum: 3,
          // suffixNum: 2,
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
          notFoundText:'我了个去',
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

    }
  },
  methods: {
    click1(s,v){
      console.log(s);
      console.log(v);
    },
    allSelect (allSelection){
      console.log(allSelection);
    },
    select (selection,row){//已选择的项和刚刚选择的项
      console.log(selection);
      console.log(row);
    },
    selsetChange (selection){//选项发生变化时触发已选择的项
      console.log(selection);
    },
    getDate(){
      console.log(this.$refs.editGird.cloneData); 
    },
    addDate(){
      tData = this.data1.push({
        name: '',
        age: null,
        address: '',
        money: '',
        cardId: '',
        city: '',
        dating:'',
        timing:'',
        tree:''
      });
    }  
  } 
}
</script>