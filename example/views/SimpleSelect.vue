<template>
<div class="ceshi-demo">  
  <h1 >SimpleSelect组件</h1>
  <p>选择器支持单选、多选、搜索，以及键盘快捷操作。</p>
  <h1>selectBlock测试用例</h1>
  {{value2}}
  <h-simple-select v-model="value2" style="width:200px" transfer showBottom maxDropWidth="400" filterable autoPlacement widthAdaption placeholder="123" isArrow=false>
    <h-select-block :data="bigData" @on-scroll="select"></h-select-block>
  </h-simple-select>
  <h-button @on-click="loaddata">加载数据</h-button>
  <h-simple-select v-model="value2" style="width:200px" transfer filterable autoPlacement widthAdaption placeholder="123" isArrow=false>
    <h-select-block :data="bigData" @on-scroll="select"></h-select-block>
  </h-simple-select>
  <!-- <h-simple-select v-model="value1" multiple ref="test" placement="top-start" filterable checkToHead showBottom @on-change="change">
    <h-select-block :data="bigData" @on-scroll="select"></h-select-block>
  </h-simple-select>
  {{value1}}
  {{value}}
  <Button @on-click="changeValue">changeValue</Button>
  <h-simple-select v-model="value" ref="test" placement="bottom-start" @on-change="change" filterable>
    <h-select-block :data="bigData" @on-scroll="select"></h-select-block>
  </h-simple-select> -->
  <!-- <br><br><br><br><br><br><br><br><br><br><br><br> -->

</div>
</template>
<script>
let bigData = [];
for(let i=0;i<60;i++){
  let obj={};
  obj.value="value"+i;
  obj.label="labellabellabellalabellabella"+i;
  bigData.push(obj);
}

export default {
  data () {
    return {
      matchCol:['name','age'],
      bigData:[],
      value:'',
      value1:[],
      value2:'value2',
    }
  },
  methods: {
    loaddata(){
      this.bigData = bigData;
    },
    changeValue(){
      this.value = 'value1'
    },
    testClick(val){
      if (val) {
        this.$refs.test.focus();
      }else{
        this.$refs.test.blur();
      }
    },
    ceshi(){
      this.model1 = [];
      this.model2 = '';
    },
    change(e){
      console.log(e);
    },
    select(e,b){
      console.log(e);
      // console.log(b);
    },
    allSelect(e){
      console.log(e);
    },
    selsetChange(e){
      console.log(e);
    },
    scroll(num){
      console.log(num);
      let _this = this;
      if (num<=1 && _this.canPage) {
          _this.canPage = false;
          setTimeout(() => {
            console.log(_this.index);
              if (_this.index==0) {
                  _this.data1=_this.data1.concat(cdata);
                  _this.canPage = true;
                  _this.index =1;
              }else{
                  this.isComputed = true;
              }
          }, 200);
      }
    }

  },
  mounted(){
    // this.bigData = bigData;
    setTimeout(() => {
      this.value = "value0";
      this.value1 = ['value0'];
    }, 1000);
  },
  watch:{
    data1(val){
    }
  }
}
</script>
<style>
  .ceshi-demo{
    /* width: 200px;
    height: 160px;
    overflow: auto; */
  }
  p{
      font-size: 18px;
  }
</style>