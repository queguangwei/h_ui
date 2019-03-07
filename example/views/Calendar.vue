<template>
<div>
    <h-calendar :disableDate="disableDate"
    @on-click="sClick"
    @on-dblclick="dClick"
    @on-mouseover="oClick"
    @on-mouseout="mClick"></h-calendar>
    <h-calendar :currentYear="2020"></h-calendar>
    <h-calendar :currentYear="2020">
        <p slot="header">123</p>
    </h-calendar>
</div>
</template>

<script>
export default {
    data () {
        return {           
        }
    },
    methods: {
        sClick(i,j){
            console.log('s')
            console.log(i)
            console.log(j)
        },
        dClick(i,j){
            console.log('d')
            console.log(i)
            console.log(j)
        },
        oClick(i,j){
            console.log('o')
            console.log(i)
            console.log(j)
        },
        mClick(i,j){
            console.log('m')
            console.log(i)
            console.log(j)
        },
        disableDate (date) {
            return date && date.valueOf() < Date.now()&& date.valueOf() >= Date.now() - 86400000;
        }
    }
}
</script>
