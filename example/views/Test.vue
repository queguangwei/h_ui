<template>
<div>
  
    <h-row>
      <h2>基本用法</h2>
      <p>设置属性 type 为 date 或 daterange 分别显示选择单日和选择范围类型。<br>
        设置属性 placement 可以更改选择器出现的方向</p>
      <h-col span="12">
        <!-- <h-date-picker v-model="model1"  format="yyyy-MM-dd" type="date"  :options="options4"   style="width: 200px" @on-clickout="s" :showFormat="true" showToday></h-date-picker>{{model1}} -->
      </h-col>
      <h-col span="12">
        {{model2}}
        <h-date-picker v-model="model2" type="daterange" format="yyyy-MM-dd HH:mm"   @on-change="handleChange1"  placement="bottom-end" placeholder="选择日期" valueTypeArr> </h-date-picker>
       <br><br><br>
       {{model3}}
        <h-date-picker v-model="model3" type="date" @on-change="handleChange1" format="yyyy/MM/dd" showFormat valueTypeArr  placement="bottom-end" placeholder="选择日期"> </h-date-picker>     
      </h-col>
    </h-row>
</div>
</template>
<script>
    export default {
        data () {
            return {
                //  model2:["2018-08-16", "2018-08-23 "],
                 model2:"2017-11-13 00:00:00 - 2018-08-23 00:00:00 ",
                 model3:["2018-08-16", "2018-08-24"],
                //  model3:"2018-08-16 - 2018-08-24",

            }
        },
        methods: {
          handleChange1() {

          }
        }
    }
</script>