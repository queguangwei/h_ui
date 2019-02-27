<template>
<div>

    <h-tree :data="baseData" show-checkbox ref="tree1" notDeepCopy></h-tree>
     <h-button type="primary" @click="getCheckedNodes('tree1')" style="margin-top: 18px">获取被勾选的节点</h-button>
     {{ids}}
</div>
</template>
<script>
    export default {
        data () {
            return {
              baseData: [{
                    expand: true,
                     checked: true,
                    title: 'parent 1',
                    children: [{
                        title: 'parent 1-0',
                        expand: true,
                        children: [{
                            expand: true,
                            checked: true,
                            title: 'leaf'
                        }, {
                            title: 'leaf',
                            checked: true
                        }]
                    }, {
                        title: 'parent 1-1',
                        expand: true,
                        checked: true,
                        children: [{
                            title: '<span style="color: red">leaf</span>',
                            checked: true
                        }, {
                            title: 'leaf2',
                            checked: true
                        }]
                    }]
                }],
                ids:[]
            }
        },
         methods: {
                getCheckedNodes (name) {
                    console.log(this.baseData)

                  // this.ids=this.$refs[name].getCheckedNodes();
                }
                }
    }
</script>
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