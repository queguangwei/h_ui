<template>
  <div>
    <h-select v-model="model1" style="width:200px">
      <h-option
        showTitle
        v-for="item in cityList"
        :value="item.value"
        :key="item.value"
      >{{ item.label }}</h-option>
    </h-select>
    <h-button @click="showMsg">msgBox</h-button>
    <h-msgBox v-model="modal" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <h-icon name="warning"></h-icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <h-select v-model="model1" style="width:200px">
          <h-option
            showTitle
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</h-option>
        </h-select>
      </div>
      <div slot="footer"></div>
    </h-msgBox>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal: false,
      cityList: [
        {
          value: "beijing",
          label: "北京市北京市北京市北京市北京市北京市北京市北京市北京市北京市"
        },
        {
          value: "shanghai",
          label: "上海市上海市上海市上海市上海市上海市上海市上海市上海市上海市"
        },
        {
          value: "shenzhen",
          label: "深圳市深圳市深圳市深圳市深圳市深圳市深圳市深圳市深圳市深圳市"
        },
        {
          value: "hangzhou",
          label: "杭州市"
        },
        {
          value: 1,
          label: "南京市"
        },
        {
          value: 2,
          label: "重庆市重庆市重庆市重庆市重庆市重庆市重庆市重庆市重庆市重庆市"
        }
      ],
      model1: 1
    };
  },
  methods: {
    showMsg() {
      this.modal = true
    }
  }
};
</script>
