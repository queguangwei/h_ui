<template>
  <div
    ref="container"
    v-click-outside="{trigger: 'mousedown', handler: onClickOutside}"
    :class="containerClass"
    @keydown="onContainerKeyDown"
  >
    <!-- 可视区域 -->
    <div ref="display" :title="magicString" :class="displayClass">
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
      isDropdownVisible: false, // 下拉面板是否处于可视状态
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
        const selectedRecords = [];
        for (const value of newVal) {
          const matched = this.blockVm.blockData.filter(item => item.value === value);
          if (matched.length) {
            for (const blockRecord of matched) {
              if (selectedRecords.some(item => item.label === blockRecord.label && item.value === blockRecord.value)) {
                continue; // make sure there are no repeated selected record
              }
              selectedRecords.push(blockRecord);
            }
          }
        }

        this.selectedRecords = selectedRecords.map(item => {
          const { label, value } = item;
          let target = { label, value };
          if (this.blockVm.showCol && this.blockVm.showCol.length > 0) {
            for (const col of this.blockVm.showCol) {
              target[col] = item[col] || "";
            }
          }
          return target;
        });
      } else {
        // if block is not ready, mostly happens at the very start
        // and under this circumstance, event on-ready or on-data-change will work
      }
    },
    selectedRecords(newVal) {
      this.$emit("input", newVal.map(item => item.value).join());
      this.$emit("on-change", this.labelInValue ? newVal.map(({ label, value }) => ({ label, value })) : newVal.map(item => item.value).join());
      this.blockVm.blockData.forEach(({ _index, label, value }) => {
        this.blockVm.$set(this.blockVm.blockData[_index], "selected", newVal.some(item => item.label === label && item.value === value));
      });

      this.$nextTick(() => {
        this.updateMagicString(false);
      });
    },
    magicString(newVal) {
      if (this.remote && this.remoteMethod) {
        const { selectedRecords: originalSelectedRecords, keywords: originalKeywords } = this.resolveMagicString();
        if (originalKeywords.length > 0) {
          this.isDropdownVisible = true;
          this.$emit("on-query-change", originalKeywords[originalKeywords.length - 1]);

          /**
           * @description remote-method should take done() as a flag when remote action finish
           * @example
           *   remoteMethod(key, done) {
           *     /// some code
           *     done(); // make sure I know when to continue
           *   }
           */
          this.remoteMethod(originalKeywords[originalKeywords.length - 1], () => {
            this.$nextTick(() => {
              const { selectedRecords, keywords } = this.resolveMagicString();
              this.selectedRecords = selectedRecords;
              this.$nextTick(() => {
                this.blockVm.onQuery(keywords.length > 0 ? keywords[keywords.length - 1] : "");
              });
            });
          });
        } else {
          this.$emit("on-query-change", "");
          this.selectedRecords = originalSelectedRecords;
          this.$nextTick(() => {
            this.blockVm.onQuery();
          });
        }
      } else {
        const { selectedRecords, keywords } = this.resolveMagicString();
        this.selectedRecords = selectedRecords;
        this.$nextTick(() => {
          if (keywords.length) {
            this.isDropdownVisible = true;
          }
          this.$emit("on-query-change", keywords.length > 0 ? keywords[keywords.length - 1] : "");
          this.blockVm.onQuery(keywords.length > 0 ? keywords[keywords.length - 1] : "");
        });
      }
    },
    isDropdownVisible(newVal) {
      this.$emit("on-drop-change", newVal);
      this.dropVisible = newVal; // 仅供外部调用，兼容老版本
      if (!newVal) {
        const { magicString: originalMagicString } = this;
        this.updateMagicString(true, magicString => {
          this.$refs.input.blur();
          this.$nextTick(() => {
            this.$refs.input.focus();
          });

          if (originalMagicString === magicString) {
            this.$emit("on-query-change", "");
            if (this.remote && this.remoteMethod) {
              this.remoteMethod("", () => this.$nextTick(this.blockVm.onQuery));
            } else {
              this.blockVm.onQuery();
            }
          }
        });
      }
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
          return;
        }

        if (this.blockVm) {
          const keyActionMap = new Map([["Up", "prev"], ["Down", "next"], ["Space", "click"]]);
          for (const [key, value] of keyActionMap.entries()) {
            if (_.isKeyMatch(e, key)) {
              e.preventDefault();
              this.blockVm.highlight(value);
              return;
            }
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

    /**
     * @description 魔法字符串的解析逻辑
     * @returns {Object} { selectedRecords, model, keywords }
     */
    resolveMagicString() {
      const splitMagicString = this.magicString === "" ? [] : this.magicString.split(",");
      let selectedRecords = [],
        model = [],
        keywords = [];

      for (const label of splitMagicString) {
        const matched = this.blockVm.blockData.filter(item => item.label === label);
        if (matched.length > 0) {
          for (const blockRecord of matched) {
            if (selectedRecords.some(item => item.label === blockRecord.label && item.value === blockRecord.value)) {
              continue; // make sure there are no repeated selected record
            }
            selectedRecords.push(blockRecord);
            model.push(blockRecord.value);
          }
        } else {
          keywords.push(label);
        }
      }

      return {
        splitMagicString,
        selectedRecords: selectedRecords.map(item => {
          const { label, value } = item;
          let target = { label, value };
          if (this.blockVm.showCol && this.blockVm.showCol.length > 0) {
            for (const col of this.blockVm.showCol) {
              target[col] = item[col] || "";
            }
          }
          return target;
        }),
        model,
        keywords
      };
    },
    /**
     * @description 监听 model 的变化，更新魔法字符串
     * @todo 这里有个小问题，这个更新逻辑会导致绑定的值改变两次
     * @param {Boolean} forceUpdate 是否强制更新，开启后将与已选项同步，否则将保留当前的查询关键字
     * @param {Function} cb callback 回调函数
     */
    updateMagicString(forceUpdate = true, cb) {
      if (forceUpdate) this.magicString = this.selectedRecords.map(item => item.label).join();
      else {
        const { splitMagicString, selectedRecords, keywords } = this.resolveMagicString();
        let newSplitMagicString = [];
        for (const label of splitMagicString) {
          if (!keywords.includes(label) && selectedRecords.some(item => item.label === label) && this.selectedRecords.every(item => item.label !== label)) {
            continue;
          }
          newSplitMagicString.push(label);
        }

        for (let index = this.selectedRecords.length - 1; index >= 0; index--) {
          const { label } = this.selectedRecords[index];
          !newSplitMagicString.includes(label) && newSplitMagicString.unshift(label);
        }

        this.magicString = newSplitMagicString.join();
      }

      this.$nextTick(() => {
        cb && cb(this.magicString);
      });
    }
  },
  created() {
    this.$on("on-ready", (blockVm, records) => {
      this.blockVm = blockVm; // block instance
      this.selectedRecords = records.filter(({ value }) => this.model.includes(value)); // on block ready, sync selectedRecords with model
    });
    this.$on("on-data-change", (blockVm, records) => {
      this.selectedRecords = records.filter(({ value }) => this.model.includes(value)); // on block data change, sync selectedRecords with model again
    });
    this.$on("on-selected", (blockVm, record) => {
      if (this.selectedRecords.some(item => item.label === record.label && item.value === record.value)) return false;
      else {
        this.selectedRecords.push(record);
      }
    });
    this.$on("on-cancel-selected", (blockVm, record) => {
      this.selectedRecords = this.selectedRecords.filter(item => item.label !== record.label && item.value !== record.value);
    });
  }
};
</script>