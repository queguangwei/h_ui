<template>
  <div>
    <p>form</p>
    <h-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <h-form-item label="singleSelect" prop="city">
        <h-single-select v-model="formCustom.city" placeholder="请选择所在地"
                         remote filterable widthAdaption placement="top" transfer>
          <h-select-block :data="bigData" :showCol="showCol"></h-select-block>
        </h-single-select>
      </h-form-item>
      <h-form-item label="金额框" prop="face_balance">
        <h-typefield v-model="formCustom.face_balance" nonNegative divided focusAllSelect
                     integerNum="10" suffixNum="2"  type="money" :step="10">
        </h-typefield>
      </h-form-item>
      <h-form-item label="密码" prop="passwd">
        <h-input type="password" v-model="formCustom.passwd"></h-input>
      </h-form-item>
      <h-form-item label="确认密码" prop="passwdCheck">
        <h-input type="password" v-model="formCustom.passwdCheck"></h-input>
      </h-form-item>
      <h-form-item label="年龄" prop="age">
        <h-input type="text" v-model="formCustom.age" number></h-input>
      </h-form-item>
      <h-form-item label="日期">
        <h-date-picker type="date" placeholder="选择日期" showToday v-model="formCustom.date" class="curItemClass"></h-date-picker>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formCustom')">提交</h-button>
        <h-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</h-button>
      </h-form-item>
    </h-form>
    <p>tabs</p>
    <!--<h-tabs ref="remove">-->
      <!--<h-tab-pane v-for="(item) in list" :key="item.show_title"  :label="item.show_title" :name="item.show_title">-->
        <!--<div style="height:230px;width:100%;overflow:auto">-->
            <!--{{item.show_title}}-->
        <!--</div>-->
      <!--</h-tab-pane>-->
    <!--</h-tabs>-->
      <!--<h-button @click="remove(true)">切换1</h-button>-->
      <!--<h-button @click="remove(false)">切换2</h-button>-->
      <!--<h-button @click="removeAll">清空</h-button>-->
    <p>editGird</p>

  </div>
</template>
<script>
let list1 = [{
  show_title:"tab1"
},
  {
    show_title:"tab2"
  },
  {
    show_title:"tab3"
  }]
let list2 = [{
  show_title:"tab1"
},
  {
    show_title:"tab2"
  },
  {
    show_title:"tab3"
  },{
    show_title:"tab4"
  },{
    show_title:"tab5"
  }]
import { enterHandler1 } from "../../src/util/tools.js"
export default {
  data () {
    const validateMoney = (rule, value, callback) => {
      console.log('face_balance validator', value)
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const validateAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      list: [],
      formCustom: {
        date: '',
        face_balance: '0.00',
        passwd: '',
        passwdCheck: '',
        age: '',
        city: ''
      },
      showCol:['label1'],
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
        { value: "value12", label: "label12",label1: "多列12" },
        { value: "value13", label: "label13",label1: "多列13" },
        { value: "value14", label: "label14",label1: "多列14" },
        { value: "value15", label: "label15",label1: "多列15" },
        { value: "value16", label: "label16",label1: "多列16" },
      ],
      ruleCustom: {
        face_balance: [{
          validator: (rule, value, callback)=>{
            console.log('face_balance validator', value)
            let tmpVal = parseFloat(value);
            // let tmpVal = parseFloat((this.formItem.face_balance+'').replace(',', ''));
            if(isNaN(tmpVal) || tmpVal == 0 || tmpVal % 10 != 0) {

            } else {
              callback();
            }
          }, trigger:'blur,change'}
        ],
        money: [
          { validator: validateMoney, triggger: 'blur'}
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        age: [
          { validator: validateAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('提交成功!');
        } else {
          this.$Message.error('表单验证失败!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    remove(status) {
      if(status) {
        this.list = list1
      }else {
        this.list = list2
      }
      this.$nextTick(()=>{
        this.$refs.remove.updateNav()
      })
    },
    removeAll() {
      this.list = []
      this.$nextTick(()=>{
        this.$refs.remove.updateNav()
      })

    }

  },
  created() {
    window.isO45 = true
  },
  mounted() {
//    document.addEventListener("keydown", event => {
//      enterHandler1(this.$refs.formValidate, event);
//    })
  },
}
</script>
