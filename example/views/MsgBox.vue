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
      <h-msg-box v-model="modal1">
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
  },
  methods: {
    showHeader() {
      console.log(document.getElementsByClassName('h-modal-header')[0])
    },
    handleOpen() {
      console.log('opened')
    },
    canMax(e) {
      console.log(e)
    },
    onClose() {
      console.log('你点击了关闭按钮')
    },
    showSec() {
      this.modal4 = true
    },
    vChange(s) {
      console.log(s)
    },
    ok() {
      this.$hNotice.info({ title: '点击了确定' })
    },
    cancel() {
      this.$hNotice.info({ title: '点击了取消' })
      return false
    },
    del() {
      this.modal_loading = true
      setTimeout(() => {
        this.modal_loading = false
        this.modal2 = false
        this.$hNotice.success({ title: '删除成功' })
      }, 2000)
    },
    instance(type) {
      const title = '对话框的标题'
      const content = '<p>一些对话框内容</p><p>一些对话框内容</p>'
      switch (type) {
        case 'info':
          this.$hMsgBox.info({
            title: title,
            content: content,
            width: 800,
            scrollable: true,
            okText: '确定1',
            zIndex: 1100
            // loading:true
          })
          break
        case 'success':
          this.$hMsgBox.success({
            width: 600,
            title: title,
            content: content,
            zIndex: 1200
          })
          break
        case 'warning':
          this.$hMsgBox.warning({
            title: title,
            content: content,
            zIndex: 1300
          })
          break
        case 'error':
          this.$hMsgBox.error({
            title: title,
            content: content,
            zIndex: 1400
          })
          break
      }
    },
    confirm() {
      this.$hMsgBox.confirm({
        title: '确认对话框标题',
        content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
        onOk: () => {
          this.$hMsgBox.info({ title: '点击了确认' })
        },
        onCancel: () => {
          console.log('点击了取消')
        },
        okIcon: 'search',
        cancelIcon: 'search',
        isOkLeft: true
      })
    },
    custom() {
      this.$hMsgBox.confirm({
        title: '确认对话框标题',
        content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
        okText: 'OK',
        cancelText: 'Cancel'
      })
    },
    async() {
      this.$hMsgBox.confirm({
        title: '确认对话框标题',
        content: '<p>对话框将在 2秒 后关闭</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$hMsgBox.remove()
            this.$hNotice.info({ title: '异步关闭了对话框' })
          }, 2000)
        },
        okIcon: 'search',
        cancelIcon: 'search',
        isOkLeft: false
      })
    },
    render() {
      var _this = this
      this.$hMsgBox.confirm({
        render: h => {
          return h('h-input', {
            props: {
              value: _this.value,
              autofocus: true,
              placeholder: 'Please enter your name...'
            },
            on: {
              input: val => {
                _this.value = val
                if (val == '4') {
                  _this.destroy()
                }
              }
            }
          })
        }
      })
    },
    destroy() {
      this.$hMsgBox.remove()
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
