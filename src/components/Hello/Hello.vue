<template>
  <div :class="helloclass">
    {{msg}}
  </div>
</template>

<script>
const prefixCls = 'v-hello';
export default {
  name: 'Hello',
  data(){
    return {
      msg: 'hello jane !'
    }
  },
  created () {
    this.msg = 'bye!'
  },
  computed:{
    helloclass(){
      return `${prefixCls}-hello`
    }
  }

}
</script>