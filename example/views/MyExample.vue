<template>
  <div>
    <h-form :model="formItem1" :compareModel="formItem2" :label-width="80" errorFocus cols="2" ref="formValidate">
      <h-form-item label="金额框" prop="money" required>
        <h-typefield v-model="formItem1.money" bigTips focusAllSelect integerNum="13" @on-keyup="handlekeyup" suffixNum="2" type="money" :max="100" :min="0" :step="10" algin="center" style="width:300px" ref="test"></h-typefield>
        <!--<h-typefield v-model="formItem1.money" class="curItemClass" bigTips focusAllSelect type="money"-->
                     <!--:max="100" :min="0" :step="10" algin="center" style="width:300px"-->
                      <!--@on-keyup="handlekeyup"></h-typefield>-->
      </h-form-item>

      <!--<h-form-item label="选择器" prop="select" required>-->
        <!--<h-select v-model="formItem1.select" class="curItemClass" @on-keyup="handlekeyup" filterable multiple>-->
          <!--<h-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</h-option>-->
        <!--</h-select>-->
      <!--</h-form-item>-->
      <!--<h-form-item label="singleSelect" prop="city" required>-->
        <!--<h-single-select v-model="formItem1.city" placeholder="请选择所在地" @on-keyup="handlekeyup" class="curItemClass" widthAdaption>-->
          <!--<h-select-block :data="bigData" :showCol="showCol" :colWidth="colWidth"></h-select-block>-->
        <!--</h-single-select>-->
      <!--</h-form-item>-->
      <h-form-item label="开始时间">
        <h-datePicker type="date" placeholder="选择日期" v-model="formItem1.start" class="curItemClass"></h-datePicker>
      </h-form-item>
      <h-form-item label="结束时间">
        <h-datePicker type="date" placeholder="选择日期" v-model="formItem1.end" class="curItemClass"></h-datePicker>
      </h-form-item>

      <h-form-item label="日期控件">
      <h-row>
      <h-col span="11">
      <h-form-item prop="date" required>
      <h-datePicker type="date" placeholder="选择日期" v-model="formItem1.date" class="curItemClass"></h-datePicker>
      </h-form-item>
      </h-col>
      <h-col span="2" style="text-align: center">-</h-col>
      <h-col span="11">
      <h-form-item prop="time" required>
      <h-timePicker type="time" placeholder="选择时间" v-model="formItem1.time" class="curItemClass"></h-timePicker>
      </h-form-item>
      </h-col>
      </h-row>
      </h-form-item>
      <h-form-item label="特殊日期" required prop="fatdate">
      <h-fast-date v-model="formItem1.fatdate" class="curItemClass"></h-fast-date>
      </h-form-item>


      <h-form-item label="输入框" prop="input" required>
        <h-input v-model="formItem1.input" placeholder="请输入" class="curItemClass"></h-input>
      </h-form-item>

      <h-form-item label="文本域" prop="textarea" required>
        <h-input v-model="formItem1.textarea" class="curItemClass"  type="textarea" placeholder="请输入..."  focusAllSelect></h-input>
      </h-form-item>

      <h-form-item label="文本数字" prop="cascader" required>
        <h-input type="int"  placeholder="请输入..."></h-input>
      </h-form-item>

      <h-form-item label="简单下拉框" required prop="fatdate">
        <h-simple-select v-model="value" ref="test">
          <h-select-block :data="bigData"></h-select-block>
        </h-simple-select>
      </h-form-item>

      <h-form-item label="文本域" prop="cascader" required>
        <h-cascader v-model="formItem1.cascader" :data="data2" trigger="hover" style="width:200px"></h-cascader>
      </h-form-item>

      <h-form-item label="下拉树" prop='tree' required>
        <h-select-tree v-model="formItem1.tree" :first-value="firstValc" style="width:200px" :data="baseData1" placement="top" placeholder="你好" filterable></h-select-tree>
      </h-form-item>

      <h-form-item label="下拉表" prop='slider' required>
        <h-select-table v-model="formItem1.slider" filterable>
          <h-table-option border :columns="columns1" :data="data1"></h-table-option>
        </h-select-table>
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
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formItem1')">提交</h-button>
        <h-button type="ghost" style="margin-left: 8px" @click="handleReset('formItem1')">取消</h-button>
      </h-form-item>
    </h-form>
    <h-msg-box v-model="show" escClose :beforeEscClose="beforeEscClose" :mask-closable="false" @on-ok="handleSubmit('formValidate')" @on-cancel="handleReset('formValidate')">
      <h-form ref="formValidate" :model="formValidate" cols="2" :label-width="80">

        <h-form-item label="input" prop="name" required>
          <h-input v-model="formValidate.name" placeholder="请输入姓名" class="curItemClass" ></h-input>
        </h-form-item>
        <h-form-item label="select" prop="city1" required>
          <h-select v-model="formValidate.city1"  multiple placeholder="请选择所在地" class="curItemClass" >
            <h-option value="beijing">北京市</h-option>
            <h-option value="shanghai">上海市</h-option>
            <h-option value="shenzhen">深圳市</h-option>
          </h-select>
        </h-form-item>
        <h-form-item label="typefield" prop="mail" required>
          <h-typefield v-model="formValidate.mail" placeholder="请输入邮箱" class="curItemClass" ></h-typefield >
        </h-form-item>

        <h-form-item prop="date" label="data">
          <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class="curItemClass" iconVisible></h-date-picker>
        </h-form-item>
        <h-form-item label="singleSelect" prop="city" required>
          <h-single-select v-model="formValidate.city" placeholder="请选择所在地" class="curItemClass" widthAdaption>
            <h-select-block :data="bigData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
          </h-single-select>
        </h-form-item>
        <h-form-item label="valueRemote1" prop="valueRemote1" required>
          <h-multi-select v-model="formValidate.valueRemote1" :isString="isstring" widthAdaption class="curItemClass" specialIndex specialVal="value1" accuFilter newSearchModel>
            <h-multi-block :data="remotebigData"></h-multi-block>
          </h-multi-select>
        </h-form-item>
        <h-form-item prop="time" label="time">
          <h-time-picker type="time" placeholder="选择时间" v-model="formValidate.time" class="curItemClass" ></h-time-picker>
        </h-form-item>
        <h-form-item label="radio" prop="gender">
          <h-radio-group v-model="formValidate.gender">
            <h-radio label="male" class="curItemClass" >男</h-radio>
            <h-radio label="female" class="curItemClass" >女</h-radio>
          </h-radio-group>
        </h-form-item>
        <h-form-item label="checkbox" prop="interest">
          <h-checkbox-group v-model="formValidate.interest">
            <h-checkbox label="吃饭" class="curItemClass" ></h-checkbox>
            <h-checkbox label="睡觉" class="curItemClass" ></h-checkbox>
            <h-checkbox label="跑步" class="curItemClass" ></h-checkbox>
            <h-checkbox label="看电影" class="curItemClass" ></h-checkbox>
          </h-checkbox-group>
        </h-form-item>
      </h-form>
    </h-msg-box>
    <Button @on-click="changeShow">打开弹框</Button>
  </div>
