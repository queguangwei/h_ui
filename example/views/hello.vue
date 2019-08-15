<template>
  <div>
    <h-form ref="formItem1" :model="formItem1" :compareModel="formItem2" :label-width="80" errorFocus cols="2">
      <h-form-item label="选择器" prop="select" required>
        <h-select v-model="formItem1.select" filterable multiple @on-blur="blurtest" @on-focus="focustest">
          <h-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="输入框" prop="input" required>
        <h-input v-model="formItem1.input" placeholder="请输入" @on-blur="blurtest" @on-focus="focustest"></h-input>
      </h-form-item>
      <h-form-item label="金额框" prop="money" required>
        <h-typefield v-model="formItem1.money" bigTips focusAllSelect integerNum="13" suffixNum="2" type="money" :max="10000000000" :min="0" :step="100" algin="center" style="width:300px"></h-typefield>
      </h-form-item>

      <h-form-item label="inputNumber" prop="inputNumber" required>
        <h-input-number :max="20"
                        :min="-10"
                        :step="1"
                        v-model="formItem1.inputNumber"
                        focusAllSelect
                        @on-focus="focustest"
                        @on-blur="blurtest"
        ></h-input-number>
      </h-form-item>

      <h-form-item label="文本域" prop="textarea" required>
        <h-input v-model="formItem1.textarea" type="textarea" placeholder="请输入..."  focusAllSelect @on-blur="blurtest" @on-focus="focustest"></h-input>
      </h-form-item>

      <h-form-item label="文本密码" prop="cascader" required>
        <h-input type="password"  placeholder="请输入..."  @on-blur="blurtest" @on-focus="focustest"></h-input>
      </h-form-item>

      <h-form-item label="文本数字" prop="cascader" required>
        <h-input type="int"  placeholder="请输入..."  @on-blur="blurtest" @on-focus="focustest"></h-input>
      </h-form-item>

      <h-form-item>


        <!--<h-form-item label="金额框" prop="money" required>-->
          <!--<h-typefield v-model="formItem1.money" @on-blur="blurtest" @on-focus="focustest">-->
            <!--<h-select v-model="select2" placeholder="" slot="append" style="width: 45px" :isArrow="false" :clearable="false" :tranfer="true">-->
              <!--<h-option value="com">.com</h-option>-->
              <!--<h-option value="org">.org</h-option>-->
              <!--<h-option value="io">.io</h-option>-->
            <!--</h-select>-->
          <!--</h-typefield>-->
        <!--</h-form-item>-->

        <h-form-item label="inputnumber" required prop="fatdate">
          <h-input-number :max="10" :min="1"  @on-blur="blurtest" @on-focus="focustest"></h-input-number>
        </h-form-item>

        <h-form-item label="下拉表" prop='slider' required>
          <h-select-table v-model="formItem1.slider" filterable @on-blur="blurtest" @on-focus="focustest">
            <h-table-option border :columns="columns1" :data="data1"></h-table-option>
          </h-select-table>
        </h-form-item>

        <h-form-item label="日期控件">
          <h-row>
            <h-col span="11">
              <h-form-item prop="date" required>
                <h-datePicker type="date" placeholder="选择日期" v-model="formItem1.date"></h-datePicker>
              </h-form-item>
            </h-col>
            <h-col span="2" style="text-align: center">-</h-col>
            <h-col span="11">
              <h-form-item prop="time" required>
                <h-timePicker type="time" placeholder="选择时间" v-model="formItem1.time"></h-timePicker>
              </h-form-item>
            </h-col>
          </h-row>
        </h-form-item>

        <!--<h-form-item label="单选框" prop="radio" required>-->
          <!--<h-radio-group v-model="formItem1.radio">-->
            <!--<h-radio label="male">男</h-radio>-->
            <!--<h-radio label="female">女</h-radio>-->
          <!--</h-radio-group>-->
        <!--</h-form-item>-->
        <!--<h-form-item label="多选框" prop="checkbox" required>-->
          <!--<h-checkbox-group v-model="formItem1.checkbox">-->
            <!--<h-checkbox label="吃饭"></h-checkbox>-->
            <!--<h-checkbox label="睡觉"></h-checkbox>-->
            <!--<h-checkbox label="跑步"></h-checkbox>-->
            <!--<h-checkbox label="看电影"></h-checkbox>-->
          <!--</h-checkbox-group>-->
        <!--</h-form-item>-->
        <!--<h-form-item label="特殊日期" required prop="fatdate" required>-->
          <!--<h-fast-date v-model="formItem1.fatdate"></h-fast-date>-->
        <!--</h-form-item>-->

        <h-form-item label="简单下拉框" required prop="fatdate">
          <h-simple-select v-model="value" ref="test">
            <h-select-block :data="bigData"></h-select-block>
          </h-simple-select>
        </h-form-item>
        <h-form-item label="文本域" prop="cascader" required>
          <h-cascader v-model="formItem1.cascader" :data="data2" trigger="hover" style="width:200px" @on-focus="focustest" @on-blur="blurtest"></h-cascader>
        </h-form-item>
        <h-form-item label="下拉树" prop='tree' required>
          <h-select-tree v-model="formItem1.tree" :first-value="firstValc" style="width:200px" :data="baseData1" placement="top" placeholder="你好" filterable @on-focus="focustest" @on-blur="blurtest"></h-select-tree>
        </h-form-item>

        <h-button type="primary" @click="handleSubmit('formItem1')">提交</h-button>
        <h-button type="ghost" style="margin-left: 8px" @click="handleReset('formItem1')">取消</h-button>
        <h-button type="ghost" style="margin-left: 8px" @click="firstNodeFocused('formItem1')">第一个输入框获取焦点</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
let bigData = [];
for(let i=0;i<2000;i++){
  let obj={};
  obj.value="value"+i;
  obj.label="label"+i;
  bigData.push(obj);
}
export default {
  mounted() {
    window.isO45 = true;
  },
  data () {
    return {
      model1:'',
      bigData:bigData,
      value:'value0',
      value2: 0,
      changeform:false,
      formItem1: {
        input: '1',
        inputNumber: 1,
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
      formItem2:{
        input: '1',
        select: '',
        radio: '',
        money: '',
        checkbox: [],
        fatdate: '',
        date: '',
        time: '',
        slider: '',
        tree:'',
        textarea: '',
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
      }],
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
      cityList: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        },
        {
          value: 'hangzhou',
          label: '杭州市'
        },
        {
          value: 'nanjing',
          label: '南京市'
        },
        {
          value: 'chongqi',
          label: '重庆市'
        }
      ],
    }
  },
  methods: {
    focustest(){
      console.log("获取焦点");
    },
    blurtest(){
      console.log("失去焦点");
    },
    firstNodeFocused(name){
      this.$refs[name].firstNodeFocused();
    },
    changeform1(){
      this.changeform = !this.changeform;
    },
    handleSubmit(name) {
      let _this=this
      this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$hMessage.success('提交成功!');
        } else {
          _this.$hMessage.error('表单验证失败!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    totest() {
      this.$refs.changeDrop.focus();
    },
  }
}
</script>
