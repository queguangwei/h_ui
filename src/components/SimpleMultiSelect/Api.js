import _ from "../..//util";

export const SimpleMultiSelectApi = {
  props: {
    // 指定选中项目的 value 值，可以使用 v-model 双向绑定数据，只支持 String，value 之间用 , 分隔
    value: {
      type: String,
      default: ""
    },
    // 输入框默认的提示信息
    placeholder: {
      type: String
    },
    // 弹窗的展开方向
    placement: {
      default: "bottom",
      validator(value) {
        return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end"].includes(value);
      }
    },
    // 是否将弹层放置于 body 内，它将不受父级样式影响，从而达到更好的效果
    transfer: {
      type: Boolean,
      default: false
    },
    // 设置下拉框的宽度,不设置时下拉框的宽度等于输入框宽度
    dropWidth: {
      type: [String, Number],
      default: 0
    },
    // 下拉框的自适应时设置的最大宽度，实际值会取输入框宽度与 maxDropWidth 的最大值
    maxDropWidth: {
      type: [String, Number],
      default: 500
    },
    // 下拉框的宽度是否随着内容自适应，以 Simple-select 设置的宽度为最小宽度，最大宽度取输入框宽度与 maxDropWidth 的最大值
    widthAdaption: {
      type: Boolean,
      default: false
    },
    // 下拉面板方向自适应，其相对于外部第一个非静态定位父元素开始定位
    autoPlacement: {
      type: Boolean,
      default: false
    },

    // 设置输入框 tabindex
    tabindex: {
      type: [String, Number],
      default: 0,
      validator(value) {
        return parseInt(value) >= -1 && parseInt(value) <= 32767;
      }
    },

    // 设置输入框为禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 设置输入框为只读
    readonly: {
      type: Boolean,
      default: false
    },
    // ??
    editable: {
      type: Boolean,
      default: true
    },

    // 鼠标在输入框悬浮时显示额外的提示信息
    tooltip: {
      type: String,
      default: ""
    },
    // 多选时离开焦点显示选择多少项
    showTotalNum: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String
    }
  },
  methods: {
    /**
     * @description 选择项置顶 或者 选择项恢复开始状态
     * @param {Boolean} status true/false
     */
    selectedTop(status) {
      this.blockVm && this.blockVm.selectedTop(status);
    },
    /**
     * @description 全选/全不选
     * @param {*} status true/false
     * @example this.$refs.xxx.toggleSelect()
     */
    toggleSelect(status) {
      if (this.blockVm) {
        this.selectedRecords = status
          ? this.blockVm.blockData.map(({ label, value }) => ({
              label,
              value
            }))
          : [];
        this.$nextTick(() => {
          this.updateMagicString();
        });
      }
    }
  }
};

export const SimpleMultiSelectBlockApi = {
  props: {
    // 选择框中数据，必填
    data: {
      type: Array,
      validator(value) {
        if (_.isArrayLikeObject(value)) {
          return value.length <= 0 || (value.length > 0 && typeof value[0]["label"] === "string" && typeof value[0]["value"] === "string");
        } else return false;
      },
      default() {
        return [];
      }
    }
  },
  methods: {
    /**
     * @description 选择项置顶 或者 选择项恢复开始状态
     * @param {Boolean} status true/false
     */
    selectedTop(status) {
      if (status) {
        this.blockData.sort((a, b) => {
          return a.selected && !b.selected ? -1 : 0;
        });
      } else {
        this.blockData.sort((a, b) => {
          return a._index < b._index ? -1 : 0;
        });
      }

      this.reset() && this.updateVisualData();
    }
  }
};
