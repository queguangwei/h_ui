<template>
  <div id="input"
       class="wrapper">
    <h1>TypeField 组件</h1>
    <h1>金额</h1>
    <h2>基本用法</h2>
    <h1>algin设置左中右</h1>
    <h-button v-on:click="testClick">dd</h-button>
    {{value1}}
    <h-typefield v-model="value1"
                 integerNum="17"
                 suffixNum="2"
                 type="money"
                 :min="0"
                 :max="100"
                 :step="10"
                 placeholder="金额"
                 style="width:300px"
                 @on-focus="testFocus"
                 @on-keyup="reportParams"
                 algin="left"></h-typefield>

  </div>
</template>
/
<script>
export default {
  name: 'inputs',
  data() {
    return {
      value1: 0
    }
  },
  mounted() {
    window.isO45 = true
    // setTimeout(()=>{
    //   this.value11=null
    // },2000)
  },
  methods: {
    reportParams( ) {
      console.log(arguments)
    },
    testFocus() {
      this.value1 = 2.33833
    },
    testClick() {
      this.value1 = 2.33833
    }
  }
}
</script>
