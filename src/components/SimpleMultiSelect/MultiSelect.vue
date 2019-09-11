<template>
  <div ref="container" v-click-outside="{trigger: 'mousedown', handler: onClickOutside}" :class="containerClass">
    <!-- 可视区域 -->
    <div ref="display" :title="tooltip" :class="displayClass" @click="onDisplayClick">
      <!-- 显示已选记录的数量 -->
      <p v-if="displaySelectedAmount" :class="[prefixCls + '-selected-num']">共选择 {{ selectedRecords.length }} 项</p>
      <!-- 搜索输入框 -->
      <!-- search="multiSelect" ??? -->
      <input
        ref="input"
        v-model="magicString"
        type="text"
        search="multiSelect"
        :tabindex="tabindex"
        :disabled="disabled"
        :readonly="readonly || !editable"
        :placeholder="placeholder || t('i.select.placeholder')"
        :class="[prefixCls + '-input']"
        style="width:100%"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keyup="onInputKeyup"
        @keydown="onInputKeydown"
      />
      <!-- 下拉箭头图标 -->
      <Icon
        ref="arrowb"
        name="unfold"
        :class="[prefixCls + '-arrow']"
        @click.native.stop="isDropdownVisible = !isDropdownVisible"
      ></Icon>
    </div>
    <!-- 下拉面板 -->
    <transition :name="transitionName" @after-leave="afterTransitionLeave">
      <drop
        ref="dropdown"
        v-show="isDropdownVisible"
        v-transfer-dom
        :dropWidth="dropWidth"
        :maxDropWidth="maxDropWidth"
        :multiple="multiple"
        :placement="placement"
        :data-transfer="transfer"
        :widthAdaption="widthAdaption"
        :class="dropClass"
      >
        <div ref="content" :class="[`${prefixCls}-dropdown-noline-content`]">
          <div ref="blockWrapper" id="blockWrapper" :class="[prefixCls + '-dropdown-list']">
            <slot></slot>
          </div>
        </div>
      </drop>
    </transition>
  </div>
</template>

