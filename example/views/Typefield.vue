<template>
  <div id="input" class="wrapper">
    <h1>TypeField 组件</h1>
    <h1>金额</h1>
    <h2>基本用法</h2>
    <p>未开启四舍五入 整数位2位，小数位3为</p>
    <h-typefield v-model="value" integerNum="2" suffixNum="3" type="money" placeholder="金额" bigTips isround></h-typefield>
    <h-button @click="getValue">获取值</h-button>
    <h-typefield integerNum="2" type="money" placeholder="金额" disabled></h-typefield>
    <h-typefield integerNum="2" type="money" placeholder="金额" readonly></h-typefield>
    <h-typefield integerNum="2" type="money" placeholder="金额" :editable="false"></h-typefield>
    <p>未开启四舍五入 整数位3位，小数位3为</p>
    <h-typefield integerNum="3" type="money" placeholder="金额" bigTips></h-typefield>
    <h-typefield integerNum="3" type="money" placeholder="金额" readonly></h-typefield>
    <h-typefield integerNum="3" type="money" placeholder="金额" disabled></h-typefield>
    <p>开启四舍五入</p>
    <h-typefield integerNum="2" suffixNum="2" type="money" placeholder="金额" bigTips isround></h-typefield>
    <h-typefield integerNum="2" suffixNum="3" type="money" placeholder="金额" bigTips isround></h-typefield>
    <h-typefield integerNum="2" suffixNum="4" type="money" placeholder="金额" bigTips isround></h-typefield>
    </br>
    <h1>卡号</h1>
    <h2>基本用法</h2>
    <h-typefield type="cardNo" placeholder="卡号" bigTips></h-typefield>
    </br>
    <h1>事件</h1>
    <h-typefield placeholder="焦点事件" @on-blur="bChange" @on-focus="fChange" @on-keyup="kChange"></h-typefield>
  </div>
</template>

<script>

export default {
  name: 'inputs',
  data() {
    return {
      value:'',
      msg:'this is input component'
    }
  },
  methods: {
    getValue(){
      console.log(this.value)
    },
    bChange(){
      console.log('输入框已失去焦点');
    },
    fChange(){
      console.log('输入框已获得焦点');
    },
    kChange(val){
      console.log('按钮事件已触发'+val);
    }
  } 
}
</script>