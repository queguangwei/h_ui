<template>
  <div>
    <h1>基础用法</h1>
    {{value1}}
    <h-input-number :max="10000"
                    :min="0"
                    :step="100"
                    v-model="value1"
                    style="width:200px"
                    @on-change="changee"
                    :precision="2">
      <span slot="append">px</span>
    </h-input-number>
    <Button @click="testClick()">获取焦点</Button>
  

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
      value2: 0,
      value3: 3,
      value4: 4,
      value5: 5,
      disabled: true,
      value6: 1,
      value7: 0,
      value8: 0.0000007
    }
  },
  methods: {
    changee(){
      console.log("change!")
      this.value1=100
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
