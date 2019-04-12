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
     <p>单选且带有render特殊样式</p>
    <h-calendar :disableDate="disableDatelist"
    :multiSelect="multi" 
    @on-select="oselect" 
    :dateCellRender="dateRender">
    </h-calendar>
</div>
</template>

<script>
export default {
    data () {
        return {  
             multi:false,
            disableDatelist:['2019-01-02','2019-03-03','2019-04-02','2019-08-12']          
        }
    },
    methods: {
        dateRender(h, data) {
           if(data&&data.date.getDate()==15){
             return h('div', {
                style: {
                color:'blue'
                },
                'class':{
                    [`costum-style`]:true
                }
             }, [data != null ? '' + data.date.getDate() : ''])
           }else{
                return h('span', {}, [data != null ? '' + data.date.getDate() : ''])
           }

       },
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
        },
         oselect(i,j){
             console.log('select')
            console.log(j)
        }
    }
}
</script>
<style>
 .costum-style{
    border:solid 1px slateblue;
    height: 36px;
    width:100%;
 }

</style>