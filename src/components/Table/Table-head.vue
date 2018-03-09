<template>
  <table cellspacing="0" cellpadding="0" border="0" :style="styles">
  <!-- 签用于对表格中的列进行组合，以便对其进行格式化。 -->
    <colgroup>
      <col v-for="(column, index) in columns" :width="setCellWidth(column, index, true)">
    </colgroup>
    <thead>
      <tr>
        <th v-for="(column, index) in columns"
          v-on:mousedown="mousedown($event,column,index)" 
          v-on:mouseout="mouseout($event,column,index)" 
          v-on:mousemove="mousemove($event,column,index)"
          :class="alignCls(column)" 
          >
          <div :class="cellClasses(column)">
            <template v-if="column.type === 'expand'"></template>
            <template v-else-if="column.type === 'selection'">
              <Checkbox :value="isSelectAll" @on-change="selectAll"></Checkbox>
            </template>
            <template v-else>
              <span v-if="!column.renderHeader" @click="handleSortByHead(index)">{{ column.title || '#' }}</span>
              <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
              <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                <Icon name="android-arrow-dropup" :class="{on: column._sortType === 'asc'}" @on-click="handleSort(index, 'asc')"></Icon>
                <Icon name="android-arrow-dropdo" :class="{on: column._sortType === 'desc'}" @on-click="handleSort(index, 'desc')"></Icon>
                  <!-- <i class="ivu-icon ivu-icon-arrow-up-b" :class="{on: column._sortType === 'asc'}" @click="handleSort(index, 'asc')"></i> -->
                 <!--  <i class="ivu-icon ivu-icon-arrow-down-b" :class="{on: column._sortType === 'desc'}" @click="handleSort(index, 'desc')"></i> -->
              </span>
              <Poptip
                v-if="isPopperShow(column)"
                v-model="column._filterVisible"
                placement="bottom"
                @on-popper-hide="handleFilterHide(index)">
                <span :class="[prefixCls + '-filter']">
                  <Icon name="keyboard" :class="{on: column._isFiltered}"></Icon>
                </span>
                <div slot="content" :class="[prefixCls + '-filter-list']" v-if="column._filterMultiple">
                  <div :class="[prefixCls + '-filter-list-item']">
                    <checkbox-group v-model="column._filterChecked">
                      <checkbox v-for="(item,i) in column.filters" :key="column._columnKey+i" :label="item.value">{{ item.label }}</checkbox>
                    </checkbox-group>
                  </div>
                  <div :class="[prefixCls + '-filter-footer']">
                    <h-button type="text" size="small" :disabled="!column._filterChecked.length" @click.native="handleFilter(index)">{{ t('i.table.confirmFilter') }}</h-button>
                    <h-button type="text" size="small" @click.native="handleReset(index)">{{ t('i.table.resetFilter') }}</h-button>
                  </div>
                </div>
                <div slot="content" :class="[prefixCls + '-filter-list']" v-else>
                  <ul :class="[prefixCls + '-filter-list-single']">
                    <li
                      :class="itemAllClasses(column)"
                      @click="handleReset(index)">{{ t('i.table.clearFilter') }}</li>
                    <li
                      :class="itemClasses(column, item)"
                      v-for="item in column.filters"
                      @click="handleSelect(index, item.value)">{{ item.label }}</li>
                  </ul>
                </div>
              </Poptip>
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
import Poptip from '../Poptip/Poptip.vue';
import hButton from '../Button/Button.vue';
import renderHeader from './header';
import { on, off } from '../../util/dom';
import {getScrollBarSize,hasClass,addClass,removeClass} from '../../util/tools';
import Mixin from './mixin';
import Locale from '../../mixins/locale';

