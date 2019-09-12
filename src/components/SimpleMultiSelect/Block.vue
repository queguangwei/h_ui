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
          <p>
            <checkbox size="large" :value="item.selected" :disabled="item.disabled"></checkbox>
            {{item.label || item.value}}
          </p>
        </slot>
      </li>
    </ul>

    <!-- work with different status -->
    <div
      v-if="!$parent.$parent.loading && filteredData.length <= 0"
      :class="[prefixCls+'-empty']"
    >{{ t("i.select.noMatch") }}</div>
    <div v-if="$parent.$parent.loading && filteredData.length === 0" :class="[prefixCls+'-loading-placeholder']">&nbsp;</div>
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
    // 继承 loading 状态
    loading() {
      return this.$parent.$parent.loading;
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
        this.blockData = JSON.parse(
          JSON.stringify(
            newVal.map((item, index) => {
              return {
                ...item,
                _index: index,
                focus: false,
                selected: false,
                disabled: false,
                hidden: false
              };
            })
          )
        );

        // initialize
        this.reset() && this.updateVisualData();
        this.$nextTick(() => {
          this.emit(-2, "on-data-ready", newVal.map(({ label, value }) => ({ label, value })));
        });
      }
    }
  },
  methods: {
    onScroll(e) {
      const { target } = e;
      const { scrollTop } = target;
      const direction = this.lastScollTop === scrollTop ? "x" : "y"; // detect scroll directory

      this.lastScollTop = scrollTop;
      this.lastScollBottom = getBarBottom(target, getScrollBarSize());
      if (this.lastScollBottom) {
        this.$emit("on-scroll", this.lastScollBottom, this.lastScollTop, direction);
      }

      this.updateVisualData(scrollTop);

      // 修复滚动后出现 x 滚动条问题
      // this.$parent.widthAdaption && this.$parent.setWidthAdaption();
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

      this.visualData = blockData.slice(start, end); // slice visual data
      this.$refs.content.style.transform = `translateY(${start * itemHeight}px)`; // ???
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
      this.$set(this.blockData[_index], "selected", !selected);
      this.emit(-2, selected ? "on-cancel-selected" : "on-selected", { label, value });

      // 关于为什么要加这个状态，这是个很玄学的问题 ～～
      // 它是用在查询操作里面的
      // 不妨这样理解，在选择过程中分发出来的查询请求一律打回
      this.isSelecting = true;
    },

    onQuery(keyword = "") {
      // 再一次说，在选择过程中分发出来的查询请求一律打回
      if (this.isSelecting) {
        this.isSelecting = false;
        return false;
      }

      keyword = keyword.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, "\\$1");
      for (const item of this.blockData) {
        const { _index, label, value } = item;
        if (keyword === "") this.$set(this.blockData[_index], "hidden", false);
        else {
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
     */
    emit(layer = -1, eventName, data) {
      if (layer >= 0) return false;
      let _this = this,
        i = 0;

      // find the parent by layer
      while (i > layer) {
        _this = _this.$parent;
        i--;
      }

      _this.$emit(eventName, data, this);
    }
  }
};
</script>