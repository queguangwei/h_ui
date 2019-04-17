<template>
  <div>
    <h-schedule :events="events" @on-event-click="handleEvtClick" @on-event-dblclick="handleEvtDblClick">
    </h-schedule>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        {
          startDate: '2019-03-30',
          endDate: '2019-04-03',
          title: '看电影'
        },
        {
          startDate: '2019-04-01',
          endDate: '2019-04-01',
          title: '玩游戏'
        },
        {
          startDate: '2019-04-01',
          endDate: '2019-04-03',
          title: '出差'
        },{
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '整理报告'
        },{
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '听音乐会'
        },{
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '学习油画'
        },{
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '玩滑板'
        },{
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '准备旅行攻略'
        },{
          startDate: '2019-04-02',
          endDate: '2019-04-02',
          title: '预定话剧票'
        },{
          startDate: '2019-04-03',
          endDate: '2019-04-12',
          title: '健身房锻炼'
        },{
          startDate: '2019-04-13',
          endDate: '2019-04-23',
          title: '完成需求：日历控件(灰色日期为非交易日，蓝色日期为正常交易日，“T”标识的为交易日非交收日，“S”标识的为非交易日但是交收日（颜色和字母可以使用方自定义）)'
        }
      ]
    }
  },
  methods: {
    handleEvtClick(evt) {
      console.log(evt);
    },
    handleEvtDblClick(evt) {
      console.log(evt);
    }
  },
  mounted() {
    /* setTimeout(() => {
      this.$set(this.events[0], 'endDate', '2019-04-02');
      // this.events[0].endDate = '2019-04-02'
    }, 5000) */
  }
}
</script>

<style>

</style>
