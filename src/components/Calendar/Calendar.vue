<template>
  <div :class="[`${prefixCls}-wrapper`]" ref="calendarWrap">
    <slot name="header">
      <div :class="[`${prefixCls}-top-change`]">
        <div
          :class="[`${prefixCls}-top-icon h-prev-year`]"
          @click="monthViewNum === 12 ? handleToPrevYear() : jumpToPrevMonth()"
        >
          <h-icon name="chevron-left"></h-icon>
        </div>
        <h1 :class="[`${prefixCls}-top-text ${prefixCls}-year`]">{{curYear}}年</h1>
        <h1
          v-if="monthViewNum < 12 && monthViewNum > 1"
          :class="[`${prefixCls}-top-text`]"
        >&nbsp{{(curMonth + 1) + '月'}} - {{(curMonth + monthViewNum) + '月'}}</h1>
        <h1
          v-if="monthViewNum === 1"
          :class="[`${prefixCls}-top-text`]"
        >&nbsp{{(curMonth + 1) + '月'}}</h1>
        <div
          :class="[`${prefixCls}-top-icon h-next-year`]"
          @click="monthViewNum === 12 ? handleToNextYear() : jumpToNextMonth()"
        >
          <h-icon name="chevron-right"></h-icon>
        </div>
      </div>
    </slot>
    <month-view
      :prefixCls="prefixCls"
      :monthViewNum="monthViewNum"
      :currentDate="currentDate"
      :presetDates="dateData"
      :disabledDate="disableDate"
      :dateRender="dateCellRender"
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
import locale from '../../mixins/locale';
import MonthView from './MonthView';
import dateUtil from '../../util/date';

const prefixCls = 'h-calendar';

export default {
  name: 'Calendar',
  mixins: [locale],
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
    /* 1-based */
    currentMonth: {
      type: Number,
      default: new Date().getMonth() + 1
    },
    dateData: {
      // 传入日期信息 {date, workFlag}
      type: Array,
      default: () => []
    },
    disableDate: {
      type: [Function, Array],
    },
    multiSelect: {
      type: Boolean,
      default: true
    },
    monthViewNum: {
      type: Number,
      default: 12,
      validator(val) {
        return [1, 2, 4, 12].indexOf(val) > -1;
      }
    },
    dateCellRender: Function,
    enableCtxMenu: {
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
    },
    /* 0-based */
    curMonth() {
      return this.currentDate.getMonth();
    }
  },
  watch: {
    currentYear: {
      immediate: true,
      handler(val) {
        const currentDate = this.currentDate;
        this.currentDate = new Date(val, currentDate.getMonth(), currentDate.getDate());
      }
    },
    currentMonth: {
      immediate: true,
      handler(val) {
        const currentDate = this.currentDate;
        let lastDate = new Date(currentDate.getFullYear(), val, 0).getDate();
        this.currentDate = new Date(currentDate.getFullYear(), val - 1, Math.min(currentDate.getDate(), lastDate));
      }
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
      this.$emit('on-select', date.getMonth() + 1, date.getDate())
    },
    handleCtxMenu(event) {
      if (this.enableCtxMenu) {
        this.styles = {
          display: 'block',
          top: `${event.clientY}px`,
          left: `${event.clientX}px`,
        }
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
        let prevMonthLastDate = new Date(currentYear - 1, 12 - this.monthViewNum + 1, 0).getDate();
        this.currentDate = new Date(currentYear - 1, 12 - this.monthViewNum, Math.min(prevMonthLastDate, date));
      } else {
        let prevMonthLastDate = new Date(currentYear, currentMonth, date, 0).getDate();
        this.currentDate = new Date(currentYear, currentMonth - 1, Math.min(prevMonthLastDate, date));
      }
    },
    jumpToNextMonth() {
      const currentDate = this.currentDate;
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const date = currentDate.getDate();
      if (currentMonth >= (12 - this.monthViewNum)) {
        this.currentDate = new Date(currentYear + 1, 0, date);
      } else {
        let nextMonthLastDate = new Date(currentYear, currentMonth + 2, 0).getDate();
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
    },
    getSelectDate() {
      let select = this.selectedDate;
      for (let i = 0; i < select.length; i++){
        if (!select[i].formatDate){
          select[i].formatDate = dateUtil.format(select[i].date, 'yyyy-MM-dd');
        }
      }
      return select;
    }
  },
  created() {
    this.$on('on-cell-left-click', this.handleCellLeftClick);
    this.$on('on-context-menu', this.handleCtxMenu);
    this.$on('on-cell-mouseover', this.handleCellMouseOver);
    this.$on('on-cell-mouseout', this.handleCellMouseOut);
    this.$on('on-cell-dblclick', this.handleCellDblClick);
  }
}
</script>