</template>
<script>
  let bigData = [];
  bigData.push({label:'全选',value:'-1'})
  for(let i=0;i<2000;i++){
    let obj={};
    obj.value="value"+i;
    obj.label=i==1?"label"+i+'000000000000000000000000000000000000000000000000000':"label"+i;
    bigData.push(obj);
  }
import { enterHandler1 } from '../../src/util/tools.js'
export default {
  data() {
    return {
      value:'value0',
      showCol:['label1'],
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
        cascader:[],
        start: '2016-01-01',
        end: '2019-01-01'
      },
      formItem2:{
        input: '1',
        select: '',
        radio: '',
        money: 100,
        checkbox: [],
        fatdate: '',
        date: '',
        time: '',
        slider: '',
        tree:'',
        textarea: '',
      },
      formValidate: {
        name: "",
        mail: "",
        city1:'',
        city: '',
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
        valueRemote1:[],
      },
      bigData: [
        { value: "value1", label: "label1",label1: "多列11111111111111111111111111111111111111111111111111111111"},
        { value: "value2", label: "label2",label1: "多列2" },
        { value: "value3", label: "label3",label1: "多列3" },
        { value: "value4", label: "label4",label1: "多列4" },
        { value: "value5", label: "label5",label1: "多列5" },
        { value: "value6", label: "label6",label1: "多列6" },
        { value: "value7", label: "label7",label1: "多列7" },
        { value: "value8", label: "label8",label1: "多列8" },
        { value: "value9", label: "label9",label1: "多列9" },
        { value: "value10", label: "label10",label1: "多列10" },
        { value: "value11", label: "label11",label1: "多列11" },
      ],
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
      select2:'',
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
      show:false,
      colWidth:['200','200'],
      isstring:false,
      remotebigData:bigData,
      value111:'value0',
    }
  },
  created() {
    window.isO45 = true
  },
  mounted() {
//    document.addEventListener('keydown', event => {
//      enterHandler1(this.$refs.formValidate, event)
//    })
  },
  methods:{
    handlekeyup(e, val) {
      console.log(e)
      console.log(val)
    },
    changeShow(){
//      this.$refs.formValidate.resetFields()
      this.show=true
      this.$refs.formValidate.firstNodeFocused()
    },
    handleSubmit(){
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
      this.$refs[name].resetFields()
//        this.$refs[name].resetValidate();
    },
    beforeEscClose() {

      return true
    }
  }
}
</script>
