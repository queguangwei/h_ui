<template>
    <div>
        <h3>datetime类型</h3>
        <h-row>
            <h-col span="12">
            <h-date-picker type="datetime" ref="date" @on-change="onChange" placeholder="选择日期和时间" style="width: 200px"></h-date-picker>
            </h-col>
            <h-col span="12">
            <h-date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></h-date-picker>
            </h-col>
        </h-row>
        <h3>datetimerange类型</h3>
        <h-row>
            <h-col span="12">
            <h-date-picker type="datetimerange" placeholder="选择日期和时间" style="width: 200px"></h-date-picker>
            </h-col>
            <h-col span="12">
            <h-date-picker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间（不含秒）" style="width: 200px"></h-date-picker>
            </h-col>
        </h-row>
    </div>
</template>
<script>
    export default {
      data() {
        return {

        }
      },
      methods: {
         onChange() {
           console.log('on-chnage')
           this.$refs.date.selectionMode = 'time'
         }
      },
    }

</script>
