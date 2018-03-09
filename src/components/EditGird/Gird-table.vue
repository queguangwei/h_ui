<template>
  <div :class="wrapClasses" :style="styles" @mouseleave="handleMouseLeave($event)" ref="tableWrap">
    <div :class="classes">
      <div :class="[prefixCls + '-header']" v-if="showHeader" ref="header" @mousewheel="handleMouseWheel">
        <gird-head
          :prefix-cls="prefixCls"
          :styleObject="tableStyle"
          :columns="cloneColumns"
          :obj-data="objData"
          :columns-width="columnsWidth"
          :data="rebuildData"
          ></gird-head>
      </div>
      <div :class="[prefixCls + '-body']" :style="bodyStyle" ref="body" @scroll="handleBodyScroll"
        v-show="!((!!localeNoDataText && (!data || data.length === 0)) || ((!rebuildData || rebuildData.length === 0)))">
        <gird-body
          ref="tbody"
          :prefix-cls="prefixCls"
          :styleObject="tableStyle"
          :columns="cloneColumns"
          :data="rebuildData"
          :columns-width="columnsWidth"
          :rowSelect = "rowSelect && selectType"
          :obj-data="objData"
          :showEditInput="showEditInput"
          :typeName="typeName"
          :isCheckbox="isCheckbox"
          :checkStrictly="checkStrictly"
          @on-select-change="selectChange"
          ></gird-body>
      </div>
      <div :class="[prefixCls + '-tip']"
        v-show="((!!localeNoDataText && (!data || data.length === 0)) || (!rebuildData || rebuildData.length === 0))">
        <table cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr>
              <td :style="{ 'height': bodyStyle.height }">
                <span v-html="localeNoDataText" v-if="!data || data.length === 0"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Spin fix size="large" v-if="loading">
      <slot name="loading">
        <h-icon name="load-c" size=18 class='h-load-loop'></h-icon>
        <div v-html="loadingText"></div>
      </slot>
    </Spin>
  </div>
</template>
<script>
import GirdHead from './Gird-head.vue';
import GirdBody from './Gird-body.vue';
import Spin from '../Spin/Spin.vue';
import Mixin from './mixin';
import { oneOf, getStyle, deepCopy, getScrollBarSize,findInx} from '../../util/tools';
import { on, off } from '../../util/dom';
import Locale from '../../mixins/locale';

const prefixCls = 'h-editgird';

let rowKey = 1;
let columnKey = 1;

