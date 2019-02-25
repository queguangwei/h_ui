<template>
  <div :class="[`${prefixCls}-wrapper`]" ref="calendarWrap" @scroll="handleBodyScroll">
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
    <div :class="[`${prefixCls}-month-wrapper clearfix`]" ref="month">
      <div v-for="(monthInfo, index) in curMonthList" :key="index" :class="[`${prefixCls}-month`]">
        <div>
          <label :class="[`${prefixCls}-month-title`]">{{monthTextList[monthInfo.month]}}月</label>
          <div :class="[`${prefixCls}-month-content ${prefixCls}-month-week`]">
            <div :class="[`${prefixCls}-month-content-item`]" v-for="(tag, index) in weekTop" :key="index">
              {{tag}}
            </div>
          </div>
          <div :class="[`${prefixCls}-month-content ${prefixCls}-month-day`]">
            <div :class="[{[`${prefixCls}-month-content-item`]: true, [`${prefixCls}-month-restDay`]: item.workFlag == 0, [`${prefixCls}-month-item-empty`]: item == ''}]" v-for="(item,index) in monthInfo.list" :key="index" @click.left="handleDateSelect($event, monthInfo.month, item, index)" @click.right.stop.prevent="handleDateSet($event, monthInfo.month, item, index)">
              {{transDate(item.date)}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-up">
      <ul :class="[`${prefixCls}-handle`]" v-clickoutside="handleHide" :style="styles">
        <li :class="[`${prefixCls}-handle-item ${prefixCls}-handle-setWorkDay`]" @click.stop.prevent="handleSetWorkDay(1)">
          <span>设为工作日</span>
        </li>
        <li :class="[`${prefixCls}-handle-item ${prefixCls}-handle-setRestDay`]" @click.stop.prevent="handleSetWorkDay(0)">
          <span>设为休息日</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
<script>
  import clickoutside from '../../directives/clickoutside.js'
  import TransferDom from '../../directives/transfer-dom.js';
  const prefixCls = 'h-calendar';
  export default {
    data () {
      return {
        prefixCls:prefixCls,
        curYear: this.currentYear,
        weekTop: ['日','一', '二', '三', '四', '五', '六'],
        curMonthList: [],
        monthTextList: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        curDateData: this.dateData,
        styles: {},
        dateSelected: [],
        handledDate: [] //已处理数据
      }
    },
    props: {
      currentYear: {
        type: Number,
        default: new Date().getFullYear()
      },
      dateData:{
        // 传入一年的日历信息 {date, workFlag}，数组中顺序必须按日期顺序进行索引
        type: Array,
        default: () => {
          return []
        }
      }
    },
    directives: {
      clickoutside,
      TransferDom
    },
    watch: {
      dateData: {
        handler (val) {
          this.curDateData = val
        },
        deep: true
      },
      curDateData: {
        handler (val) {
          // this.curDateData = val
          if (val && val.length > 0) {
            debugger
          }
        },
        deep: true
      },
      curYear (val) {
        this.setDateDetail()
      }
    },
    computed: {
      // 当年天数
      yearDay () {
         return this.curYear % 4 == 0 ? 366 : 365
      }
    },
    methods: {
      // 设置当前日历
      setDateDetail () {
        console.log('curYear')
        if (this.dateData && this.dateData.length == 0 || (this.dateData.length != 12 && this.dateData.length !== this.yearDay)) {
          // 生成日期信息
          let dateDataArr = []
          for (let i = 1; i <= this.yearDay; i++) {
            let day = new Date(this.curYear,0, i)
            dateDataArr.push({
              date: day,
              workFlag: (day.getDay() == 6 || day.getDay() == 0) ? 0 : 1
            })
          }
          // 初始化日期信息
          this.curMonthList = this.initMonthList(dateDataArr)
        } else {
          this.curMonthList = this.initMonthList(this.dateData)
        }
      },
      quickArr (length, val) {
        let arr = new Array(length + 1)
        arr = arr.join(val + ',').split(',')
        arr.length = arr.length - 1
        return arr
      },
      getInitMonth (year, month, curMonthList) {
        /* monthInfo：{
         * month: 第几月
         * list: 月份信息
         *    [
         *      天数
         *      {
         *        date: Date,
         *        workFlag: 0休息日，1工作日
         *      }
         *    ]
        } */
        let monthInfo = {}
        monthInfo.month = month
         // 当前月份最后一天，获取某月天数
        const num = new Date(year, month + 1, 0).getDate()
        // 获取当前月份第一天
        // let monthFirstDay = new Date(year, month, 1)
        // 判断第一天是星期几
        let weekday = new Date(year, month, 1).getDay();
        // 假设星期三，则将前面补成空格（默认从星期天开始）
        monthInfo.list = this.quickArr(weekday, '')
        // monthInfo.list = monthInfo.list.concat(curMonthList)
        monthInfo.list.push.apply(monthInfo.list, curMonthList)
        // 将后面补全
        const lastWeek = new Date(year, month + 1, 0).getDay();
        let lastWeekList = this.quickArr( 6 - lastWeek, '')
        monthInfo.list.push.apply(monthInfo.list, lastWeekList)
        return monthInfo
      },
      // 初始化日期信息,将日期信息列表转换成如下格式，方便渲染
        /* monthInfo：{
          * month: 第几月
          * list: 月份信息
          *    [
          *      天数
          *      {
          *        date: Date,
          *        workFlag: 0休息日，1工作日
          *      }
          *    ]
          } */
      initMonthList (monthList) {
        if(monthList && monthList.length > 0 && monthList.length == this.yearDay) {
          let newMonthList = []
          let daysStart = 0
          for (let i = 0; i < 12; i++) {
            let monthDay = new Date(this.curYear, i + 1, 0).getDate() // 每月天数
            let curMonthList = monthList.slice(daysStart, daysStart + monthDay) // 当前月份列表
            if (curMonthList.some(item => {item.date.getMonth() !== i})) {
              // 检索是否有不是当前月份的日期信息
              this.$hMessage.info('日历信息传入有误')
              return
            } else {
              newMonthList.push(this.getInitMonth(this.curYear, i, curMonthList))
            }
            daysStart += monthDay
          }
          return newMonthList
        } else {
          this.$hMessage.info('日历信息传入有误1231')
          return
        }
      },
      handleToPrevYear () {
        if (this.curYear > 1000) {
          this.curYear = this.curYear - 1
        }
      },
      handleToNextYear () {
        if (this.curYear < 10000) {
          this.curYear = this.curYear + 1
        }
      },
      handleDateSelect (e, month, day, index) {
        if (day == '') return
        e.target.classList.toggle('h-calendar-month-day-active')
        let isHas = false
        this.dateSelected.some((item, index) => {
          if (item.date == day.date) {
            this.dateSelected.splice(index, 1)
            isHas = true
            return true
          }
        })
        // if (!this.dateSelected.some(item => {return item.date == day.date})) {
        if (!isHas) {
          this.dateSelected.push({
            month,
            index,
            date: day.date,
            workFlag: day.workFlag
          })
        }
        // }
      },
      handleDateSet ($event, mdonth, day, index) {
        if (day == '') return
        this.styles = {
          display: 'block',
          top: `${$event.clientY}px`,
          left: `${$event.clientX}px`,
        }
      },
      handleHide (e) {
        this.styles = {}
      },
      // 设为工作日 workFlag 1 || 休息日 workFlag 0
      handleSetWorkDay (workflag) {
        // 取消选中状态
        if (this.dateSelected.length > 0) {
          this.dateSelected.forEach(item => {
            item.workFlag = workflag
            this.$set(this.curMonthList[item.month].list[item.index], 'workFlag', workflag)
          })
          const domSelected = new Set(this.$refs.month.querySelectorAll('div.h-calendar-month-day-active'))
          domSelected.forEach(item => {
            item.classList.toggle('h-calendar-month-day-active')
          })
        }
        // 隐藏设置
        this.styles = {}
        // 保存当前已经处理数据,方便像服务端保存
        this.handledDate.push.apply(this.handledDate, this.dateSelected)
        this.dateSelected = []
        this.$emit('on-date-change', this.handledDate)
      },
      transDate (date) {
        return date && date != '' ? date.getDate() : ''
      },
      handleBodyScroll (event) {
      }
     },
    created () {
      // 若为12,则默认为初始化过后的日期信息列表[复制]
      this.curYear = new Date().getFullYear()
      this.setDateDetail()
      // 保存初始值
    },
    mounted() {
      // let that = this
      document.addEventListener('scroll', (e) => {
        this.styles = {}
      })
    },
  }
</script>
