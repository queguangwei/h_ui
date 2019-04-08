<template>
  <div
    :class="cellClass"
    @click.left="leftClick"
    @click.right.stop.prevent="rightClick($event)"
    @dblclick="dblClick"
    @mouseover="mouseOver"
    @mouseout="mouseOut"
  >{{isEmptyCell ? '' : data.date.getDate()}}</div>
</template>

<script>
import Emitter from '../../mixins/emitter';

export default {
  name: "DateCell",
  mixins: [Emitter],
  props: {
    prefixCls: String,
    data: Object
  },
  computed: {
    root() {
      let parent = this.$parent;
      while (parent && parent.$options.name !== 'Calendar') {
        parent = parent.$parent;
      }
      return parent;
    },
    isEmptyCell() {
      return this.data === null;
    },
    cellClass() {
      const prefixCls = this.prefixCls;
      const isEmptyCell = this.isEmptyCell;
      const data = this.data;
      return {
        [`${prefixCls}-month-content-item`]: true,
        [`${prefixCls}-month-restDay`]: !isEmptyCell && data.workFlag == 0,
        [`${prefixCls}-month-item-empty`]: isEmptyCell,
        [`${prefixCls}-month-item-disable`]: !isEmptyCell && data.disabled,
        [`${prefixCls}-month-day-active`]: this.selected
      }
    },
    selected() {
      if (this.isEmptyCell) return false;
      const selectedDate = this.root.selectedDate;
      const date = this.data.date;
      return selectedDate.some(d => d.date.toDateString() === date.toDateString());
    }
  },
  methods: {
    dblClick() {
      if (this.isEmptyCell) return;
      this.dispatch('Calendar', 'on-cell-dblclick', this.data);
    },
    mouseOver() {
      if (this.isEmptyCell) return;
      this.dispatch('Calendar', 'on-cell-mouseover', this.data);
    },
    mouseOut() {
      if (this.isEmptyCell) return;
      this.dispatch('Calendar', 'on-cell-mouseout', this.data);
    },
    leftClick() {
      if (this.isEmptyCell || this.data.disabled) return;
      this.dispatch('Calendar', 'on-cell-left-click', this.data);
    },
    rightClick(event) {
      if (this.isEmptyCell || this.data.disabled) return;
      this.dispatch('Calendar', 'on-cell-right-click', event, this.data);
    }
  }
}
</script>

<style>
</style>
