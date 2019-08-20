<template>
  <div>
    <h1>基础用法</h1>
    {{value1}}
    <h-input-number :max="10000"
                    :min="0"
                    :step="100"
                    v-model="value1"
                    style="width:200px"
                    :precision="2">
      <span slot="append">px</span>
    </h-input-number>
    <Button @click="testClick()">获取焦点</Button>
    <h-input-number :max="10000"
                    :min="0"
                    :step="100"
                    v-model="value1"
                    style="width:200px"
                    @on-change="changee"
                    :precision="2">
      <span slot="append">px</span>
    </h-input-number>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'InputNum',
  data() {
    return {
      value1: 0,
      onee: true
    }
  },
  methods: {
    changee() {
      console.log('触发change！！')
      this.value1 = Math.floor(this.value1 / 100) * 100
    },
    testClick() {
      this.$refs.input.focus()
    },
    focusEvent(e) {
      console.log('focus', e)
    },
    blurEvent(e) {
      console.log('blur', e)
    }
  },
  watch: {
    value7(nv) {
      console.log(nv, 'value7')
    },
    value8(nv) {
      console.log(nv, 'value8')
    }
  }
}
</script>