export default {
  name: 'TableHead',
  mixins: [ Mixin, Locale ],
  components: {CheckboxGroup, Checkbox, Poptip, hButton, renderHeader,Icon},
  props: {
    prefixCls: String,
    styleObject: Object,
    columns: Array,
    objData: Object,
    data: Array,    // rebuildData for sort or filter
    columnsWidth: Object,
    fixed: {
      type: [Boolean, String],
      default: false
    },
    canDrag:Boolean
  },
  data(){
    return{
      draggingColumn: null,
      dragging: false,
      dragState: {}
    }
  },
  computed: {
    styles () {//深拷贝
      const style = Object.assign({}, this.styleObject);
      const width = this.$parent.bodyHeight === 0 ? parseInt(this.styleObject.width) : parseInt(this.styleObject.width) + this.$parent.scrollBarWidth;
      style.width = `${width}px`;
      return style;
    },
    isSelectAll () {
      let isSelectAll = true;
      if (!this.data.length) isSelectAll = false;
      for (let i = 0; i < this.data.length; i++) {
        if (!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled) {
          isSelectAll = false;
          break;
        }
      }
      return isSelectAll;
    }
  },
  mounted(){
    // var that = this;
    // this.columns.forEach(function (column,index) {
    //   that.$set(column,"xxx",that.setCellWidth(column, index, true))
    // })
  },
  methods: {
    cellClasses (column) {
      return [
        `${this.prefixCls}-cell`,
        {
          [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')
        }
      ];
    },
    itemClasses (column, item) {
      return [
        `${this.prefixCls}-filter-select-item`,
        {
          [`${this.prefixCls}-filter-select-item-selected`]: column._filterChecked[0] === item.value
        }
      ];
    },
    itemAllClasses (column) {
      return [
        `${this.prefixCls}-filter-select-item`,
        {
            [`${this.prefixCls}-filter-select-item-selected`]: !column._filterChecked.length
        }
      ];
    },
    selectAll () {
      const status = !this.isSelectAll;
      this.$parent.selectAll(status);
    },
    handleSort (index, type) {
      if (this.columns[index]._sortType === type) {
          type = 'normal';
      }
      let _index = this.columns[index]._index;
      this.$parent.handleSort(_index, type);
    },
    handleSortByHead (index) {
      const column = this.columns[index];
      if (column.sortable) {
        const type = column._sortType;
        if (type === 'normal') {
            this.handleSort(index, 'asc');
        } else if (type === 'asc') {
            this.handleSort(index, 'desc');
        } else {
            this.handleSort(index, 'normal');
        }
      }
    },
    handleFilter (index) {
      let _index = this.columns[index]._index;
      this.$parent.handleFilter(_index);
    },
    handleSelect (index, value) {
      let _index = this.columns[index]._index;
      this.$parent.handleFilterSelect(_index, value);
    },
    handleReset (index) {
      let _index = this.columns[index]._index;
      this.$parent.handleFilterReset(_index);
    },
    handleFilterHide (index) {
      let _index = this.columns[index]._index;
      this.$parent.handleFilterHide(_index);
    },
    mousedown(event,column,index){
      if (this.$isServer) return;
      if (!column) return;
      let _this = this;
      if (!this.canDrag) return;
      if (!this.draggingColumn) return;
      this.dragging = true;      
      this.$parent.resizeProxyVisible = true;

      const table = this.$parent; 
      const tableEl = table.$el;
      const tableLeft = tableEl.getBoundingClientRect().left;
      const columnEl = this.$el.querySelector(`th.h-ui-${column.key}`);
      const columnRect = columnEl.getBoundingClientRect();
      const minLeft = columnRect.left - tableLeft + 30;

      let lastWidth =this.findObj(event,"TR").lastChild.offsetWidth;
      // console.log(this.findObj(event,"TR").lastChild);
      // console.log(lastWidth);
      let tableWidth = this.$el.parentElement.offsetWidth-1;
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
            if (headWidth+1>=tableWidth) {//此时有滚动条
              if (headWidth+1+dragWidth<=tableWidth) {
                lastWidth =lastWidth+tableWidth-headWidth-dragWidth;
              }
            }else{
              lastWidth = lastWidth-dragWidth;
            }
          }
          if (table.bodyHeight !== 0) {
            lastWidth = lastWidth - getScrollBarSize();
          }
          _this.$emit('on-change-width', columnWidth, column.key,lastWidth);

          document.body.style.cursor = '';
          _this.dragging = false;
          _this.draggingColumn = null;
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
      if (!this.canDrag || !column ) return;
      if (column.children && column.children.length > 0) return;
      let target = this.findObj(event,"TH");
      if (!this.dragging) {
        let rect = target.getBoundingClientRect();

        const bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          this.draggingColumn = null;
        }
      }
    },
    mouseout() {
      if (this.$isServer) return;
      document.body.style.cursor = '';
    },
    findObj(e,name){
      var obj=e.target;
      while(obj&&obj.tagName!=name){
        obj=obj.parentElement
      }
      return obj;      
    }
  }
};
</script>
