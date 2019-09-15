<template>
  <div ref="block" @scroll="onScroll" :class="blockCls">
    <!-- main content -->
    <ul ref="content" :class="[prefixCls+'block-content']">
      <li
        v-for="(item, inx) in visualData"
        v-show="!item.hidden"
        :key="inx"
        :class="genItemCls(item)"
        @click.stop="onItemClick(item)"
      >
        <slot>
          <span :class="{itemcol: showCol.length > 0}" style="width: 100px;">
            <checkbox size="large" :value="item.selected" :disabled="item.disabled"></checkbox>
            {{item.label || item.value}}
          </span>
        </slot>
        <span v-for="col in showCol" :key="col" class="itemcol" style="width: 100px;">{{item[col] || item.label}}</span>
      </li>
    </ul>

    <!-- work with different status -->
    <div v-if="!loading && filteredData.length <= 0" :class="[prefixCls+'-empty']">{{ t("i.select.noMatch") }}</div>
    <div v-if="loading && filteredData.length === 0" :class="[prefixCls+'-loading-placeholder']">&nbsp;</div>
  </div>
</template>

<script>
import Locale from "../../mixins/locale";
import { SimpleMultiSelectBlockApi } from "./Api";
import Checkbox from "../Checkbox/Checkbox.vue";
import { getBarBottom, getScrollBarSize } from "../../util/tools";
export default {
  components: { Checkbox },
  mixins: [Locale, SimpleMultiSelectBlockApi],
  data() {
    return {
      prefixCls: "h-select-block",
      blockData: [], // 所有的数据集合
      visualData: [] // 可视区域的数据集合
    };
  },
  computed: {
    blockCls() {
      return [`${this.prefixCls}-drop`, `${this.prefixCls}-multiple`];
    },
    // 继承已选的数据集合
    selectedRecords() {
      return this.$parent.$parent.selectedRecords;
    },
    // 继承 loading 状态
    loading() {
      return this.$parent.$parent.loading;
    },
    // 继承 specialIndex
    specialIndex() {
      return this.$parent.$parent.specialIndex;
    },
    // 继承 specialVal
    specialVal() {
      return this.$parent.$parent.specialVal;
    },
    // 搜索过滤后的数据集合
    filteredData() {
      return this.blockData.filter(item => !item.hidden);
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        let blockData = [];
        if (this.selectedRecords) {
          blockData = blockData.concat(this.selectedRecords.map(item => ({ ...item, selected: true })));
        }

        for (const item of newVal) {
          if (blockData.some(({ label, value }) => label === item.label && value === item.value)) {
            continue;
          }
          blockData.push({ ...item, selected: false });
        }

        this.blockData = blockData.map((item, index) => ({
          ...item,
          _index: index,
          focus: false,
          disabled: false,
          hidden: false
        }));

        // reset on data change
        this.reset() && this.updateVisualData();
        this.emit(-2, "on-data-change", this.blockData.map(({ label, value }) => ({ label, value })));
      }
    }
  },
  methods: {
    onScroll(e) {
      const { target } = e,
        { scrollTop } = target;
      const direction = this.lastScollTop === scrollTop ? "x" : "y"; // detect scroll directory

      this.lastScollTop = scrollTop;
      this.lastScollBottom = getBarBottom(target, getScrollBarSize());
      if (this.lastScollBottom) {
        this.$emit("on-scroll", this.lastScollBottom, this.lastScollTop, direction);
      }

      this.updateVisualData(scrollTop);
    },
    updateVisualData(scrollTop = this.lastScollTop || 0) {
      const blockData = this.blockData.filter(item => !item.hidden);
      const visualCount = 20; // visual count of dropdown panel
      const itemHeight = 30; // height of single item
      const start = Math.floor(scrollTop / itemHeight);
      let i = 0,
        end = start;

      while (i < visualCount) {
        if (!blockData[end]) {
          i = visualCount;
          end = blockData.length;
        } else {
          i++;
          end++;
        }
      }

      this.visualData = blockData.slice(start, end);
      this.$refs.content.style.transform = `translateY(${start * itemHeight}px)`;
      this.emit(-1, "on-static-update"); // update dropdown panel
    },
    genItemCls(item) {
      return [
        `${this.prefixCls}-item`,
        {
          [`${this.prefixCls}-disabled`]: item.disabled || false,
          [`${this.prefixCls}-selected`]: item.selected || false,
          [`${this.prefixCls}-focus`]: item.focus || false
        }
      ];
    },
    onItemClick(item) {
      const { _index, selected, label, value } = item;

      // 关于为什么要加这个状态，这是个很玄学的问题 ～～
      // 它是用在查询操作里面的
      // 不妨这样理解，在选择过程中分发出来的查询请求一律打回
      this.isSelecting = true;

      // specialIndex && specialVal
      if (this.specialIndex && this.specialVal) {
        if (this.specialVal === value && !selected) {
          this.$parent.$parent.toggleSelect(false);
        } else {
          const specialItemIndex = this.blockData.findIndex(item => item.value === this.specialVal);
          if (specialItemIndex >= 0 && this.blockData[specialItemIndex]["selected"]) {
            this.$set(this.blockData[specialItemIndex], "selected", false);
            this.emit(-2, "on-cancel-selected", { label: this.blockData[specialItemIndex]["label"], value: this.blockData[specialItemIndex]["value"] });
          }
        }
      }

      this.$set(this.blockData[_index], "selected", !selected);
      this.emit(-2, selected ? "on-cancel-selected" : "on-selected", { label, value });
    },

    onQuery(keyword = "") {
      // 再一次说，在选择过程中分发出来的查询请求一律打回
      if (this.isSelecting) {
        this.isSelecting = false;
        return false;
      }

      keyword = keyword.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, "\\$1");
      for (const item of this.blockData) {
        const { _index, selected, label, value } = item;
        if (keyword === "" || selected) {
          this.$set(this.blockData[_index], "hidden", false); // 已选项默认不参加模糊查询
        } else {
          this.$set(this.blockData[_index], "hidden", !new RegExp(keyword, "i").test(label) && !new RegExp(keyword, "i").test(value));
        }
      }
      this.reset() && this.updateVisualData();
    },

    highlight(action) {
      if (action === "prev") {
        if (this.highlightIndex < 0) {
          this.highlightIndex = this.filteredData.length - 1;
          this.$el.scrollTop = 30 * this.highlightIndex;
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", true);
        } else if (this.highlightIndex === 0) {
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", false);
          this.highlightIndex = this.filteredData.length - 1;
          this.$el.scrollTop = 30 * this.highlightIndex;
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", true);
        } else if (this.highlightIndex > 0) {
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", false);
          this.$el.scrollTop = 30 * --this.highlightIndex;
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", true);
        }
      }

      if (action === "next") {
        if (this.highlightIndex < 0) {
          this.$set(this.blockData[this.filteredData[++this.highlightIndex]["_index"]], "focus", true);
        } else if (this.highlightIndex >= 0 && this.highlightIndex < this.filteredData.length - 1) {
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", false);
          this.$el.scrollTop = 30 * ++this.highlightIndex;
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", true);
        } else if (this.highlightIndex >= this.filteredData.length - 1) {
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", false);
          this.highlightIndex = 0;
          this.$el.scrollTop = 30 * this.highlightIndex;
          this.$set(this.blockData[this.filteredData[this.highlightIndex]["_index"]], "focus", true);
        }
      }

      if (action === "click") {
        this.onItemClick(this.filteredData[this.highlightIndex]);
      }
    },

    // 重置高亮的下拉项和滚动条位置
    reset() {
      for (const item of this.blockData) {
        const { _index, focus } = item;
        if (focus) {
          this.$set(this.blockData[_index], "focus", false);
        }
      }

      this.highlightIndex = -1;
      this.$el.scrollTop = 0;

      return true;
    },

    /**
     * @description emit up event with data
     * @param layer {number} up layer, -1 => $parent, -2 => $parent.$parent ..
     * @param eventName {String} event name
     */
    emit(layer = -1, eventName) {
      if (layer >= 0) return false;

      const args = [...arguments];
      let _this = this;
      let i = 0;

      // find the parent by layer
      while (i > layer) {
        _this = _this.$parent;
        i--;
      }

      _this.$emit.apply(_this, [eventName, this, ...args.slice(2)]);
    }
  },
  mounted() {
    this.blockData = this.data.map((item, index) => ({
      ...item,
      _index: index,
      focus: false,
      selected: false,
      disabled: false,
      hidden: false
    }));

    // initialize
    this.reset() && this.updateVisualData();
    this.emit(-2, "on-ready", this.blockData.map(({ label, value }) => ({ label, value })));
  }
};
</script>