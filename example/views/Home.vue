<template>
<div>
  <h-edit-gird :columns="columns4" :data="data1" @on-select-all="allSelect" @on-select="select" :rowSelect="true" @on-selection-change="selsetChange" height="200" ref="table1">
  </h-edit-gird>
  <Button @click = "click">获取数据</Button>
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
        data1: tData
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