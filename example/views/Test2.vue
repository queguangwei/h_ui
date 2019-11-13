<template>
  <h-typefield placeholder="焦点事件" v-model="test" divided @on-blur="bChange" @on-change="change" @on-enter="enter"></h-typefield>
</template>
<script>
    export default {
        data () {
            return {
                spinShow: true,
                test: ''
            }
        },
        methods:{
            bChange(){
              console.log('输入框已失去焦点');
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
