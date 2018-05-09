<template>
	<div>	
    <h1>普通组件使用</h1>
    <h-button type="primary" @click="modal1 = true">显示对话框</h-button>
    <h-msg-box
      v-model="modal1"
      title="普通的Modal对话框标题"
      @on-ok="ok"
      @on-cancel="cancel"
      :closable="false"
      :mask-closable="false"
      :loading="true"
      :scrollable="false"
      @on-visible-change="vChange">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </h-msg-box>
    <h-button @click="modal2 = true">自定义页头和页脚</h-button>
    <h-msg-box v-model="modal2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <h-icon name="prompt"></h-icon>
        <span>删除确认</span>
      </p>
      <span slot="close">删除</span>
      <div style="text-align:center">
          <p>此任务删除后，下游 10 个任务将无法执行。</p>
          <p>是否继续删除？</p>
      </div>
      <div slot="footer">
          <h-button type="error" size="large" long :loading="modal_loading" @click="del">删除</h-button>
      </div>
    </h-msg-box>
    <h-button @click="modal3 = true">不带标题栏</h-button>
    <h-msg-box v-model="modal3">
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
    </h-msg-box>
    <h-button @click="modal4 = true">国际化</h-button>
    <h-msg-box
        v-model="modal4"
        title="Modal Title"
        ok-text="OK"
        cancel-text="Cancel">
        <p>Something...</p>
        <p>Something...</p>
        <p>Something...</p>
    </h-msg-box>
    <h-button @click="modal5 = true">设置宽度</h-button>
    <h-msg-box
        v-model="modal5"
        title="自定义宽度"
        width="300">
        <p>自定义宽度，单位 px，默认 520px。</p>
        <p>对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动<code>auto</code>。</p>
    </h-msg-box>
    <h1>实例化使用方法</h1>	
    <h2>基本用法</h2>
		<h-button @click="instance('info')">消息</h-button>
    <h-button @click="instance('success')">成功</h-button>
    <h-button @click="instance('warning')">警告</h-button>
    <h-button @click="instance('error')">错误</h-button>
    <h2>确认对话框</h2>
    <h-button @click="confirm">标准</h-button>
    <h-button @click="custom">自定义按钮文字</h-button>
    <h-button @click="async">异步关闭</h-button>
    <h2>自定义内容/有问题</h2>
    <h-button @click="render">自定义内容</h-button>{{value}}
    <h2>MsgBox</h2>
    <h-msg-box v-model="showModal2" title="弹窗" width="800px">
      <h-select :transfer="true" style="width:400px;">
        <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
      </h-select>
      <br><br><br><br><br>

      <h-tabs>
        <h-tab-pane label="演示" style="height: 1000px;">
          <h-select :transfer="true" style="width:400px;">
              <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-select>
          <h-select :transfer="true" style="width:400px;">
              <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-select>
          <h-select :transfer="true" style="width:400px;">
              <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-select>
          <h-select :transfer="true" style="width:400px;">
              <h-option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</h-option>
          </h-select>
        </h-tab-pane>
        <h-tab-pane label="演示1"></h-tab-pane>
      </h-tabs>
    </h-msg-box>
    <h-button @click="showModal2 = true">Modal无Tabs</h-button>
	</div>
</template>
<script>	
	export default{
		name:"MsgBoxs",
		data(){
			return {
        modal1: false,
        modal2: false,
        modal_loading: false,
        modal3: false,
        modal4: false,
        modal5: false,
        value: '',
        showModal2: false,
        options: [
            {
                value: 'beijing',
                label: '北京市'
            },
            {
                value: 'shanghai',
                label: '上海市'
            },
            {
                value: 'shenzhen',
                label: '深圳市'
            },
            {
                value: 'hangzhou',
                label: '杭州市'
            },
            {
                value: 'nanjing',
                label: '南京市'
            },
            {
                value: 'chongqing',
                label: '重庆市'
            }
        ],
      }
		},
		methods: {
      vChange(s){
        console.log(s);
      },
      ok () {
        this.$hNotice.info({title: '点击了确定'});
      },
      cancel () {
        this.$hNotice.info({title: '点击了取消'});
      },
      del () {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal2 = false;
          this.$hNotice.success({title: '删除成功'});
        }, 2000);
      },
      instance (type) {
        const title = '对话框的标题';
        const content = '<p>一些对话框内容</p><p>一些对话框内容</p>';
        switch (type) {
          case 'info':
            this.$hMsgBox.info({
                title: title,
                content: content,
                width:'800px',
                scrollable:true,
                okText:'确定1',
                loading:true
            });
            break;
          case 'success':
            this.$hMsgBox.success({
                title: title,
                content: content
            });
            break;
          case 'warning':
            this.$hMsgBox.warning({
                title: title,
                content: content
            });
            break;
          case 'error':
            this.$hMsgBox.error({
                title: title,
                content: content
            });
            break;
        }
      },
      confirm () {
        this.$hMsgBox.confirm({
          title: '确认对话框标题',
          content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
          onOk: () => {
            console.log('点击了确定');
          },
          onCancel: () => {
            console.log('点击了取消');
          }
        });
      },
      custom () {
        this.$hMsgBox.confirm({
          title: '确认对话框标题',
          content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
          okText: 'OK',
          cancelText: 'Cancel'
        });
      },
      async () {
        this.$hMsgBox.confirm({
          title: '确认对话框标题',
          content: '<p>对话框将在 2秒 后关闭</p>',
          loading: true,
          onOk: () => {
            setTimeout(() => {
              this.$hMsgBox.remove();
              this.$hNotice.info({title: '异步关闭了对话框'});
            }, 2000);
          }
        });
      },
      render () {
        var _this = this;
        this.$hMsgBox.confirm({
          render: (h) => {
            return h('h-input', {
              props: {
                value: _this.value,
                autofocus: true,
                placeholder: 'Please enter your name...'
              },
              on: {
                input: (val) => {
                  _this.value = val;
                  if (val=='4') {
                    _this.destroy();
                  }
                }
              }
            })
          }
        })
      },
      destroy () {
        this.$hMsgBox.remove();
      }
		}
	}
</script>
<style>
	
</style>