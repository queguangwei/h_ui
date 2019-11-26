<template>
<div>
    <h-row>
        <h-col span="12">
            <h-time-picker v-model="value1" format="HH’mm’ss" placeholder="选择时间" style="width: 168px"></h-time-picker>
        </h-col>
    </h-row>
</div>
</template>
<script>
    export default {
        data () {
            return {
                value1: '09:41:00',
            }
        }
    }
</script>