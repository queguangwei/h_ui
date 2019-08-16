<template>
  <div>
    <h1>普通组件使用</h1>
    <h-button type="primary" @click="modal1 = true">显示对话框</h-button>
    <h-msg-box
      v-model="modal1"
      title="普通的Modal对话框标题"
      :height="2503"
      :closable="true"
      :mask-closable="false"
       :scrollable="true"  
      :top="0"
      class-name="vertical-center-modal"
    >
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </h-msg-box>
  </div>
</template>
<script>
export default {
  name: "MsgBoxs",
  data() {
    return {
      modal1: false,
      modal2: false,
      modal_loading: false,
      modal3: false,
      val3: [],
      modal6: false,
      modal4: false,
      modal5: false,
      mulmodel: [],
      value: "",
      showModal2: false,
      options: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        },
        {
          value: "shenzhen",
          label: "深圳市"
        },
        {
          value: "hangzhou",
          label: "杭州市"
        },
        {
          value: "nanjing",
          label: "南京市"
        },
        {
          value: "chongqing",
          label: "重庆市"
        }
      ],
      baseData4: [
        {
          title: "parent",
          id: "1-0",
          children: [
            {
              title: "child1",
              id: "1-1",

              children: [
                {
                  title: "child1-1-1",
                  id: "1-1-1",
                  children: [
                    {
                      title: "child1-1-1-1",
                      id: "1-1-1-1"
                    }
                  ]
                },
                {
                  title: "child1-1-2",
                  id: "1-1-2"
                }
              ]
            },
            {
              title: "child2",
              id: "1-2",
              children: [
                {
                  title: "child1-2-1",
                  id: "1-2-1",
                  children: [
                    {
                      title: "child1-2-1-1",
                      id: "1-2-1-1"
                    }
                  ]
                },
                {
                  title: "child1-2-2",
                  id: "1-2-2"
                }
              ]
            },
            {
              title: "child3",
              id: "1-3",
              children: [
                {
                  title: "child1-3-1",
                  id: "1-3-1",
                  children: [
                    {
                      title: "child1-3-1-1",
                      id: "1-3-1-1"
                    }
                  ]
                },
                {
                  title: "child1-3-2",
                  id: "1-3-2"
                }
              ]
            },
            {
              title: "child4",
              id: "1-4",
              children: []
            },
            {
              title: "child5",
              id: "1-5",
              children: []
            }
          ]
        }
      ],
      columns6: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "年龄",
          key: "age",
          filters: [
            {
              label: "大于50岁",
              value: 1
            },
            {
              label: "小于50岁",
              value: 2
            }
          ],
          // filteredValue:['18','25'],
          filterMultiple: false,
          filterRemote(_this, arg1) {
            this.data5.push({
              name: "王小明1",
              age: 20,
              address: "北京市朝阳区芍药居",
              date: "2016-10-03"
            });
          },
          filterMethod(value, row) {
            if (value === 1) {
              return row.age > 50;
            } else if (value === 2) {
              return row.age < 50;
            }
          }
        },
        {
          title: "地址",
          key: "address",
          filters: [
            {
              label: "北京",
              value: "北京"
            },
            {
              label: "上海",
              value: "上海"
            },
            {
              label: "深圳",
              value: "深圳"
            }
          ],
          filterMethod(value, row) {
            return row.address.indexOf(value) > -1;
          }
        }
      ],
      data5: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
          date: "2016-10-03"
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗",
          date: "2016-10-01"
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道",
          date: "2016-10-02"
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    handleOpen() {
      console.log("opened");
    },
    canMax(e) {
      console.log(e);
    },
    onClose() {
      console.log("你点击了关闭按钮");
    },
    showSec() {
      this.modal4 = true;
    },
    vChange(s) {
      console.log(s);
    },
    ok() {
      this.$hNotice.info({ title: "点击了确定" });
    },
    cancel() {
      this.$hNotice.info({ title: "点击了取消" });
      return false;
    },
    del() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.modal2 = false;
        this.$hNotice.success({ title: "删除成功" });
      }, 2000);
    },
    instance(type) {
      const title = "对话框的标题";
      const content = "<p>一些对话框内容</p><p>一些对话框内容</p>";
      switch (type) {
        case "info":
          this.$hMsgBox.info({
            title: title,
            content: content,
            width: 800,
            scrollable: true,
            okText: "确定1",
            zIndex: 1100
            // loading:true
          });
          break;
        case "success":
          this.$hMsgBox.success({
            width: 600,
            title: title,
            content: content,
            zIndex: 1200
          });
          break;
        case "warning":
          this.$hMsgBox.warning({
            title: title,
            content: content,
            zIndex: 1300
          });
          break;
        case "error":
          this.$hMsgBox.error({
            title: title,
            content: content,
            zIndex: 1400
          });
          break;
      }
    },
    confirm() {
      this.$hMsgBox.confirm({
        title: "确认对话框标题",
        content: "<p>一些对话框内容</p><p>一些对话框内容</p>",
        onOk: () => {
          this.$hMsgBox.info({ title: "点击了确认" });
        },
        onCancel: () => {
          console.log("点击了取消");
        },
        okIcon: "search",
        cancelIcon: "search",
        isOkLeft: true
      });
    },
    custom() {
      this.$hMsgBox.confirm({
        title: "确认对话框标题",
        content: "<p>一些对话框内容</p><p>一些对话框内容</p>",
        okText: "OK",
        cancelText: "Cancel"
      });
    },
    async() {
      this.$hMsgBox.confirm({
        title: "确认对话框标题",
        content: "<p>对话框将在 2秒 后关闭</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$hMsgBox.remove();
            this.$hNotice.info({ title: "异步关闭了对话框" });
          }, 2000);
        },
        okIcon: "search",
        cancelIcon: "search",
        isOkLeft: false
      });
    },
    render() {
      var _this = this;
      this.$hMsgBox.confirm({
        render: h => {
          return h("h-input", {
            props: {
              value: _this.value,
              autofocus: true,
              placeholder: "Please enter your name..."
            },
            on: {
              input: val => {
                _this.value = val;
                if (val == "4") {
                  _this.destroy();
                }
              }
            }
          });
        }
      });
    },
    destroy() {
      this.$hMsgBox.remove();
    }
  },
  watch: {
    showModal2(val) {
      if (val) {
        // this.$refs.select.focus();
        this.options = [
          {
            value: "beijing",
            label: "北京市"
          }
        ];
      }
    }
  }
};
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
