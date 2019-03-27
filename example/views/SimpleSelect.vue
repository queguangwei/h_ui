<template>
  <div class="ceshi-demo">
    <h1>SimpleSelect组件</h1>
    <p>选择器支持单选、多选、搜索，以及键盘快捷操作。</p>
    <h1>selectBlock测试用例</h1>
    {{value2}}
    <h-simple-select autoPlacement
                     filterable
                     placeholder="123"
                     style="width:200px"
                     v-model="value2"
                     widthAdaption>
      <h-select-block :data="bigData"
                      @on-scroll="select"></h-select-block>
    </h-simple-select>
    <h-button @on-click="loaddata">加载数据</h-button>
    <h-simple-select autoPlacement
                     filterable
                     isArrow="false"
                     multiple
                     placeholder="123"
                     showBottom
                     style="width:200px"
                     transfer
                     v-model="value1"
                     widthAdaption>
      <h-select-block :data="bigData"
                      @on-scroll="select"></h-select-block>
    </h-simple-select>
    <h1>--------- HUI_V1.0.31_20190321 TS:201903110539 ---------</h1>
    <h-simple-select autoPlacement
                     filterable
                     isArrow="false"
                     placeholder="123"
                     style="width:200px"
                     transfer
                     v-model="v20190321.value"
                     widthAdaption>
      <h-select-block :data="v20190321.options2"></h-select-block>
    </h-simple-select>
    <h-simple-select autoPlacement
                     filterable
                     isArrow="false"
                     placeholder="123"
                     showBottom
                     style="width:200px"
                     transfer
                     v-model="v20190321.value2"
                     widthAdaption>
      <h-select-block :data="v20190321.options2"></h-select-block>
    </h-simple-select>
     <h1>远程搜索</h1>
    <h-simple-select width="200"
      v-model="valueRemote"
      filterable
      remote          
      :remote-method="remoteMethod"
      >
      <h-select-block :data="remoteData"></h-select-block>
      <div slot="footer">我是fotter</div>
    </h-simple-select>
    {{valueRemote}}
  </div>
</template>
<script>
let bigData = [];
for (let i = 0; i < 60; i++) {
  let obj = {};
  obj.value = "value" + i;
  obj.label = "lab" + i;
  bigData.push(obj);
}
export default {
  data() {
    return {
      matchCol: ["name", "age"],
      bigData: [],
      value: "",
      value1: [],
      value2: "value2",
      v20190321: {
        options: [
          {
            value: "1",
            label: "1"
          },
          {
            value: "11",
            label: "11"
          },
          {
            value: "112",
            label: "112"
          },
          {
            value: "2",
            label: "2"
          },
          {
            value: "3",
            label: "3"
          }
        ],
        options2: [
          { value: "1", label: "中国" },
          { value: "2", label: "美国" },
          { value: "3", label: "韩国1" },
          { value: "4", label: "韩国2" },
          { value: "5", label: "韩国3" },
          { value: "6", label: "韩国4" },
          { value: "7", label: "韩国5" },
          { value: "8", label: "韩国6" },
          { value: "9", label: "韩国7" },
          { value: "10", label: "韩国8" },
          { value: "11", label: "韩国9" },
          { value: "12", label: "韩国10" },
          { value: "13", label: "韩国11" },
          { value: "14", label: "韩国12" },
          { value: "15", label: "韩国13" }
        ],
        value: "",
        value2: ""
      },
      remoteData:[],
      valueRemote:'',
    };
  },
  methods: {
    loaddata() {
      this.bigData = bigData;
    },
    changeValue() {
      this.value = "value1";
    },
    testClick(val) {
      if (val) {
        this.$refs.test.focus();
      } else {
        this.$refs.test.blur();
      }
    },
    ceshi() {
      this.model1 = [];
      this.model2 = "";
    },
    change(e) {
      console.log(e);
    },
    select(e, b) {
      console.log(e)
      console.log(b)
    },
    allSelect(e) {
      console.log(e);
    },
    selsetChange(e) {
      console.log(e);
    },
    scroll(num) {
      console.log(num);
      let _this = this;
      if (num <= 1 && _this.canPage) {
        _this.canPage = false;
        setTimeout(() => {
          console.log(_this.index);
          if (_this.index == 0) {
            _this.data1 = _this.data1.concat(cdata);
            _this.canPage = true;
            _this.index = 1;
          } else {
            this.isComputed = true;
          }
        }, 200);
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading1 = true;
        setTimeout(() => {
          this.loading1 = false;
          this.remoteData = bigData.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        }, 200);
      } else {
        this.remoteData = bigData;
      }
    }
  },
  mounted() {
    // this.bigData = bigData;
    setTimeout(() => {
      this.value = "value0";
      this.value1 = ["value0"];
    }, 1000);
  },
  watch: {
    data1() {}
  }
};
</script>
<style>
.ceshi-demo {
  /* width: 200px;
    height: 160px;
    overflow: auto; */
}
p {
  font-size: 18px;
}
</style>
