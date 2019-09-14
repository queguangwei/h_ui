<template>
  <div
    ref="container"
    v-click-outside="{trigger: 'mousedown', handler: onClickOutside}"
    :class="containerClass"
    @keydown="onContainerKeyDown"
  >
    <!-- 可视区域 -->
    <div ref="display" :title="tooltip" :class="displayClass">
      <!-- 搜索输入框 -->
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
        @paste="onInputPaste"
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
    <drop
      ref="dropdown"
      v-transfer-dom
      :show="isDropdownVisible"
      :dropWidth="dropWidth"
      :maxDropWidth="maxDropWidth"
      :placement="placement"
      :autoPlacement="autoPlacement"
      :data-transfer="transfer"
      :widthAdaption="widthAdaption"
      :class="dropClass"
      @on-animation-end="onAnimationEnd"
    >
      <div ref="content" :class="[`${prefixCls}-dropdown-noline-content`]">
        <div ref="blockWrapper" id="blockWrapper" :class="[prefixCls + '-dropdown-list']">
          <slot></slot>
        </div>
        <div v-show="loading" :class="[prefixCls + '-block-loading']">{{ loadingText || t('i.select.loading') }}</div>
      </div>
    </drop>
  </div>
</template>

<script>
import Locale from "../../mixins/locale";
import { SimpleMultiSelectApi } from "./Api";
import ClickOutside from "../../directives/clickoutside";
import TransferDom from "../../directives/transfer-dom";
import Drop from "./Dropdown.vue";
import Icon from "../Icon/Icon.vue";
import _ from "../..//util";
export default {
  components: { Drop, Icon },
  directives: { ClickOutside, TransferDom },
  mixins: [Locale, SimpleMultiSelectApi],
  data() {
    return {
      prefixCls: "h-selectTable",
      isDropdownVisible: false, // 下拉框是否处于可视状态
      selectedRecords: [], // 已选记录集合
      magicString: "", // 神奇的字符串，输入框的绑定，已选记录的快览，搜索的关键字
      model: [] // 组件双向绑定的值
    };
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
    dropClass() {
      return {
        ["h-select-dropdown-transfer"]: this.transfer,
        [this.prefixCls + "-multiple"]: this.transfer,
        ["h-auto-complete"]: true
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
    model(newVal) {
      if (this.blockVm) {
        let selectedRecords = [];
        for (const value of newVal) {
          selectedRecords = selectedRecords.concat(this.blockVm.blockData.filter(item => item.value === value));
        }
        this.selectedRecords = selectedRecords.map(({ label, value }) => ({ label, value }));
        this.updateMagicString(false); // keep keyword of magic string
      }
    },
    selectedRecords(newVal) {
      this.$emit("input", newVal.map(item => item.value).join());
      this.$emit("on-change", this.labelInValue ? newVal.map(({ label, value }) => ({ label, value })) : newVal.map(item => item.value).join());
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
          selectedRecords = selectedRecords.concat(matched.map(({ label, value }) => ({ label, value })));
        } else {
          keywords.push(label);
        }
      }

      this.selectedRecords = selectedRecords;
      if (keywords.length) {
        this.isDropdownVisible = true;
        this.$emit("on-query-change", keywords[keywords.length - 1]);
        if (this.remote && this.remoteMethod) {
          /**
           * @description remote-method should take done() as a flag when remote action finish
           * @example
           *   remoteMethod(key, done) {
           *     /// some code
           *     done(); // make sure I know when to continue
           *   }
           */
          this.remoteMethod(keywords[keywords.length - 1], () => {
            this.$nextTick(() => {
              this.blockVm.onQuery(keywords[keywords.length - 1]);
            });
          });
        } else {
          this.blockVm.onQuery(keywords[keywords.length - 1]);
        }
      }
    },
    isDropdownVisible(newVal) {
      this.$emit("on-drop-change", newVal);
    }
  },
  methods: {
    onClickOutside() {
      this.isDropdownVisible = false;
    },
    onContainerKeyDown(e) {
      if (this.isDropdownVisible) {
        if (_.isKeyMatch(e, "Esc") || _.isKeyMatch(e, "Enter")) {
          this.isDropdownVisible = false;
          this.$refs.input.blur();
          this.$nextTick(() => {
            this.$refs.input.focus();
          });
        }

        if (this.blockVm) {
          if (_.isKeyMatch(e, "Up")) {
            e.preventDefault();
            this.blockVm.highlight("prev");
          }
          if (_.isKeyMatch(e, "Down")) {
            e.preventDefault();
            this.blockVm.highlight("next");
          }
          if (_.isKeyMatch(e, "Space")) {
            e.preventDefault();
            this.blockVm.highlight("click");
          }
        }
      }
    },
    onInputFocus(e) {
      e.target.selectionStart = 0;
      e.target.selectionEnd = this.magicString.length;
      this.$emit("on-focus");
      this.$emit("on-input-focus");
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
    onInputPaste(e) {
      this.$emit("on-paste", { oldval: this.magicString, newval: e.clipboardData.getData("text/plain") });
    },
    onAnimationEnd() {
      if (!this.isDropdownVisible) {
        this.updateMagicString(true);
        this.blockVm && this.blockVm.onQuery();
      }
    },

    /**
     * @description 监听 model 的变化更新魔法字符串
     * @param {Boolean} clearKeyword 打开 clearKeyword 可以保证 magicString 与 model 保持一致, 否则会保留魔法字符串中的未知关键字
     * @param {Function} cb 回调函数
     */
    updateMagicString(clearKeyword = true, cb) {
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

      this.$nextTick(() => cb && cb(this.magicString));
    }
  },
  created() {
    this.$on("on-ready", (data, blockVm) => {
      this.blockVm = blockVm; // block instance
    });
    this.$on("on-data-change", (records, blockVm) => {
      this.selectedRecords = records.filter(({ value }) => this.model.includes(value)); // on-data-change 之后, 先同步一次 model
      this.updateMagicString(false); // keep keyword of magic string
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