export default {
  name: 'EditGird',
  mixins: [ Locale,Mixin ],
  components: { GirdHead, GirdBody },
  props: {
    typeName:{
      type:String
    },
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default']);
      }
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return '';
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    rowSelect:{
      type:Boolean,//多选时是否支持点击行选中
      default:false
    },
    showEditInput:{
      type:Boolean,
      default:false
    },
    isCheckbox:{
      type:Boolean,
      default:false
    },
    checkStrictly:{
      type:Boolean,
      default:false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      ready: false,
      tableWidth: 0,
      initWidth:0,
      tipWidth:0,
      columnsWidth: {},
      prefixCls: prefixCls,
      compiledUids: [],
      objData: this.makeObjData(),     // checkbox or highlight-row
      rebuildData: [],    // for sort or filter
      cloneColumns: this.makeColumns(),
      bodyHeight: 0,
      bodyRealHeight: 0,
      scrollBarWidth: getScrollBarSize(),
      currentContext: this.context,
      cloneData: deepCopy(this.data),    // when Cell has a button to delete row data, clickCurrentRow will throw an error, so clone a data
      showScroll:false,
      headerRealHeight:0,
      selectType:false,
    };
  },
  computed: {
    loadingText(){
      return this.t('i.table.loadingText');
    },
    localeNoDataText () {
      if (this.noDataText === undefined) {
        return this.t('i.table.noDataText');
      } else {
        return this.noDataText;
      }
    },
    wrapClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-hide`]: !this.ready,
        }
      ];
    },
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-border`]: this.border,
          [`${prefixCls}-stripe`]: this.stripe,
          [`${prefixCls}-with-fixed-top`]: !!this.height
        }
      ];
    },
    fixedHeaderClasses () {
      return [
        `${prefixCls}-fixed-header`,
        {
          [`${prefixCls}-fixed-header-with-empty`]: !this.rebuildData.length
        }
      ];
    },
    styles () {
      let style = {};
      if (this.height) {
        const height = (this.isLeftFixed || this.isRightFixed) ? parseInt(this.height) + this.scrollBarWidth : parseInt(this.height);
        style.height = `${height+2}px`;
      }
      if (this.width) style.width = `${this.width}px`;
      return style;
    },
    tableStyle () {
      let style = {};
      if (this.tableWidth !== 0) {
        let width = '';
        if (this.bodyHeight === 0) {
          width = this.tableWidth;
        } else {
          if (this.bodyHeight > this.bodyRealHeight) {
            width = this.tableWidth;
          } else {
            width = this.tableWidth - this.scrollBarWidth;
          }
        }
        //const width = this.bodyHeight === 0 ? this.tableWidth : this.tableWidth - this.scrollBarWidth;
        style.width = `${width}px`;
      }
      return style;
    },
    bodyStyle () {
      let style = {};
      if (this.bodyHeight !== 0) {
        // add a height to resolve scroll bug when browser has a scrollBar in fixed type and height prop
        const height = (this.isLeftFixed || this.isRightFixed) ? this.bodyHeight + this.scrollBarWidth : this.bodyHeight;
        style.height = `${height}px`;
      }
      return style;
    },

  },
  methods: {
    rowClsName (index) {
      return this.rowClassName(this.data[index], index);
    },
    handleMouseLeave() {
      
    },
    handleResize () {
      this.$nextTick(() => {
        const allWidth = !this.columns.some(cell => !cell.width&&cell.width!==0);    // each column set a width
        if (allWidth) {
          this.tableWidth = this.columns.map(cell => cell.width).reduce((a, b) => a + b);
        } else {
          this.tableWidth = parseInt(getStyle(this.$el, 'width')) - 1;
        }
        this.columnsWidth = {};
        this.$nextTick(() => {
          let columnsWidth = {};
          let autoWidthIndex = -1;
          // if (allWidth) autoWidthIndex = this.cloneColumns.findIndex(cell => !cell.width);//todo 这行可能有问题
          if (allWidth) autoWidthIndex = findInx(this.cloneColumns,cell => !cell.width);
          this.cloneColumns.forEach((cell,i)=>{})
          if (this.data.length) {
            const $td = this.$refs.tbody.$el.querySelectorAll('tbody tr')[0].querySelectorAll('td');
            for (let i = 0; i < $td.length; i++) {    // can not use forEach in Firefox
              const column = this.cloneColumns[i];

              let width = parseInt(getStyle($td[i], 'width'));
              if (i === autoWidthIndex) {
                  width = parseInt(getStyle($td[i], 'width')) - 1;
              }
             // if (column.width) width = column.width||'';
             // 自适应列在表格宽度较小时显示异常，为自适应列设置最小宽度100（拖拽后除外）
              if (column.width) {
                  width = column.width||''
              } else {
                  if (width < 100) width = 100
              }

              this.cloneColumns[i]._width = width||'';

              columnsWidth[column._index] = {
                  width: width
              };
            }
            this.columnsWidth = columnsWidth;
          }

        });
        // get table real height,for fixed when set height prop,but height < table's height,show scrollBarWidth
        this.bodyRealHeight = parseInt(getStyle(this.$refs.tbody.$el, 'height'));
      });
    },
    handleMouseIn (_index) {
      if (this.disabledHover) return;
      if (this.typeName=="groupTable"&&String(_index).indexOf('.')!=-1) {
        let k = String(_index).split('.')[0];
        let m = Number(String(_index).split('.')[1])-1;
        if(this.objData[k].item[m]._isHover) return;
        this.objData[k].item[m]._isHover = true;
      }else{
        if (this.objData[_index]._isHover) return;
        this.objData[_index]._isHover = true;
      }
    },
    handleMouseOut (_index) {
        if (this.disabledHover) return;
        if (this.typeName=="groupTable"&&String(_index).indexOf('.')!=-1) {
          let k = String(_index).split('.')[0];
          let m = Number(String(_index).split('.')[1])-1;
          this.objData[k].item[m]._isHover = false;
        }else{
         this.objData[_index]._isHover = false;
        }
    },
    highlightCurrentRow (_index) {
      if (this.typeName=="groupTable" && String(_index).indexOf('.')!=-1) {
        var k = String(_index).split('.')[0];
        var m = Number(String(_index).split('.')[1])-1;
        let oldIndexI = -1;
        let oldIndexJ = -1;
        for(let i in this.objData){
          this.objData[i].item.forEach((col,j)=>{
            if (col._isHighlight) {
              oldIndexI=i;
              oldIndexJ=j;
              col._isHighlight = false;
            }
          });          
        }
        this.$set(this.objData[k].item[m],'_isHighlight',true);
        // this.objData[k].item[m]._isHighlight = true;
        const oldData = oldIndexJ<0?null:this.getGroupData(oldIndexI,oldIndexJ);
        const currentData = this.getGroupData(k,m)
        this.$emit('on-current-change', JSON.parse(JSON.stringify(currentData)),oldData);
      }else{
        if (!this.highlightRow || this.objData[_index]._isHighlight) return;
        let oldIndex = -1;
        for (let i in this.objData) {
          if (this.objData[i]._isHighlight) {
            oldIndex = parseInt(i);
            this.objData[i]._isHighlight = false;
          }
        }
        this.objData[_index]._isHighlight = true;
        const oldData = oldIndex < 0 ? null : JSON.parse(JSON.stringify(this.cloneData[oldIndex]));
        this.$emit('on-current-change', JSON.parse(JSON.stringify(this.cloneData[_index])), oldData);
      }
    },
    clickCurrentRow (_index) {
      if (this.typeName=="groupTable" && String(_index).indexOf('.')!=-1) {
        let arr = String(_index).split('.');
        let i = arr[0];
        let j = Number(arr[1])-1;
        let currentData = this.getGroupData(i,j);
        this.$emit('on-row-click', JSON.parse(JSON.stringify(currentData)));
      }else{
        this.$emit('on-row-click', [JSON.parse(JSON.stringify(this.cloneData[_index])),_index]);
      }
      if ((!this.rowSelect || !this.selectType)&&this.highlightRow) {
        this.highlightCurrentRow(_index);
      }
    },
    getGroupData(k,m){
      let groupData={};
      groupData = deepCopy(this.cloneData[k]);
      groupData.item = this.cloneData[k].item[m];
      return groupData;
    },
    dblclickCurrentRow (_index) {
      if ((!this.rowSelect || !this.selectType)&&this.highlightRow) {
        this.highlightCurrentRow (_index);
      }
      this.$emit('on-row-dblclick', JSON.parse(JSON.stringify(this.cloneData[_index])));
    },
    getSelection () {
      let selectionIndexes = [];
      for (let i in this.objData) {
        if (this.objData[i]._isChecked) selectionIndexes.push(parseInt(i));
      }
      return JSON.parse(JSON.stringify(this.cloneData.filter((data, index) => selectionIndexes.indexOf(index) > -1)));
    },
    getGroupSelection(){
      var _this =this;
      let groupSelection = [];
      for(let i in this.objData){
        if (_this.objData[i]._isChecked) {
          groupSelection.push(_this.cloneData[i]);
        }else if (_this.objData[i].item.some(col=>col._isChecked)) {
          let groupItem = deepCopy(_this.cloneData[i]);
          groupItem.item = [];
          _this.objData[i].item.forEach((col,inx)=>{
            if (col._isChecked) {
              groupItem.item.push(_this.cloneData[i].item[inx]);
            }
          });
          groupSelection.push(groupItem);
        }
      }
      return  JSON.parse(JSON.stringify(groupSelection));
    },
    toggleSelect (_index) {
      let _this = this
      if (_this.typeName=='groupTable') {
        if (String(_index).indexOf('.') != -1) {
          let k = String(_index).split('.')[0];
          let m = Number(String(_index).split('.')[1])-1;
          let data = _this.objData[k].item[m];
          const status = !data._isChecked;
          _this.objData[k].item[m]._isChecked = status;
          _this.objData[k]._isChecked = !_this.objData[k].item.some(col=>!col._isChecked);

          const selection = _this.getGroupSelection();
          _this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(_this .getGroupData(k,m))));
          _this.$emit('on-selection-change', selection);

        }else{        
          let data ={};
          for(let i in _this.objData){
            if(parseInt(i) === _index){
              data = _this.objData[i];
            }
          }
          const status = !data._isChecked;
          data.item.forEach((col,inx)=>{
            col._isChecked=status;
          });
          _this.objData[_index]._isChecked = status;

          const selection = _this.getGroupSelection();
          _this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(_this.cloneData[_index])));
          _this.$emit('on-selection-change', selection);
        }
      }else{
        let data = {};
        for (let j in _this.objData) {
            if (parseInt(j) === _index) {
                data = _this.objData[j];
            }
        }
        const status = !data._isChecked;

        _this.objData[_index]._isChecked = status;

        const selection = this.getSelection();
        this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(this.data[_index])));
        this.$emit('on-selection-change', selection);
      }
    },
    toggleExpand (_index) {
      let _this = this;
      let data = {};
      for (let i in _this.objData) {
        if (parseInt(i) === _index) {
          data = _this.objData[i];
        }
      }
      const status = !data._isExpanded;
      this.objData[_index]._isExpanded = status;
      if (this.typeName!='treeGird') {
        this.$set(this.rebuildData[_index],'expand',status);
      }
      // this.$emit('on-expand', JSON.parse(JSON.stringify(this.cloneData[_index])), status);
      this.$emit('on-expand',status);
    },
    selectAll (status) {
        // this.rebuildData.forEach((data) => {
        //     if(this.objData[data._index]._isDisabled){
        //         this.objData[data._index]._isChecked = false;
        //     }else{
        //         this.objData[data._index]._isChecked = status;
        //     }
            
        // });
        for(const data of this.rebuildData){
          if(this.objData[data._index]._isDisabled){
            continue;
          }else{
            this.objData[data._index]._isChecked = status;
            if(this.typeName=='groupTable' && this.objData[data._index].item){
              this.objData[data._index].item.forEach(col=>{
                col._isChecked =status;
              });
            }
          }
        }
        const selection = this.getSelection();
        if (status) {
            this.$emit('on-select-all', selection);
        }
        this.$emit('on-selection-change', selection);
    },
    fixedHeader () {
        if (this.height) {
            this.$nextTick(() => {
                const headerHeight = this.headerRealHeight;
                this.bodyHeight = this.height - headerHeight;
            });
        } else {
            this.bodyHeight = 0;
        }
    },
    handleBodyScroll (event) {
      let _this = this;
      if (this.showHeader) this.$refs.header.scrollLeft = event.target.scrollLeft;
      // console.log(event.target.scrollLeft);
      const verifyTips = this.$refs.tbody.$el.querySelectorAll('.verify-tip')
      if (verifyTips && verifyTips.length>0) {
        for (let i = 0; i < verifyTips.length; i++) {
          let verifyTip = verifyTips[i];
          let canEdit = verifyTip.parentNode.querySelectorAll('.canEdit')[0];
          let left = canEdit.offsetLeft - event.target.scrollLeft;
          let width = verifyTip.getBoundingClientRect().width;
          if (width!=0) {
            this.tipWidth = width;
          }else{
            width = this.tipWidth;
          }
          verifyTip.style.left = left+'px';
          let top =canEdit.offsetTop+canEdit.getBoundingClientRect().height -event.target.scrollTop;
          verifyTip.style.top = top+'px';

          if (left<=0 || left> _this.initWidth-width || top<=this.headerRealHeight || top>=this.height ){
            verifyTip.style.display = 'none';
          }else{
            verifyTip.style.display = 'block';
          }        
        }
      }
    },
    handleMouseWheel (event) {
        const deltaX = event.deltaX;
        const $body = this.$refs.body;

        if (deltaX > 0) {
            $body.scrollLeft = $body.scrollLeft + 10;
        } else {
            $body.scrollLeft = $body.scrollLeft - 10;
        }
    },
    makeData () {
        let data = deepCopy(this.data);
        data.forEach((row, index) => {
            row._index = index;
            row._rowKey = rowKey++;
            if (row.item && typeof(row.item)=='object') {
              row.item.forEach((obj,i)=>{
                i=i+1;
                obj._index = Number(index+'.'+i);
                obj._rowKey = rowKey++;
                obj.expand = obj.expand? true:false;
              });
            }
        });
        return data;
    },
    makeDataWithSort () {
        let data = this.makeData();
        return data;
    },
    makeDataWithFilter () {
      let data = this.makeData();
      return data;
    },
    makeDataWithSortAndFilter () {
      let data = this.makeDataWithSort();
      if (this.typeName=='treeGird') {
        let attributes = {
          keyField: 'id',
          parentKeyField: '_parentId',
          expanded: 'expand',
          checked: 'checked',
          checked: 'indeterminate',
          rootKey: 'root'
        }
        data = this.convertTreeData(data, attributes);
      }
      return data;
    },
    makeObjData () {
      let data = {};
      this.data.forEach((row, index) => {
        const newRow = deepCopy(row);// todo 直接替换
        if (this.typeName == 'groupTable' && newRow.item) {
          if (newRow._checked) {
            newRow._isChecked = newRow._checked;
          } else {
            newRow._isChecked = false;
          }
          if (newRow.expand) {
            newRow._isExpanded = newRow.expand;
          } else {
            newRow._isExpanded = false;
          }
          newRow.item.forEach((obj,i)=>{
            obj._isHover = false;
            if (obj._disabled) {
              obj._isDisabled = obj._disabled;
            } else {
              obj._isDisabled = false;
            }
            if (obj._checked) {
              obj._isChecked = obj._checked;
            } else {
              obj._isChecked = false;
            }
            if (obj._highlight) {
              obj._isHighlight = obj._highlight;
            } else {
              obj._isHighlight = false;
            }
          });
          data[index] = newRow;
        }else{
          newRow._isHover = false;
          if (newRow._disabled) {
              newRow._isDisabled = newRow._disabled;
          } else {
              newRow._isDisabled = false;
          }
          if (newRow._checked) {
              newRow._isChecked = newRow._checked;
          } else {
              newRow._isChecked = false;
          }
          if (newRow.expanded) {
              newRow._isExpanded = newRow.expanded;
          } else {
              newRow._isExpanded = false;
          }
          if (newRow._highlight) {
              newRow._isHighlight = newRow._highlight;
          } else {
              newRow._isHighlight = false;
          }
          if (this.typeName == "treeGird") {
            if (newRow.checked) {
                newRow.checked = newRow.checked;
            } else {
                newRow.checked = false;
            }
            if (newRow.indeterminate) {
                newRow.indeterminate = newRow.indeterminate;
            } else {
                newRow.indeterminate = false;
            }
          }
          data[index] = newRow;
        }
      });
      return data;
    },
    makeColumns () {
      var that = this;
      let columns = deepCopy(this.columns);
      let center = [];

      columns.forEach((column, index) => {
        column._index = index;
        column._columnKey = columnKey++;
        column._width = column.width ? column.width : '';    // update in handleResize()
        if(!!column.hiddenCol){
          that.columns[index].width = 0;
          column.width = 0;
          column._width = 0;
        }
        column._sortType = 'normal';
        column._filterVisible = false;
        column._isFiltered = false;
        column._filterChecked = [];

        if (!column.hiddenCol) {
          center.push(column);
        }
      });
      return center;
    },
    getTreeSelection(){
      let selection = []
      for (let i in this.objData) {
        if (this.objData[i]._isChecked) {
          selection.push(this.cloneData[i]);
        }
      }
      return selection;
    },
    selectChange(){
      this.$emit('on-select-change', this.getTreeSelection());
    }
  },
  created () {
      if (!this.context) this.currentContext = this.$parent;
      this.rebuildData = this.makeDataWithSortAndFilter();
  },
  mounted () {
    if (this.showHeader) {
      if (!!this.size) {
        this.headerRealHeight = this.size=='small'?35:48;
      }else{
        this.headerRealHeight=42;
      }
    }
    if (this.columns[0].type && this.columns[0].type=='selection') {
      this.selectType=true;
    }
    this.handleResize();
    this.fixedHeader();
    this.$nextTick(() => {
      this.ready = true;
      this.initWidth =parseInt(getStyle(this.$refs.tableWrap, 'width')) || 0; 
    });
    //window.addEventListener('resize', this.handleResize, false);
    on(window, 'resize', this.handleResize);
    on(window, 'resize', ()=>{
      this.$nextTick(() => {
        this.initWidth =parseInt(getStyle(this.$refs.tableWrap, 'width')) || 0; 
      });
    });
    this.$on('on-visible-change', (val) => {
      if (val) {
          this.handleResize();
          this.fixedHeader();
      }
    });
  },
  beforeDestroy () {
      //window.removeEventListener('resize', this.handleResize, false);
      off(window, 'resize', this.handleResize);
  },
  watch: {
      data: {
          handler () {
              const oldDataLen = this.rebuildData.length;
              this.objData = this.makeObjData();
              this.rebuildData = this.makeDataWithSortAndFilter();
              this.handleResize();
              if (!oldDataLen) {
                  this.fixedHeader();
              }
              // here will trigger before clickCurrentRow, so use async
              setTimeout(() => {
                  this.cloneData = deepCopy(this.data);
              }, 0);
          },
          deep: true
      },
      columns: {
          handler () {
              // todo 这里有性能问题，可能是左右固定计算属性影响的
              this.cloneColumns = this.makeColumns();
              this.rebuildData = this.makeDataWithSortAndFilter();
              this.handleResize();
          },
          deep: true
      },
      height () {
          this.fixedHeader();
      }
  }
};
</script>
