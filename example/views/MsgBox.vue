<template>
  <div>
    <h1>普通组件使用</h1>

    <h-button type="primary"
              @click="cclickk">显示对话框</h-button>
    <h-msg-box v-model="modal1"
               title="普通的Modal对话框标题"
               :height="112"
               :top="0"
               maximize
               class-name="vertical-center-modal">
      <!-- <h-select v-model="model1"
                style="width:200px">
        <h-option v-for="item in cityList"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</h-option>
      </h-select> -->
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
  lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
    </h-msg-box>
    <!-- <h-msg-box v-model="modal1" maximize :left="100" :top="100">
      <p>对话框内容</p>
    </h-msg-box> -->

  </div>
</template>
<script>
export default {
  name: 'MsgBoxs',
  data() {
    return {
      modal1: false,
      cityList: [
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 13
        },
        {
          value: 11,
          label: 13
        },
        {
          value: 15,
          label: 14
        },
        {
          value: 16,
          label: 11
        },
        {
          value: 22,
          label: 131
        },
        {
          value: 223,
          label: 143
        },
        {
          value: 224,
          label: 13
        },
        {
          value: 225,
          label: 131
        },
        {
          value: 226,
          label: 131
        },
        {
          value: 221,
          label: 137
        }
      ]
    }
  },
  methods: {
    cclickk() {
      this.modal1 = true
      // this.$hMsgBox.confirm({
      //   content: '111',
      //   cancelType: 'ghost',
      //   maximize:true
      // })
    }
  }
}
</script>
<style>
.tabWarp {
  overflow: auto;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  /*justify-content: center;*/
}
</style>
