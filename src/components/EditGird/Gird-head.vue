<template>
  <table cellspacing="0" cellpadding="0" border="0" :style="styles">
  <!-- 签用于对表格中的列进行组合，以便对其进行格式化。 -->
    <colgroup>
      <col v-for="(column, index) in columns" :width="setCellWidth(column, index, true)" :key="index">
    </colgroup>
    <thead>
      <tr v-if="multiLevel" v-for="(colItem,inx) in multiData" :key="inx">
        <th v-for="(multi, index) in colItem" :colspan="multi.cols||1" :rowspan="multi.rows||1" :key="index" :class="aliCls(multi)">
          <div :class="[prefixCls+'-cell']"><span>{{multi.title}}</span></div>
        </th>
      </tr>
      <tr class="cur-th">
        <th v-for="(column, index) in columns"
          :class="alignCls(column)" 
          :key="index"
          >
          <div :class="cellClasses(column)">
            <template v-if="column.type === 'expand'"></template>
            <template v-else-if="column.type === 'selection'">
              <Checkbox :value="isSelectAll" @on-change="selectAll"></Checkbox>
            </template>
            <template v-else>
              <span v-if="!column.renderHeader" @click="handleSortByHead(index)">{{ column.title || '#' }}</span>
              <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
            </template>
            <template>
              <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                <Icon name="android-arrow-dropup" :class="{on: column._sortType === 'asc'}" @on-click="handleSort(index, 'asc')" @mousedown.native.stop="handleClick"></Icon>
                <Icon name="android-arrow-dropdo" :class="{on: column._sortType === 'desc'}" @on-click="handleSort(index, 'desc')" @mousedown.native.stop="handleClick"></Icon>
              </span>
              <Poptip
                v-if="isPopperShow(column)"
                v-model="column._filterVisible"
                placement="bottom"
                @on-popper-hide="handleFilterHide(index)">
                <span :class="[prefixCls + '-filter']">
                  <Icon name="keyboard" @mousedown.native.stop="handleClick" :class="{on: column._isFiltered}"></Icon>
                </span>
                <div slot="content" :class="[prefixCls + '-filter-list']" v-if="column._filterMultiple" @mousedown="handleClick">
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
                <div slot="content" :class="[prefixCls + '-filter-list']" v-else @mousedown="handleClick">
                  <ul :class="[prefixCls + '-filter-list-single']">
                    <li
                      :class="itemAllClasses(column)"
                      @click="handleReset(index)">{{ t('i.table.clearFilter') }}</li>
                    <li
                      :class="itemClasses(column, item)"
                      v-for="item in column.filters"
                      :key = "item.value"
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
import hButton from '../Button/Button.vue';
import renderHeader from './header';
import { on, off } from '../../util/dom';
import {getScrollBarSize,hasClass,addClass,removeClass} from '../../util/tools';
import Mixin from './mixin';
import Locale from '../../mixins/locale';

export default {
  name: 'GirdHead',
  mixins: [ Mixin, Locale ],
  components: {CheckboxGroup, Checkbox,hButton, renderHeader,Icon},
  props: {
    prefixCls: String,
    styleObject: Object,
    columns: Array,
    objData: Object,
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // data: Array,    // rebuildData for sort or filter
    columnsWidth: Object,
    fixed: {
      type: [Boolean, String],
      default: false
    },
    multiLevel:Array,
  },
  data(){
    return{
      draggingColumn: null,
      dragging: false,
      dragState: {},
      multiData:null,
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
    this.multiData = this.multiLevel;
  },
  methods: {
    handleClick (event) {
      event.stopPropagation();
    },
    cellClasses (column) {
      return [
        `${this.prefixCls}-cell`,
      ];
    },
    selectAll () {
      const status = !this.isSelectAll;
      this.$parent.selectAll(status);
    },
    handleSortByHead (index) {
    },
    aliCls(item){
      return[
        { 
          [`${item.className}`]: item.className,
          [`${this.prefixCls}-column-${item.align}`]: item.align,
        }
      ]
    },
    handleSort (index, type) {
      if (this.columns[index]._sortType === type) {
          type = 'normal';
      }
      let _index = this.columns[index]._index;
      this.$parent.handleSort(_index, type);
    },
  },
  watch:{
    multiLevel(val){
      this.multiData = this.multiLevel;
    }
  }
};
</script>
