<template>
  <div>
    <h-form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
      <h-form-item label="日期">
        <h-date-picker type="date" placeholder="选择日期" v-model="formCustom.date" class="curItemClass" iconVisible></h-date-picker>
      </h-form-item>
      <h-form-item label="金额框" prop="money">
        <h-typefield v-model="formCustom.money" divided bigTips focusAllSelect
                     integerNum="10" suffixNum="2"  type="money" :max="1000000000" :min="0" :step="100">
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
      <h-form-item>
        <h-button type="primary" @click="handleSubmit('formCustom')">提交</h-button>
        <h-button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
export default {
  data () {
    const validateMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入金额'));
      } else {
        console.log(value)
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
      formCustom: {
        date: '',
        money: '',
        passwd: '',
        passwdCheck: '',
        age: ''
      },
      ruleCustom: {
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
    }
  }
}
</script>
