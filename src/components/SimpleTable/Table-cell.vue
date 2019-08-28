<template>
  <div :class="cellClasses" :style="minWidthStyle(column)">
    <template v-if="column.type === 'selection'">
      <Checkbox v-if="!column.title" :size="checkboxSize" @mousedown.native.stop="handleClick" :value="checked" @on-change="selectAll"></Checkbox>
      <span v-else :class="ellipsisClass(column, titleEllipsis)" :style="ellipsisStyle(column)" :title="column.showTitle?column.title:null">{{column.title}}</span>
    </template>
    <template v-else>
      <span v-if="!column.renderHeader" :class="ellipsisClass(column, titleEllipsis)" :style="ellipsisStyle(column)" :title="column.showTitle?column.title:null">{{ column.title || '#' }}</span>
      <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
    </template>
    <span :class="[prefixCls + '-sort']" v-if="column.sortable&&!useNewSort&&column.type!=='selection'">
      <Icon name="android-arrow-dropup" :class="{on: column._sortType === 'asc'}" @on-click="handleSort(index, 'asc')" @mousedown.native.stop="handleClick"></Icon>
      <Icon name="android-arrow-dropdo" :class="{on: column._sortType === 'desc'}" @on-click="handleSort(index, 'desc')" @mousedown.native.stop="handleClick"></Icon>
    </span>
    <div v-if="column.sortable&&useNewSort"  :class="newsortWrapClass" @click="handleSortByHead(index)">
      <span :class="[prefixCls + '-sortnew']" >
        <Icon name="android-arrow-dropup" :class="{on: column._sortType === 'asc'}"  ></Icon>
        <Icon name="android-arrow-dropdo" :class="{on: column._sortType === 'desc'}" ></Icon>
      </span>
    </div>
  </div>
</template>
<script>
import renderHeader from './header'
export default {
  name: 'TableCell',
  props: {
    column:Object,
    index:[Number,String],
    checked:Boolean,
    prefixCls:String,
    titleEllipsis:Boolean
  },
  components:{renderHeader},
  computed: {
    objData() {
      return this.$parent.objData
    },
    cellClasses(){
      return [
        `${this.prefixCls}-cell`,
      ]
    },
    useNewSort(){
      return this.$parent.newSort
    },
    newsortWrapClass(){
      return [
        `${this.prefixCls}-newsort-wrap`,
      ]
    },
    checkboxSize() {
      return this.column.checkboxSize ? this.column.checkboxSize : 'large'
    }
  },
  methods: {
    minWidthStyle(column) {
      let style = {}
      if(column.width === 60) {
        style.paddingLeft = 8 + 'px'
        style.paddingRight = 8 + 'px'
      }
      return style
    },
    ellipsisStyle(column) {
      let style = {}
      let width = 0
      style.display = 'inline-block'
      if(column._width && this.titleEllipsis) {
        if(window.isO45) {
          if(column.sortable) {
            width = column._width - 36 <= 24 ? 24 : column._width - 36
          }else {
            width = column._width - 16 <= 24 ? 24 : column._width - 16
          }
        }else {
          if(column.sortable) {
            width = column._width - 50 <= 24 ? 24 : column._width - 50
          }else {
            width = column._width - 30 <= 24 ? 24 : column._width - 30
          }
        }
        style.width = `${width}px`
      }
      return style
    },
    ellipsisClass(column, titleEllipsis){
      return {
        [`${this.prefixCls}-cell-ellipsis`]: titleEllipsis && titleEllipsis != 'false'
      }
    },
    handleClick(){
    },
    selectAll(status){
      this.$parent.selectAll(status)
    },
    handleSort(index,type){
      this.$parent.handleSort(index,type)
    },
    handleSortByHead(index){
      this.$parent.handleSortByHead(index)
    }
  },
}
</script>
