<template>
  <div>
    <h1>普通组件使用</h1>

    <h-button type="primary"
              @click="modal1 = true">显示对话框</h-button>
    <!-- <h-msg-box v-model="modal1"
               title="普通的Modal对话框标题"
               :height="2500"
               :scrollable="true"
               :top="0"
               isOriginal
               class-name="vertical-center-modal"> -->
    <h-msg-box v-model="modal1" maximize left=100 top=100>
      <p>对话框内容</p>
    </h-msg-box>

  </div>
</template>
<script>
export default {
  name: 'MsgBoxs',
  data() {
    return {
      modal1: false
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
