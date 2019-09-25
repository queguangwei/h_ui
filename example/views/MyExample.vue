<template>
  <div>
    <h1>Grid</h1>
    <h-row>
      <h-col span="12" style="background:red">col-12</h-col>
      <h-col span="12" style="background:blue">col-12</h-col>
    </h-row>
    <br>
    <h-row>
      <h-col span="8" style="background:yellow">col-8</h-col>
      <h-col span="8" style="background:green">col-8</h-col>
      <h-col span="8" style="background:pink">col-8</h-col>
    </h-row>
    <br>
    <h-row>
      <h-col span="6" style="background:gray">col-6</h-col>
      <h-col span="6" style="background:black">col-6</h-col>
      <h-col span="6" style="background:grey">col-6</h-col>
      <h-col span="6" style="background:black">col-6</h-col>
    </h-row>
    <br>
    <h1>msgbox</h1>
    <h2>buttonGroup</h2>
    <h-button-group>
      <h-button @click="showBox = true" style="margin-right: 10px;">打开弹窗</h-button>
      <h-button type="primary" @on-click="changeShow">打开弹框</h-button>
    </h-button-group>
    <h2>checkboxGroup</h2>
    <h-checkbox-group v-model="btncheck">
      <h-checkbtn value="twitter" label="Twitter" disabled>
      </h-checkbtn>
      <h-checkbtn value="facebook" label="facebook">
        <span>Facebook</span>
      </h-checkbtn>
      <h-checkbtn value="github" label="github" icon="close">
        <span>Github</span>
      </h-checkbtn>
      <h-checkbtn value="snapchat" label="snapchat">
        <span>Snapchat</span>
      </h-checkbtn>
    </h-checkbox-group>
    <h-msg-box
      v-model="showBox"
      title="普通的Modal对话框标题"
      @on-ok="ok"
      @on-cancel="cancel">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </h-msg-box>
    <h-msg-box v-model="show" escClose :mask-closable="false" @on-cancel="cancel1" width="600" height="400">
      <h-form ref="formValidate" :model="formValidate" cols="2" :label-width="80">
        <h-form-item label="singleSelect" prop="city" required>
          {{formValidate.city}}
          <h-single-select v-model="formValidate.city" placeholder="请选择所在地" class="curItemClass"
                           remote filterable :loading="isLoading" :remote-method="remoteMethod1"
                           widthAdaption :maxDropWidth="330" transfer autoPlacement
                           :animated="false" @on-keydown="handlekeydown">
            <h-select-block :data="remoteData" :showCol="showCol" :colWidth="colWidth"></h-select-block>
          </h-single-select>
        </h-form-item>
        <h-form-item label="input" prop="name" required :tipWidth="300">
          <h-input v-model="formValidate.name" placeholder="请输入姓名" class="curItemClass" ></h-input>
        </h-form-item>
        <h-form-item label="typefield" prop="mail">
          <h-typefield v-model="formValidate.mail" placeholder="请输入邮箱" class="curItemClass" ></h-typefield >
        </h-form-item>
        <h-form-item label="tree">
          <h-select-tree v-model="formValidate.tree" :data="treeData" ref="tree" filterable></h-select-tree>
        </h-form-item>
        <h-form-item prop="date" label="data">
          <h-date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class="curItemClass" iconVisible></h-date-picker>
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
    <br>
    <h1>form</h1>
    <h-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <h-form-item label="股票代码" prop="stockCode">
        <h-single-select class="curItemClass" v-model="formCustom.stockCode" placeholder="请选择..."
                          widthAdaption autoPlacement
                         ref="single">
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
      <h-form-item label="密码" prop="passwd" required>
        <h-input class="curItemClass" type="password" v-model="formCustom.passwd"></h-input>
      </h-form-item>
      <h-form-item label="确认密码" prop="passwdCheck" required>
        <h-input class="curItemClass" type="password" v-model="formCustom.passwdCheck"></h-input>
      </h-form-item>
      <h-form-item label="年龄" prop="age" required>
        <h-input type="text" v-model="formCustom.age" number></h-input>
      </h-form-item>
      <h-form-item label="日期">
        <h-date-picker type="date" ref="datepicker" placeholder="选择日期" showToday autoPlacement v-model="formCustom.date" class="curItemClass"></h-date-picker>
      </h-form-item>
      <h-form-item label="fastdate">
        <h-fast-date type="date" placeholder="选择日期" ref="datepicker" class="curItemClass"></h-fast-date>
      </h-form-item>
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formCustom')">提交</h-button>
        <h-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px;float: right;">重置</h-button>
      </h-form-item>
    </h-form>
    <h1>table</h1>
    <h-table :columns="columns" :data="data0" :summationData="summationData1" height="300"
             border :highlight-row="true" :loading="loading" headAlgin="center" bodyAlgin="right"
             canDrag :lastColWidth="150"
             @on-sort-change="sortchange">
      <span slot="loading">我是自定义加载！！！</span>
    </h-table>
    <h1>tree</h1>
    <h-tree :data="baseData" show-checkbox></h-tree>
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
  var num = 0;
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
      console.log('age', value)
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
      btncheck:[],
      loading: false,
      showBox: false,
      show:false,
      isLoading: false,
      value:'value0',
      formValidate: {
        name: "",
        mail: "",
        city: '',
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: "",
        valueRemote1: [],
        tree: ''
      },
      colWidth:['120','150'],
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
        { value: "100", label: "100",label1: "label100" },
        { value: "1000", label: "1000",label1: "label1000" },
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
        stockCode: '',
      },
      treeData: [
        {
          title: 'parent',
          id: '1-0',
          expand: true,
          children: [
            {
              title: 'child1',
              id: '1-1',
              expand: true,
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
          ] }
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
      },
      columns: [
        {
          title: '姓名',
          key: 'name',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  name: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '年龄',
          key: 'age',
          width: 100,
          ellipsis:true,
          sortable: true
        },
        {
          title: '省份',
          key: 'province',
          width: 150,
          ellipsis:true,
          type: 'html'
        },
        {
          title: '市区',
          key: 'city',
          width: 100,
          ellipsis:true,
        },{
          title: '市区1',
          key: 'city',
          ellipsis:true
        },
        {
          type: 'text',
          title: '地址',
          key: 'address',
          width: 200,
          ellipsis:true
        },{
          type: 'text',
          title: '地址1',
          key: 'address',
          ellipsis:true
        },
        {
          title: '邮编',
          key: 'zip',
          width: 120,
          ellipsis:true,
          headerTooltip: true
        },{
          title: '邮编1',
          key: 'zip',
          ellipsis:true,
          headerTooltip: true
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('h-button', {
                props: {
                  type: 'info',
                  size: 'small'
                }
              }, '查看'),
              h('h-button', {
                props: {
                  type: 'text',
                  size: 'small'
                }
              }, '编辑')
            ]);
          },
          ellipsis:true
        }
      ],
      data0: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '<a href="javascript:alert(123456);">北京市</a>',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        },
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
          province: '北京市',
          city: '朝阳区',
          zip: 100000
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
          province: '北京市',
          city: '海淀区',
          zip: 100000
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
          province: '上海市',
          city: '浦东新区',
          zip: 100000
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          province: '广东',
          city: '南山区',
          zip: 100000
        }
      ],
      summationData1: [{
        name: 'qeqweqw',
        age: 123123123,
        address: 'qqweqwe'
      }],
      baseData: [{
        expand: true,
        checked: true,
        title: 'parent 1',
        children: [{
          title: 'parent 1-0',
          expand: true,
          disabled: true,
          children: [{
            expand: true,
            checked: true,
            disabled: true,
            title: 'leaf',
            disableCheckbox: true
          }, {
            title: 'leaf',
          }]
        }, {
          title: 'parent 1-1',
          expand: true,
          checked: true,
          children: [{
            title: '<span style="color: red">leaf</span>',
          }, {
            title: 'leaf2',
          }]
        }]
      }]
    }
  },
  methods: {
    sortchange(e) {
      console.log(e)
    },
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
//      this.$refs.single.clearSingleSelect()
//      this.$refs.datepicker.fold()
      this.$refs[name].resetFields();
    },
    remoteMethod1(query) {
      num = num + 1
      console.log('触发远程搜索:::' + num)
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
//      console.log(val)
//      console.log(e)
    },
    clear(){
      this.formValidate.city=''
    },
    changeShow(){
      this.$refs.formValidate.resetFields()
      setTimeout(() =>{
        this.show=true
        this.$refs.formValidate.firstNodeFocused()
      },300)
    },
    cancel1() {
      this.$refs.formValidate.resetFields()
    },
    ok () {
      this.$hMessage.info('点击了确定');
    },
    cancel () {
      this.$hMessage.info('点击了取消');
    }
  },
  created() {
    window.isO45 = true
  },
  mounted() {
    document.addEventListener("keydown", event => {
      enterHandler1(this.$refs.formValidate, event);
//      enterHandler1(this.$refs.formCustom, event);
    })
  },
}
</script>
