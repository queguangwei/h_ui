<template>
  <h-typefield placeholder="焦点事件" @on-blur="bChange" @on-focus="fChange" @on-keyup="kChange" @on-change="change" @on-enter="enter"></h-typefield>
</template>
<script>
    export default {
        data () {
            return {
                spinShow: true
            }
        },
        methods:{
            bChange(){
              console.log('输入框已失去焦点');
            },
            fChange(){
              console.log('输入框已获得焦点');
            },
            kChange(val){
              console.log('按钮事件已触发'+val);
            },
            change(val, oldval) {
              console.log(val, oldval)
            },
            enter(){
              console.log('enter')
            }
        }
    }
</script>
