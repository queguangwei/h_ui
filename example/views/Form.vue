<template>
  <div>
    <h-form ref="formItems"
            :model="formItems"
            :rules="formRules"
            :label-width="80">
      <h-form-item label="姓名"
                   prop="name"
                   required>
        <h-input v-model="formItems.name"
                 placeholder="请输入姓名"></h-input>
      </h-form-item>
      <h-form-item label="邮箱"
                   prop="mail"
                   required>
        <h-input v-model="formItems.mail"
                 placeholder="请输入邮箱"></h-input>
      </h-form-item>
      <h-form-item label="城市"
                   prop="city"
                   required>
        <h-select v-model="formItems.city"
                  placeholder="请选择所在地">
          <h-option value="beijing">北京市</h-option>
          <h-option value="shanghai">上海市</h-option>
          <h-option value="shenzhen">深圳市</h-option>
        </h-select>
      </h-form-item>
      <h-form-item label="日期区间">
        <h-row>
          <h-col span="11">
            <h-form-item prop="dateStart"
                         required>
              <h-datePicker type="date"
                            placeholder="选择日期"
                            v-model="formItems.dateStart"></h-datePicker>
            </h-form-item>
          </h-col>
          <h-col span="2"
                 style="text-align: center">-</h-col>
          <h-col span="11">
            <h-form-item prop="dateEnd"
                         required>
              <h-timePicker type="date"
                            placeholder="选择日期"
                            v-model="formItems.dateEnd"></h-timePicker>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form-item>
      <h-form-item>
        <h-button type="primary"
                  @click="handleSubmit('formItems')">提交</h-button>
        <h-button type="primary"
                  @click="handleValidField('formItems','city')"
                  style="margin-left: 8px">校验</h-button>
        <h-button type="ghost"
                  @click="handleReset('formItems')"
                  style="margin-left: 8px">重置</h-button>
        <h-button type="ghost"
                  @click="handleResetValiFiled('formItems', 'city')"
                  style="margin-left: 8px">重置单个校验</h-button>
        <h-button type="ghost"
                  @click="handleResetVali('formItems')"
                  style="margin-left: 8px">重置所有校验</h-button>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItems: {
        name: '',
        mail: '',
        city: '',
        dateStart: '',
        dateEnd: ''
      },
      formRules: {
        mail: {
          validator: function(rule, value, callback) {
            if (!/@/.test(value)) {
              callback(new Error('错误的邮箱格式'))
            }

            callback()
          }
        }
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$hMessage.success('提交成功!')
        } else {
          this.$hMessage.error('表单验证失败!')
        }
      })
    },
    handleValidField(name, str) {
      this.$refs[name].validateField(str, valid => {
        if (valid) {
          this.$hMessage.error(valid)
        } else {
          this.$hMessage.success('校验正确')
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    handleResetValiFiled(name, prop) {
      this.$refs[name].resetValidateField(prop)
    },
    handleResetVali(name) {
      this.$refs[name].resetValidate()
    }
  }
}
</script>
