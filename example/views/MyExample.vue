<template>
  <div>
    <h1>msgbox</h1>
    <Button @on-click="changeShow">打开弹框</Button>
    <h-msg-box v-model="show" escClose :mask-closable="false" @on-cancel="cancel" width="580" height="700">
      <h-form ref="formValidate" :model="formValidate" cols="2" :label-width="80">
        <h-form-item label="singleSelect" prop="city" required>
          {{formValidate.city}}
          <h-single-select v-model="formValidate.city" placeholder="请选择所在地" class="curItemClass"
                           remote filterable :loading="isLoading" :remote-method="remoteMethod1"
                           widthAdaption  transfer showFirstLabelOnly autoPlacement
                           :animated="false" @on-keydown="handlekeydown">
            <h-select-block :data="remoteData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
          </h-single-select>
        </h-form-item>
        <h-form-item label="input" prop="name" required>
          <h-input v-model="formValidate.name" placeholder="请输入姓名" class="curItemClass" ></h-input>
        </h-form-item>
        <h-form-item label="typefield" prop="mail">
          <h-typefield v-model="formValidate.mail" placeholder="请输入邮箱" class="curItemClass" ></h-typefield >
        </h-form-item>
        <h-form-item label="select" prop="city1">
          <h-select v-model="formValidate.city1"  multiple placeholder="请选择所在地" class="curItemClass" >
            <h-option value="beijing">北京市</h-option>
            <h-option value="shanghai">上海市</h-option>
            <h-option value="shenzhen">深圳市</h-option>
          </h-select>
        </h-form-item>
        <h-form-item prop="date" label="data">
          <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class="curItemClass" iconVisible></h-date-picker>
        </h-form-item>
        <h-form-item label="valueRemote1" prop="valueRemote1" required>
          <h-multi-select v-model="formValidate.valueRemote1" :isString="isstring" class="curItemClass" specialVal="value1" accuFilter newSearchModel>
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

    <h1>form</h1>
    <h-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <h-form-item label="股票代码" prop="stockCode">
        <h-single-select class="curItemClass" v-model="formCustom.stockCode" placeholder="请选择..."
                         filterable widthAdaption autoPlacement keepInputValue
                         fastMatch>
          <h-select-block :data="bigData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
        </h-single-select>
        {{formCustom.stockCode}}
      </h-form-item>
      <h-form-item label="金额框" prop="face_balance">
        <h-typefield class="curItemClass" v-model="formCustom.face_balance"
                     nonNegative divided focusAllSelect :min="0" :max="1000000"
                     integerNum="10" suffixNum="2"  type="money" :step="10">
        </h-typefield>
      </h-form-item>
      <h-form-item label="密码" prop="passwd">
        <h-input class="curItemClass" type="password" v-model="formCustom.passwd"></h-input>
      </h-form-item>
      <h-form-item label="确认密码" prop="passwdCheck">
        <h-input class="curItemClass" type="password" v-model="formCustom.passwdCheck"></h-input>
      </h-form-item>
      <h-form-item label="年龄" prop="age">
        <h-input type="text" v-model="formCustom.age" number></h-input>
      </h-form-item>
      <h-form-item label="日期">
        <h-date-picker type="date" placeholder="选择日期" showToday autoPlacement v-model="formCustom.date" class="curItemClass"></h-date-picker>
      </h-form-item>

      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formCustom')">提交</h-button>
        <h-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</h-button>
      </h-form-item>
    </h-form>

  </div>
</template>
<script>
  let bigData = [];
  for(let i=0;i<2000;i++){
    let obj={};
    obj.value=i;
    obj.label=i;
    bigData.push(obj);
  }
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
      show:false,
      isLoading: false,
      value:'value0',
      formValidate: {
        name: "",
        mail: "",
        city1:'',
        city: 'value1',
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
        valueRemote1: [],
      },
      colWidth:['150','150'],
      showCol:['label1'],
      bigData: [
        { value: "1", label: "1",label1: "多列01"},
        { value: "2", label: "2",label1: "多列02"},
        { value: "3", label: "3",label1: "多列03"},
        { value: "11", label: "11",label1: "多列11"},
        { value: "12", label: "12",label1: "多列12"},
        { value: "13", label: "13",label1: "多列13"},
        { value: "21", label: "21",label1: "多列21"},
        { value: "22", label: "22",label1: "多列22"},
        { value: "23", label: "23",label1: "多列23"},
        { value: "30", label: "30",label1: "多列30"},
        { value: "value1", label: "label1",label1: "恒生电子" },
        { value: "value2", label: "label2",label1: "大华股份" },
        { value: "value3", label: "label3",label1: "海康威视" },
        { value: "value4", label: "label4",label1: "多列4" },
        { value: "value5", label: "label5",label1: "多列5" },
        { value: "value6", label: "label6",label1: "多列6" },
        { value: "value7", label: "label7",label1: "多列7" },
        { value: "value8", label: "label8",label1: "多列8" },
        { value: "value9", label: "label9",label1: "多列9" },
        { value: "value10", label: "label10",label1: "多列10" },
        { value: "value11", label: "000001",label1: "平安银行" },
        { value: "value12", label: "601600",label1: "中国铝业" },
        { value: "value13", label: "300056",label1: "三维丝" },
        { value: "value14", label: "002354",label1: "天神娱乐" },
        { value: "value15", label: "002016",label1: "世荣兆业" },
        { value: "value16", label: "501009",label1: "生物科技" },
        { value: "value17", label: "502014",label1: "一带一A" },
        { value: "value18", label: "513660",label1: "恒生通" },
      ],
      remoteData:[],
      isstring:false,
      remotebigData:bigData,
      list: [],
      formCustom: {
        date: '',
        face_balance: '0.00',
        passwd: '',
        passwdCheck: '',
        age: '',
        stockCode: '12345'
      },
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
    remoteMethod1(query) {
      if (query !== "") {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          const list = this.bigData.map(item => {
            return item;
          });
          this.remoteData = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.remoteData = [];
      }
    },
    handlekeydown(val, e) {
      console.log(val)
      console.log(e)
    },
    clear(){
      this.formValidate.city=''
    },
    changeShow(){
      this.show=true
      this.$refs.formValidate.firstNodeFocused()
    },
    cancel() {
      this.$refs.formValidate.resetFields()
    }
  },
  created() {
    window.isO45 = true
  },
  mounted() {
    document.addEventListener("keydown", event => {
      enterHandler1(this.$refs.formCustom, event);
    })
  },
}
</script>
