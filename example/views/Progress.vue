<template>
  <div>
    <h1>Progress组件</h1>
    <h2>基本用法</h2>
  	<h-progress :percent="25" status="success"></h-progress>
  	<h-progress :percent="45" status="active"></h-progress>
  	<h-progress :percent="65" status="wrong"></h-progress>
  	<h-progress :percent="100"></h-progress>
  	<h-progress :percent="25" hide-info></h-progress>
  	<h2>配合外部组件使用</h2>
  	<h-progress :percent="percent"></h-progress>
    <h-button-group size="large">
      <h-button  @click="add">+</h-button>
      <h-button  @click="minus">-</h-button>
    </h-button-group>
    <h2>自定义样式</h2>
    <h-progress :percent="25" :stroke-width="5"></h-progress>
    <h-progress :percent="100">
      <h-icon name="right"></h-icon>
      <span>成功</span>
    </h-progress>
    <h1>垂直</h1>
    <div style="height: 100px;">
      <h-progress vertical :percent="25"></h-progress>
      <h-progress vertical :percent="45" status="active"></h-progress>
      <h-progress vertical :percent="65" status="wrong"></h-progress>
      <h-progress vertical :percent="100"></h-progress>
      <h-progress vertical :percent="25" hide-info></h-progress>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
    	return {
    	  percent: 0
    	}
    },
    methods: {
    	add () {
    		if (this.percent >= 100) {
          return false;
        }
        this.percent += 10;
    	},
    	minus () {
        if (this.percent <= 0) {
          return false;
        }
        this.percent -= 10;
      }
    }
  }
</script>