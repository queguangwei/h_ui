<template>
  <div :class="[`${prefixCls}`]">
    <calendar
      ref="calendar"
      :current-year="curYear"
      :current-month="curMonth"
      :monthViewNum="1"
      :multiSelect="false"
    >
      <slot slot="header" name="header">
        <div :class="[`${prefixCls}-header`]">
          <h-button-group>
            <h-button type="primary" icon="arrow-l" title="上一年" @click="prevYear"></h-button>
            <h-button type="primary" icon="return" title="上一个月" @click="prevMonth"></h-button>
            <h-button type="primary" icon="enter" title="下一个月" @click="nextMonth"></h-button>
            <h-button type="primary" icon="arrow-r" title="下一年" @click="nextYear"></h-button>
          </h-button-group>
          <h-button
            type="primary"
            :disabled="disableTodayBtn"
            :class="[`${prefixCls}-today-btn`]"
            @click="jumpToday"
            :title="todayStr()"
          >{{t('i.calendar.today')}}</h-button>
          <h1 :class="[`${prefixCls}-date-text`]">{{curYear}}年 {{curMonth}}月</h1>
        </div>
      </slot>
    </calendar>
    <div :class="[`${prefixCls}-events`]">
      <div :class="[`${prefixCls}-event-wrapper`]" v-for="(item, index) in dateEvents" :key="index">
        <div
          :class="eventCls(item, event)"
          v-for="(event, j) in (item != null ? item.events : [])"
          v-show="event.order <= showEvtNum"
          :key="j"
        >{{isEventPlaceBegin(item, event) ? event.title : ''}}</div>
        <div
          v-if="item !== null && item.events.length > showEvtNum"
          :class="[`${prefixCls}-event-more`]"
        >更多...</div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '../Calendar';
import locale from '../../mixins/locale';
import { deepCopy } from '../../util/tools';

const prefixCls = 'h-schedule';

export default {
  name: 'Schedule',
  components: { Calendar },
  mixins: [locale],
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      curYear: new Date().getFullYear(),
      curMonth: new Date().getMonth() + 1,
      prefixCls: prefixCls,
      dateEvents: [],
      /* 最多展示三个活动 */
      showEvtNum: 3
    }
  },
  computed: {
    disableTodayBtn() {
      const today = new Date();
      return this.curYear === today.getFullYear() && this.curMonth - 1 === today.getMonth();
    }
  },
  watch: {
    events: {
      immediate: true,
      handler(val) {
        this.makeDateEvents(val);
      }
    },
    curYear() {
      this.makeDateEvents(this.events);
    },
    curMonth() {
      this.makeDateEvents(this.events);
    },
  },
  methods: {
    jumpToday() {
      this.curYear = new Date().getFullYear();
      this.curMonth = new Date().getMonth() + 1;
    },
    prevMonth() {
      if (this.curMonth === 1) {
        this.curYear--;
        this.curMonth = 12;
      } else {
        this.curMonth--;
      }
    },
    nextMonth() {
      if (this.curMonth === 12) {
        this.curYear++;
        this.curMonth = 1;
      } else {
        this.curMonth++;
      }
    },
    prevYear() {
      this.curYear--;
    },
    nextYear() {
      this.curYear++;
    },
    todayStr() {
      const today = new Date();
      return `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    },
    makeDateEvents(events) {
      if (events.length === 0) {
        this.dateEvents = [];
      } else {
        const curYear = this.curYear;
        const curMonth = this.curMonth;
        // 第一天
        const minDate = new Date(curYear, curMonth - 1, 1);
        // 最后一天
        const maxDate = new Date(curYear, curMonth, 0);
        // 筛选出包含或部分包含在当前日期范围的活动
        let eventsInRange = deepCopy(events.filter(e => {
          let sd = new Date(e.startDate);
          sd = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate());
          let ed = e.endDate ? new Date(e.endDate) : sd;
          ed = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
          return (sd >= minDate && ed <= maxDate)
            || (sd < minDate && ed >= minDate)
            || (sd <= maxDate && ed > maxDate);
        }));

        // 生成固定长度为42的每日活动数组
        const dateEvents = new Array(42);
        let i = 0;
        while (i < 42) {
          dateEvents[i++] = null;
        }

        const firstDayIndex = minDate.getDay();
        const lastDayIndex = maxDate.getDate() + firstDayIndex - 1;
        for (let i = firstDayIndex; i <= lastDayIndex; i++) {
          let d = dateEvents[i];
          let dt = new Date(curYear, curMonth - 1, i - firstDayIndex + 1);
          if (d === null) d = dateEvents[i] = { events: [], date: dt };
          let events = d.events;
          eventsInRange.forEach(e => {
            let sd = new Date(e.startDate);
            sd = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate());
            let ed = e.endDate ? new Date(e.endDate) : sd;
            ed = new Date(ed.getFullYear(), ed.getMonth(), ed.getDate());
            if (dt >= sd && dt <= ed) {
              events.push(e);
            }
          });

          events.sort((a, b) => {
            if (!a.order) return 1;
            if (!b.order) return -1;
            return a.order - b.order;
          })

          for (let j = 0; j < events.length; j++) {
            events[j].order = events[j].order || (j + 1);
            events[j].hidden = false;
            if (events[j].order == j + 1 || j > 2) continue;
            events.splice(j, 0, {
              order: j + 1,
              hidden: true
            });
          }
        }
        this.dateEvents = dateEvents;
      }
    },
    isStart(item, event) {
      let st = new Date(event.startDate);
      return st.toDateString() === item.date.toDateString();
    },
    isEnd(item, event) {
      let ed = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
      return ed.toDateString() === item.date.toDateString();
    },
    isEventPlaceBegin(item, event) {
      return this.isStart(item, event)
        || item.date.getDay() === 0
        || item.date.getDate() === 1;
    },
    eventCls(item, event) {
      return {
        [`${prefixCls}-event-content`]: true,
        [`${prefixCls}-event-placeholder`]: event.hidden,
        [`event-place-start`]: this.isStart(item, event),
        [`event-place-end`]: this.isEnd(item, event)
      }
    }
  }
}
</script>

<style>
</style>
