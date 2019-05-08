<template>
    <tr v-if="draggable" :class="rowClasses(row._index)" @dragover.prevent="dragOver($event, row._index)" @drop.prevent="drop($event, row._index)" @dragend="dragEnd($event)"><slot></slot></tr>
    <tr v-else :class="rowClasses(row._index)"><slot></slot></tr>
</template>
<script>
  import Emitter from '../../mixins/emitter';

  export default {
    mixins: [Emitter],
    props: {
      row: Object,
      prefixCls: String,
      clickToSelect:Boolean,
    },
    computed: {
      objData () {
        return this.$parent.objData;
      },
      table() {
        return this.$parent.$parent;
      },
      draggable() {
        return this.$parent.columns.findIndex(col => col.type === 'drag') > -1;
      }
    },
    methods: {
      drop(event, index) {
        const table = this.table;
        const dataTransfer = event.dataTransfer;
        const dragIndex = dataTransfer.getData("index");
        const data = table.rebuildData;
        const dragItemIndex = data.findIndex(d => d._index == dragIndex);
        const dragItem = data[dragItemIndex];
        const dropIndex = data.findIndex(d => d._index == index);

        this.dispatch('Table', 'on-drag-drop', dragItemIndex, dropIndex);
        data.splice(dragItemIndex, 1);
        data.splice(dropIndex, 0, dragItem);
        table.rebuildData = [...data];
      },
      dragOver(event, index) {
        this.table.currDragOverIdx = index;
      },
      dragEnd(event) {
        this.table.currDragOverIdx = null;
      },
      rowClasses (_index) {
        return [
          `${this.prefixCls}-row`,
          this.rowClsName(_index),
          {
            [`${this.prefixCls}-row-checked`]: this.objData[_index] && this.objData[_index]._isChecked&&!this.clickToSelect,
            [`${this.prefixCls}-row-highlight`]: this.objData[_index] && this.objData[_index]._isHighlight,
            [`${this.prefixCls}-row-hover`]: this.objData[_index] && this.objData[_index]._isHover,
            [`${this.prefixCls}-row-filterable`]: this.objData[_index] && this.objData[_index]._isMatched,
            [`${this.prefixCls}-row-dragover`]: this.table.currDragOverIdx === _index
          }
        ];
      },
      rowClsName (_index) {
        return this.table.rowClassName(this.objData[_index], _index);
      },
    }
  };
</script>