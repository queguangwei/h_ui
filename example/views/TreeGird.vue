<template>
  <div>
    <h2>单选</h2>
    <h-tree-gird :columns="columns1" :disabled-hover="true" :data="data1" size="small" :highlight-row="true" @on-current-change="click1" @on-row-click="click2" ref="editGird" height="400" :show-header="false"></h-tree-gird>
    <h2>多选</h2>
    <h-tree-gird :columns="columns2" :data="data1" size="small" :highlight-row="true" @on-current-change="click1" @on-row-click="click2" ref="editGird" height="400" :isCheckbox="true" :checkStrictly="true" @on-expand="expand"></h-tree-gird>
    <p>父子连动</p>
     <h-tree-gird :columns="columns2" :data="data1" size="small" :highlight-row="true" @on-current-change="click1" @on-row-click="click2" ref="editGird":isCheckbox="true" @on-select-change="click1"></h-tree-gird>
  </div>
</template>
<script>
var tData= [
    {
      id: 1,
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
      id: 11,
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 1,
    },
    {
      id: 111,
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 11,
    },
    {
      id: 1111,
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 111,
    },
    {
      id: 1112,
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 111,
    },
    {
      id: 112,
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 11,
    },
    {
      id: 12,
      name: '李小红',
      age: 30,
      address: '上海市浦东新区世纪大道',
      money: '140.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 1,
    },
    {
      id: 13,
      name: '周小伟',
      age: 26,
      address: '深圳市南山区深南大道',
      money: '150.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 1,
    },
    {
      id: 2,
      name: '王小明',
      age: 21,
      address: '北京市朝阳区芍药居',
      money: '120.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      // _highlight: true//默认选择当前项
    },
    {
      id: 21,
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 2,
    },
    {
      id: 22,
      name: '李小红',
      age: 30,
      address: '上海市浦东新区世纪大道',
      money: '140.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 2,
    },
    {
      id: 23,
      name: '周小伟',
      age: 26,
      address: '深圳市南山区深南大道',
      money: '150.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 2,
    },
    {
      id: 3,
      name: '王小明',
      age: 21,
      address: '北京市朝阳区芍药居',
      money: '120.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      // _highlight: true//默认选择当前项
    },
    {
      id: 31,
      name: '张小刚',
      age: 25,
      address: '北京市海淀区西二旗',
      money: '130.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 3,
    },
    {
      id: 32,
      name: '李小红',
      age: 30,
      address: '上海市浦东新区世纪大道',
      money: '140.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 3,
    },
    {
      id: 33,
      name: '周小伟',
      age: 26,
      address: '深圳市南山区深南大道',
      money: '150.00',
      cardId: '6223 5678 1234 5678',
      city: '北京',
      dating:'2018-01-09T16:00:00.000Z',
      timing:'16:00:00.00',
      tree:'leaf1',
      _parentId: 3,
    },
  ];
  export default {
    data () {
      return {
        columns1: [
          {
            type: 'text',
            title: '姓名',
            key: 'name',
            width: 200,
          },
          {
            type: 'number',
            title: '年龄',
            width: 200,
            key: 'age',
            hiddenCol:false,
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
            format: 'yyyy-MM-dd',
          },
          {
            type: 'time',
            title: '时间',
            width: 200,
            key: 'timing',
            dateType:'time',
            format: 'HH:mm:ss',
            steps: [2,2,2],
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
        columns2: [
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
            integerNum: 3,
            suffixNum: 2,
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
            rule:{ required: true, type: 'date', message: '请选择日期', trigger: 'blur,change' }
          },
          {
            type: 'time',
            title: '时间',
            width: 200,
            key: 'timing',
            dateType:'time',
            format: 'HH:mm:ss',
            steps: [2,2,2],
            rule:{ required: true, type: 'date', message: '请选择时间', trigger: 'blur,change' }
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
        data1: tData
      }
    },
    methods: {
      click1(s){
        console.log(s);
      },
      click2(s){
        console.log(s);
      },
      expand(s){
        console.log(s);
      }
    },
    mounted () {
      // this.updateTree(this.baseData);
    }
  }
</script>