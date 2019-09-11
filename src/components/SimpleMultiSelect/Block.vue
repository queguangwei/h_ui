<template>
  <div ref="block" @scroll="onScroll" :class="blockCls">
    <!-- ??? -->
    <div :class="[prefixCls+'-phantom']" :style="phantomStl"></div>
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
  </div>
</template>

<script>
import Checkbox from "../Checkbox/Checkbox.vue";
import _ from "../..//util";
import { getBarBottom, getScrollBarSize } from "../../util/tools";
export default {
  components: {
    Checkbox
  },
  data() {
    return {
      prefixCls: "h-select-block",
      multiple: true,
      blockData: [], // 所有数据集合
      visualData: [] // 可视数据集合
    };
  },
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
    },
    test: String
  },
  computed: {
    blockCls() {
      return [`${this.prefixCls}-drop`, `${this.prefixCls}-multiple`];
    },
    phantomStl() {
      return {};
    }
  },
  watch: {
    data: {
      deep: true,
      handler: function(newVal) {
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

        this.updateVisualData();
        this.$nextTick(() => {
          // share data with grandparent
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

      // ???
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
    },

    onQuery(keyword) {
      keyword = keyword.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, "\\$1");
      for (const item of this.blockData) {
        const { _index, label, value } = item;
        if (keyword === "") this.$set(this.blockData[_index], "hidden", false);
        else {
          this.$set(this.blockData[_index], "hidden", !new RegExp(keyword, "i").test(label) && !new RegExp(keyword, "i").test(value));
        }
      }
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