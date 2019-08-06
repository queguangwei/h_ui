<template>
  <div>
    <Button @click="loadData">加载数据</Button>
    <Button @click="bigData = []">清空数据</Button>
    <h-simple-table ref="simTable" :columns="columnsBig1" border :data="bigData" height=200>
    </h-simple-table>
  </div>
</template>
<script>
  let i = 0, j = 0
  const jsonData = [
    {
      a: `${i++}-${j++}`,
      b: `${i}-${j++}`,
      c: `${i}-${j++}`,
      d: `${i}-${j++}`,
      e: `${i}-${j++}`,
      f: `${i}-${j++}`,
      g: `${i}-${j++}`,
      h: `${i}-${j++}`,
      i: `${i}-${j++}`
    },{
      a: `${i++}-${j++}`,
      b: `${i}-${j++}`,
      c: `${i}-${j++}`,
      d: `${i}-${j++}`,
      e: `${i}-${j++}`,
      f: `${i}-${j++}`,
      g: `${i}-${j++}`,
      h: `${i}-${j++}`,
      i: `${i}-${j++}`
    },{
      a: `${i++}-${j++}`,
      b: `${i}-${j++}`,
      c: `${i}-${j++}`,
      d: `${i}-${j++}`,
      e: `${i}-${j++}`,
      f: `${i}-${j++}`,
      g: `${i}-${j++}`,
      h: `${i}-${j++}`,
      i: `${i}-${j++}`
    },{
      a: `${i++}-${j++}`,
      b: `${i}-${j++}`,
      c: `${i}-${j++}`,
      d: `${i}-${j++}`,
      e: `${i}-${j++}`,
      f: `${i}-${j++}`,
      g: `${i}-${j++}`,
      h: `${i}-${j++}`,
      i: `${i}-${j++}`
    },{
      a: `${i++}-${j++}`,
      b: `${i}-${j++}`,
      c: `${i}-${j++}`,
      d: `${i}-${j++}`,
      e: `${i}-${j++}`,
      f: `${i}-${j++}`,
      g: `${i}-${j++}`,
      h: `${i}-${j++}`,
      i: `${i}-${j++}`
    },{
      a: `${i++}-${j++}`,
      b: `${i}-${j++}`,
      c: `${i}-${j++}`,
      d: `${i}-${j++}`,
      e: `${i}-${j++}`,
      f: `${i}-${j++}`,
      g: `${i}-${j++}`,
      h: `${i}-${j++}`,
      i: `${i}-${j++}`
    }
  ]
  export default {
    data () {
      return {
        columnsBig1: [],
        bigData: []
      }
    },
    methods:{
      loadData(){
        this.columnsBig1.unshift({
          title: '状态',
          key: 'i',
        },)
        this.$nextTick(() => {
          this.bigData = jsonData;
        })
      }
    },
    mounted(){
      this.columnsBig1=[
        {
          type: 'index',
          align: 'center',
          width:200,
          key:"index",
          fixed:'left',
        },
        {
          type: 'selection',
          align: 'center',
          key:'select',
          width:200,
          // fixed:'left'
        },
        {
          title: '姓名',
          key: 'a',
          width:200,
          sortable:true
        },
        {
          title: '年龄',
          key: 'b',
          sortable:true,
          // fixed:'left',
        },
        {
          title: '地址',
          ellipsis:true,
          minWidth:200,
          key: 'c',
        },
        {
          title: '地址',
          ellipsis:true,
          minWidth:200,
          key: 'd',
        },
        {
          title: '地址',
          ellipsis:true,
          minWidth:200,
          key: 'e',
        },
        {
          title: '地址',
          ellipsis:true,
          minWidth:200,
          key: 'f',
        },
        {
          title: '地址',
          ellipsis:true,
          minWidth:200,
          key: 'g',
        },
        {
          title: '地址',
          ellipsis:true,
          minWidth:200,
          key: 'h',
        }
      ]
    }
  }
</script>
