<template>
  <div>
    <h-schedule :events="events">
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
        /* {
          startDate: '2019-04-01',
          endDate: '2019-04-01',
          title: '玩游戏'
        }, */
        {
          startDate: '2019-04-01',
          endDate: '2019-04-03',
          title: '出差'
        }/* ,{
          startDate: '2019-04-02',
          endDate: '2019-04-03',
          title: '整理报告'
        } *//* ,{
          startDate: '2019-04-02',
          endDate: '2019-04-02',
          title: '预定话剧票'
        } */,{
          startDate: '2019-04-03',
          endDate: '2019-04-12',
          title: '健身房锻炼'
        }
      ]
    }
  }
}
</script>

<style>

</style>
