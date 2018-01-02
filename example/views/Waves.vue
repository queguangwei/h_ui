<template>
  <div>
    <h1>Waves水波纹</h1>
    <h1>按钮水波纹</h1>
    <h-button type="info" size="large" v-wave="{color:'white'}">紫色 Waves</h-button>
    <h-button type="success" size="large" v-wave.light>浅色 Waves</h-button>
    <h-button type="error" size="large" v-wave.light>浅色 Waves</h-button>
    <h1>其他元素</h1>
    <div class="e-waves" v-wave="{color:'green'}">div 绿色 Waves</div>
    <div class="e-waves" v-wave="{color:'white'}">div 绿色 Waves</div>
    <div class="e-waves" v-wave="{color:'yellow'}">div 绿色 Waves</div>
    <div class="e-waves" v-wave="{color:'purple'}">div 绿色 Waves</div>
  </div>
</template>

<script>

export default {
  name: 'waves',
  data() {
    return {
    }
  } 
}
</script>
<style type="text/css">
.e-waves{
  margin-top: 50px;
  width: 150px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: grey;
  color: white;
}
</style>