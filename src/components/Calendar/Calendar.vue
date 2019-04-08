<template>
  <div :class="[`${prefixCls}-wrapper`]" ref="calendarWrap">
    <slot name="header">
      <div :class="[`${prefixCls}-top-change`]">
        <div :class="[`${prefixCls}-top-icon h-prev-year`]" @click="handleToPrevYear">
          <h-icon name="chevron-left"></h-icon>
        </div>
        <h1 :class="[`${prefixCls}-top-text ${prefixCls}-year`]">{{curYear}}年</h1>
        <div :class="[`${prefixCls}-top-icon h-next-year`]" @click="handleToNextYear">
          <h-icon name="chevron-right"></h-icon>
        </div>
      </div>
    </slot>
    <month-view
      :prefixCls="prefixCls"
      :monthViewNum="12"
      :currentDate="currentDate"
      :presetDates="dateData"
    ></month-view>
    <transition name="slide-up">
      <ul :class="[`${prefixCls}-handle`]" v-clickoutside="hideCtxMenu" :style="styles">
        <li
          :class="[`${prefixCls}-handle-item ${prefixCls}-handle-setWorkDay`]"
          @click.stop.prevent="handleSetWorkDay(1)"
        >
          <span>设为工作日</span>
        </li>
        <li
          :class="[`${prefixCls}-handle-item ${prefixCls}-handle-setRestDay`]"
          @click.stop.prevent="handleSetWorkDay(0)"
        >
          <span>设为休息日</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
import clickoutside from '../../directives/clickoutside.js'
import MonthView from './MonthView';
const prefixCls = 'h-calendar';

export default {
  name: 'Calendar',
  components: { MonthView },
  data() {
    return {
      currentDate: new Date(),
      prefixCls: prefixCls,
      styles: {},
      selectedDate: [],
      /* 当前视图所有日期 */
      dateList: [],
      handledDate: [] //已处理数据
    }
  },
  props: {
    currentYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    dateData: {
      // 传入日期信息 {date, workFlag}
      type: Array,
      default: () => []
    },
    disableDate: {
      type: Function
    },
    multiSelect: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    clickoutside
  },
  computed: {
    curYear() {
      return this.currentDate.getFullYear();
    }
  },
  watch: {
    currentYear(val) {
      const currentDate = this.currentDate;
      this.currentDate = new Date(val, currentDate.getMonth(), currentDate.getDate());
    }
  },
  methods: {
    handleCellLeftClick(dateObj) {
      const date = dateObj.date;
      this.$emit('on-click', date.getMonth() + 1, date.getDate());

      const selectedDate = this.selectedDate;
      for (let i = selectedDate.length - 1; i >= 0; i--) {
        // 判断是否是同一天
        if (selectedDate[i].date.toDateString() === date.toDateString()) {
          // 取消选择
          selectedDate.splice(i, 1);
          return;
        }
      }
      if (!this.multiSelect) {
        this.selectedDate = [dateObj];
      } else {
        selectedDate.push(dateObj);
      }
    },
    handleCellRightClick(event) {
      this.styles = {
        display: 'block',
        top: `${event.clientY}px`,
        left: `${event.clientX}px`,
      }
    },
    handleCellMouseOver(dateObj) {
      const date = dateObj.date;
      this.$emit('on-mouseover', date.getMonth() + 1, date.getDate());
    },
    handleCellMouseOut(dateObj) {
      const date = dateObj.date;
      this.$emit('on-mouseout', date.getMonth() + 1, date.getDate());
    },
    handleCellDblClick(dateObj) {
      const date = dateObj.date;
      this.$emit('on-dblclick', date.getMonth() + 1, date.getDate());
    },
    hideCtxMenu() {
      this.styles = {};
    },
    // 设为工作日 workFlag 1 || 休息日 workFlag 0
    handleSetWorkDay(workflag) {
      const selectedDate = this.selectedDate;
      const dateList = this.dateList;
      // 设置是否工作日
      selectedDate.forEach(date => {
        date.workFlag = workflag;
        dateList.some(d => {
          if (d.date.toDateString() === date.date.toDateString()) {
            d.workFlag = workflag;
            return true;
          }
        })
      })
      // 隐藏右键菜单
      this.hideCtxMenu();
      // 保存当前已经处理数据,方便像服务端保存
      this.handledDate.push(this.selectedDate);
      this.selectedDate = [];
      this.$emit('on-date-change', this.handledDate);
    },
    jumpToPrevMonth() {
      const currentDate = this.currentDate;
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const date = currentDate.getDate();
      if (currentMonth === 0) {
        this.currentDate = new Date(currentYear - 1, 11, date);
      } else {
        this.currentDate = new Date(currentYear, currentMonth - 1, date);
      }
    },
    jumpToNextMonth() {
      const currentDate = this.currentDate;
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const date = currentDate.getDate();
      if (currentMonth === 11) {
        this.currentDate = new Date(currentYear + 1, 0, date);
      } else {
        this.currentDate = new Date(currentYear, currentMonth + 1, date);
      }
    },
    handleToPrevYear() {
      const currentDate = this.currentDate;
      const currentYear = currentDate.getFullYear();
      if (currentYear > 1000) {
        this.currentDate = new Date(currentYear - 1, currentDate.getMonth(), currentDate.getDate());
      }
    },
    handleToNextYear() {
      const currentDate = this.currentDate;
      const currentYear = currentDate.getFullYear();
      if (currentYear < 10000) {
        this.currentDate = new Date(currentYear + 1, currentDate.getMonth(), currentDate.getDate());
      }
    }
  },
  created() {
    this.$on('on-cell-left-click', this.handleCellLeftClick);
    this.$on('on-cell-right-click', this.handleCellRightClick);
    this.$on('on-cell-mouseover', this.handleCellMouseOver);
    this.$on('on-cell-mouseout', this.handleCellMouseOut);
    this.$on('on-cell-dblclick', this.handleCellDblClick);
  }
}
</script>
