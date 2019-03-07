<template>
  <table cellspacing="0" cellpadding="0" border="0" :style="styleObject">
  <!-- 签用于对表格中的列进行组合，以便对其进行格式化。 -->
    <colgroup>
      <col v-for="(column, index) in columns" :width="setCellWidth(column, index, true)" :key="index">
    </colgroup>
    <thead>
      <tr>
        <th v-for="(column, index) in columns"
          v-on:mousedown="mousedown($event,column,index)" 
          v-on:mouseout="mouseout($event,column,index)" 
          v-on:mousemove="mousemove($event,column,index)"
          :key="index"
          :class="alignCls(column)" 
          >
          <div>
            <!-- <Checkbox v-if="headSelection&&!index" @on-change="selectAll" class="asyc-check"></Checkbox> -->
            <template>
              <span v-if="!column.renderHeader" @click="handleSortByHead(index)">{{ column.title || '#' }}</span>
              <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
            </template>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>
<script>
import Icon from '../Icon/Icon.vue'
import CheckboxGroup from '../Checkbox/CheckboxGroup.vue';
import Checkbox from '../Checkbox/Checkbox.vue';
import hButton from '../Button/Button.vue';
import renderHeader from './header';
import { on, off } from '../../util/dom';
import {getScrollBarSize,hasClass,addClass,removeClass} from '../../util/tools';
import Mixin from './mixin';
import Locale from '../../mixins/locale';

export default {
  name: 'TableHead',
  mixins: [ Mixin, Locale ],
  components: {CheckboxGroup, Checkbox,hButton, renderHeader,Icon},
  props: {
    prefixCls: String,
    styleObject: Object,
    columns: Array,
    // objData: Object,
    dataLength: [Number,String],
    columnsWidth: Object,
    headSelection: Boolean,
    canDrag:Boolean,
  },
  data(){
    return{
      draggingColumn: null,
      dragging: false,
      dragState: {},
    }
  },
  computed: {
    isSelectAll () {
      // let isSelectAll = true;
      // if (!this.data.length) isSelectAll = false;
      // for (let i = 0; i < this.data.length; i++) {
        // if (!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled) {
        //   isSelectAll = false;
        //   break;
        // }
      // }
      // return isSelectAll;
    }
  },
  mounted(){
  },
  methods: {
    selectAll (status) {
      this.$parent.selectAll(status);
    },
    handleSortByHead (index) {
    },
    mousedown(event,column,index){
      if (this.$isServer || !this.canDrag || !this.draggingColumn) return;
      if (!column) return;
      let _this = this;
        this.dragging = true;      
        this.$parent.resizeProxyVisible = true;
        const table = this.$parent; 
        const tableEl = table.$el;
        const tableLeft = tableEl.getBoundingClientRect().left;
        const columnEl = this.$el.querySelector(`th.h-ui-${column.key}`);
        const columnRect = columnEl.getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 30;
        let lastWidth =this.findObj(event,"TR").lastChild.offsetWidth;
        if(this.$parent.tableWidth<this.$parent.initWidth-this.$parent.scrollBarWidth){
          lastWidth = lastWidth+this.$parent.initWidth-this.$parent.tableWidth-this.$parent.scrollBarWidth;
        }
        let tableWidth = this.$el.parentElement.offsetWidth;
        let headWidth = this.$el.offsetWidth;
        addClass(columnEl, 'noclick');
        this.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft
        };

        const resizeProxy = table.$refs.resizeProxy;
        resizeProxy.style.left = this.dragState.startLeft + 'px';

        document.onselectstart = function() { return false; };
        document.ondragstart = function() { return false; };
        
        const handleMouseMove = (event) => {
          const deltaLeft = event.clientX - this.dragState.startMouseLeft;
          const proxyLeft = this.dragState.startLeft + deltaLeft;

          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
        };

        const handleMouseUp = () => {
          if (_this.dragging) {
            const {
              startColumnLeft,
              startLeft
            } = _this.dragState;
            const finalLeft = parseInt(resizeProxy.style.left, 10);
            const columnWidth = finalLeft - startColumnLeft;
            let dragWidth = finalLeft - startLeft;//>0为输入框增大，<0为减小
            if (dragWidth>=0) {
              lastWidth = (lastWidth-dragWidth)>=80?(lastWidth-dragWidth):80;
            }else{
              if (headWidth>=tableWidth) {//此时有滚动条
                if (headWidth+dragWidth<=tableWidth) {
                  lastWidth =lastWidth+tableWidth-headWidth-dragWidth-1;
                }
              }else{
                lastWidth = lastWidth-dragWidth;
              }
            }
            if (this.$parent.bodyHeight!=0&&!this.$parent.notAdaptive) {
              lastWidth = lastWidth - getScrollBarSize();
            }
            table.changeWidth(columnWidth, column.key,lastWidth)
            // _this.changeWidth(columnWidth, column.key,lastWidth);

            document.body.style.cursor = '';
            _this.dragging = false;
             _this.draggingColumn = false;
            _this.dragState = {};

            table.resizeProxyVisible = false;
          }

          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;

          setTimeout(function() {
            removeClass(columnEl, 'noclick');
          }, 0);
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    },
    mousemove(event,column,index){
      if (!this.canDrag) return;
      if (!column ) return;
      if (column.children && column.children.length > 0) return;
      let target = this.findObj(event,"TH");
      if(this.canDrag){
        // moveDrag需传入event win7下FF60版本不可拖拽
        this.moveDrag(event, target,column);
      }
    },
    moveDrag(event, target,column){
      if (!this.dragging) {
        let rect = target.getBoundingClientRect();
        const bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          this.draggingColumn = true;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          this.draggingColumn = false;
        }
      }
    },
    findObj(e,name){
      var obj=e.target;
      while(obj&&obj.tagName!=name){
        obj=obj.parentElement
      }
      return obj;      
    },
    mouseout() {
      if (this.$isServer) return;
      document.body.style.cursor = '';
    },
  }
};
</script>