<script>
import Locale from "../../mixins/locale";
import ClickOutside from "../../directives/clickoutside";
import TransferDom from "../../directives/transfer-dom";
import Drop from "./Dropdown.vue";
import Icon from "../Icon/Icon.vue";
import _ from "../..//util";
export default {
  components: { Drop, Icon },
  directives: { ClickOutside, TransferDom },
  mixins: [Locale],
  data() {
    return {
      prefixCls: "h-selectTable",
      filterable: true,
      multiple: true,
      isInputFocus: false, // 输入框是否处于活动状态
      isDropdownVisible: false, // 下拉框是否处于可视状态
      selectedRecords: [], // 已选记录集合
      magicString: "", // 神奇的字符串，输入框的绑定，已选记录的快览，搜索的关键字
      model: [] // 组件双向绑定的值
    };
  },
  props: {
    // 实现双向绑定
    value: {
      type: [String, Array],
      default: ""
    },
    // 设置输入框 tabindex
    tabindex: {
      type: [String, Number],
      default: 0,
      validator(value) {
        return parseInt(value) >= -1 && parseInt(value) <= 32767;
      }
    },
    // 设置下拉框的宽度,不设置时下拉框的宽度等于输入框宽度
    dropWidth: {
      type: [String, Number]
    },
    // 下拉框的自适应时设置的最大宽度，实际值会取输入框宽度与 maxDropWidth 的最大值
    maxDropWidth: {
      type: [String, Number],
      default: 500
    },
    // 弹窗的展开方向
    placement: {
      default: "bottom",
      validator(value) {
        return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"].includes(value);
      }
    },
    // 是否将弹层放置于 body 内，它将不受父级样式影响，从而达到更好的效果
    transfer: {
      type: Boolean,
      default: false
    },
    // 下拉框的宽度是否随着内容自适应，以 Simple-select 设置的宽度为最小宽度，最大宽度取输入框宽度与 maxDropWidth 的最大值
    widthAdaption: {
      type: Boolean,
      default: false
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
    // 输入框默认的提示信息
    placeholder: {
      type: String
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
    }
  },
  computed: {
    containerClass() {
      return [
        `${this.prefixCls}`,
        `${this.prefixCls}-multiple`,
        {
          [`${this.prefixCls}-visible`]: this.isDropdownVisible,
          [`${this.prefixCls}-disabled`]: this.disabled,
          [`${this.prefixCls}-readonly`]: this.readonly,
          [`${this.prefixCls}-editable`]: !this.editable
        }
      ];
    },
    displayClass() {
      return [`${this.prefixCls}-selection`];
    },
    // 是否展示已选记录的数量
    displaySelectedAmount() {
      return this.showTotalNum && !this.isInputFocus && this.selectedRecords.length > 2;
    },
    transitionName() {
      return this.placement.match(/^bottom/) ? "slide-up" : "slide-down";
    },
    dropClass() {
      return {
        ["h-select-dropdown-transfer"]: this.transfer
      };
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (typeof newVal === "string") {
          newVal = newVal === "" ? [] : newVal.split(",");
        }
        this.model = newVal;
      }
    },
    selectedRecords(newVal) {
      this.$emit("input", newVal.map(item => item.value).join());
      this.blockVm.blockData.forEach(({ _index, label, value }) => {
        this.blockVm.$set(this.blockVm.blockData[_index], "selected", newVal.some(item => item.label === label && item.value === value));
      });
    },
    magicString(newVal) {
      const splitVal = newVal === "" ? [] : newVal.split(",");
      let selectedRecords = [];
      let keywords = [];
      for (const label of splitVal) {
        const matched = this.blockVm.blockData.filter(item => item.label === label);
        if (matched.length) {
          selectedRecords = selectedRecords.concat(matched);
        } else {
          keywords.push(label);
        }
      }

      this.selectedRecords = selectedRecords;
      if (keywords.length) {
        this.blockVm.onQuery(keywords[keywords.length - 1]);
      }
    },
    model(newVal) {
      if (this.blockVm) {
        let selectedRecords = [];
        for (const value of newVal) {
          selectedRecords = selectedRecords.concat(this.blockVm.blockData.filter(item => item.value === value));
        }
        this.selectedRecords = selectedRecords.map(({ label, value }) => ({ label, value }));
        this.updateMagicString(false);
      }
    },
    isDropdownVisible(newVal) {
      if (newVal) {
      } else {
        this.updateMagicString(true);
      }
    }
  },
  methods: {
    onClickOutside() {
      this.isDropdownVisible = false;
      this.isInputFocus = false;
    },
    onDisplayClick() {
      if (this.disabled || this.readonly || !this.editable) return false;
      this.isDropdownVisible = true;
      this.isInputFocus = true;
    },
    onInputFocus(e) {
      e.target.selectionStart = 0;
      e.target.selectionEnd = this.magicString.length;
      this.$emit("on-focus");
    },
    onInputBlur() {
      this.$emit("on-blur");
    },
    onInputKeyup(e) {
      this.$emit("on-keyup", this.magicString, e);
    },
    onInputKeydown(e) {
      this.$emit("on-keydown", this.magicString, e);
    },

    /**
     * @description 监听 model 的变化更新魔法字符串
     * @public {Boolean} 打开 clearKeyword 可以保证 magicString 与 model 保持一致, 否则会保留魔法字符串中的未知关键字
     */
    updateMagicString(clearKeyword = true) {
      if (clearKeyword) {
        this.magicString = this.selectedRecords.map(item => item.label).join();
      } else {
        if (this.blockVm) {
          const splitMagicString = this.magicString === "" ? [] : this.magicString.split(",");
          const newMagicString = [];

          // 添加已选项
          for (const { label } of this.selectedRecords) {
            newMagicString.push(label);
          }

          // 保留未知关键字
          for (const label of splitMagicString) {
            if (this.blockVm.blockData.every(item => item.label !== label)) {
              newMagicString.push(label);
            }
          }

          this.magicString = newMagicString.join();
        }
      }
    },

    afterTransitionLeave() {
      this.blockVm.onQuery("");
    }
  },
  created() {
    this.$on("on-data-ready", (records, blockVm) => {
      this.blockVm = blockVm; // block instance
      this.selectedRecords = records.filter(({ value }) => this.model.includes(value));
      this.updateMagicString();
    });

    this.$on("on-selected", record => {
      if (this.selectedRecords.some(item => item.label === record.label && item.value === record.value)) return false;
      else {
        this.selectedRecords.push(record);
        this.$nextTick(() => {
          this.updateMagicString();
        });
      }
    });
    this.$on("on-cancel-selected", record => {
      this.selectedRecords = this.selectedRecords.filter(item => item.label !== record.label && item.value !== record.value);
      this.$nextTick(() => {
        this.updateMagicString();
      });
    });
  }
};
</script>