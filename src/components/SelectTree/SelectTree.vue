<template>
  <div :class="classes" v-clickoutside="handleClose" :style="multiplestyle" ref="select" >
    <div
      :class="[prefixCls + '-selection']"
      ref="reference"
      @click="toggleMenu">
      <!-- 多选时输入框内选中值模拟 -->
      <div class="h-tag" v-for="(item, index) in selectedMultiple">
        <span class="h-tag-text">{{ item }}</span>
        <!-- <Icon name="close" @click.native.stop="removeTag(index)"></Icon>  -->
      </div>
      <!-- 输入框模拟 -->
      <span :class="[prefixCls + '-placeholder']" v-show="showPlaceholder && !filterable">{{ localePlaceholder }}</span>
      <span :class="[prefixCls + '-selected-value']" v-show="!showPlaceholder && !showCheckbox && !filterable">{{ selectedSingle }}</span>
      <!-- 模糊匹配输入框模拟 -->
      <input
        type="text"
        v-if="filterable"
        v-model="query"
        :disabled="disabled"
        :class="[prefixCls + '-input']"
        :placeholder="showPlaceholder ? localePlaceholder : ''"
        :style="inputStyle"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInputDown"
        @keydown.delete="handleInputDelete"
        ref="input">
      <!-- 单选时清空按钮 -->
      <Icon name="close" :class="[prefixCls + '-arrow']" v-show="showCloseIcon" @click.native.stop="clearSingleSelect"
      ref="close"></Icon>
      <Icon name="arrowdownb" :class="[prefixCls + '-arrow']" ref="arrowb"></Icon>
    </div>
    <transition :name="transitionName">
      <Drop v-show="dropVisible" 
        :placement="placement" 
        :class="dropdownCls"
        :data-transfer="transfer" 
        ref="dropdown"
        v-transfer-dom>
        <!--  <ul v-show="notFountShow" :class="[prefixCls + '-not-found']"><li>{{ localeNotFoundText }}</li></ul> -->
        <Tree ref="tree" :data="baseDate" :show-checkbox="showCheckbox" :multiple="multiple" :checkStrictly="checkStrictly" :showIndeterminate="showIndeterminate" @on-select-change="selectChange" @on-check-change="checkChange" @on-toggle-expand="toggleExpand">
          
        </Tree>
        
        <!-- 加载中 -->
        <!-- <ul v-show="loading" :class="[prefixCls + '-loading']">{{ localeLoadingText }}</ul> -->
      </Drop>
    </transition>
  </div>
</template>
<script>
  import Icon from '../Icon/Icon.vue';
  import Drop from '../Select/Dropdown.vue';
  import Tree from '../Tree/Tree.vue'
  import clickoutside from '../../directives/clickoutside';
  import TransferDom from '../../directives/transfer-dom';
  import { oneOf, findComponentChildren,getScrollBarSize, getStyle,hasClass,typeOf} from '../../util/tools';
  import Emitter from '../../mixins/emitter';
  import Locale from '../../mixins/locale';
  const prefixCls = 'h-selectTree';
  export default{
    name:"SelectTree",
    mixins:[Emitter,Locale],
    directives:{clickoutside,TransferDom},
    components:{Icon,Drop,Tree},
    props:{
      value: {
        type: [String, Number, Array],
        default: ''
      },
      firstValue:{
        type: [String, Number, Array],
        default: ''
      },
      placeholder: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: true
      },
      data:{
        type: Array,
        default () {
          return [];
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      //父子组件关联
      checkStrictly:{
        type:Boolean,
        default:false
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      showIndeterminate:{
        type:Boolean,
        default: true
      },
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default']);
        },
        default: 'default'
      },
      placement: {
        validator (value) {
            return oneOf(value, ['top', 'bottom']);
        },
        default: 'bottom'
      },
      filterable: {
        type: Boolean,
        default: false
      },
      disabled:{
        type:Boolean,
        default:false
      },
      width: {
        type: [String, Number]
      },
      transfer: {
        type: Boolean,
        default: false
      },
      autoComplete: {
        type: Boolean,
        default: false
      },
      formatValue:{//设置v-model返回的值
        type:String,
        default:'title'
      },
      isString:{//多选专用，v-model输入输出值以逗号隔开
        type:Boolean,
        default:false,
      }
    },
    data(){
      return{
        prefixCls: prefixCls,
        visible: false,
        selectedSingle: '',  
        selectedMultiple: [],
        query:'',
        inputLength: 20,
        notFound: false,
        model: this.value,
        currentLabel: this.label,
        scrollBarWidth:getScrollBarSize(),
        isFocus: false,
        isFirst: false,
        baseDate: this.data,
      }
    },
    computed:{
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-visible`]: this.visible,
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-multiple`]: this.showCheckbox,
            [`${prefixCls}-single`]: !this.showCheckbox,
            [`${prefixCls}-show-clear`]: this.showCloseIcon,
            [`${prefixCls}-${this.size}`]: !!this.size
          }
        ];
      },
      dropdownCls () {
        return {
          [prefixCls + '-dropdown-transfer']: this.transfer,
          // [prefixCls + '-multiple']: this.multiple && this.transfer,
          ['h-auto-complete']: this.autoComplete,
        };
      },
      showPlaceholder () {
        let status = false;
        if ((typeof this.model) === 'string') {
          if (this.model === '') {
            status = true;
          }
        } else if (Array.isArray(this.model)) {
          if (!this.model.length) {
            status = true;
          }
        } else if( this.model === null){
          status = true;
        }
        return status;
      },
      showCloseIcon () {
        return this.clearable && !this.showPlaceholder;
      },
      inputStyle () {
        let style = {};
        if (this.multiple) {
          if (this.showPlaceholder) {
            style.width = '100%';
          } else {
            style.width = `${this.inputLength}px`;
          }
        }
        return style;
      },
      localePlaceholder () {
          if (this.placeholder === undefined) {
              return this.t('i.select.placeholder');
          } else {
              return this.placeholder;
          }
      },
      localeNotFoundText () {
          if (this.notFoundText === undefined) {
              return this.t('i.select.noMatch');
          } else {
              return this.notFoundText;
          }
      },
      dropVisible () {
          let status = true;
          
          const options = this.$slots.default || [];
          if (!this.loading && this.remote && this.query === '' && !options.length) status = false;
          return this.visible && status;
      },
      transitionName () {
          return this.placement === 'bottom' ? 'slide-up' : 'slide-down';
      },
      multiplestyle () {
        return {
            width: `${this.width}px`,
        };
      },
    },
    methods:{
      offsetArrow(){
        if (!this.showCheckbox) return;
        if (navigator.userAgent.indexOf('Firefox') >= 0) return;//firefox scrollBar bug
        let el = this.$refs.reference;
        if (el.scrollHeight>el.clientHeight) {
          if (this.$refs.close) this.$refs.close.$el.style.right="22px";
          if (this.$refs.arrowb) this.$refs.arrowb.$el.style.right="22px";
        }else{
          if (this.$refs.close) this.$refs.close.$el.style.right="8px";
          if (this.$refs.arrowb) this.$refs.arrowb.$el.style.right="8px";
        }
      },
      toggleMenu () {
        if (this.disabled) {
          return false;
        }
        this.visible = !this.visible;
        this.isFocus = true
      },
      hideMenu () {
        this.visible = false;
        // this.focusIndex = 0;
        this.broadcast('Option', 'on-select-close');
      },
      handleClose () {
        // if (this.filterable) {
        //   this.query = this.filterable?this.model:'';
        //   this.findQuery(this.data,'');
        // }
        this.hideMenu();
        if (this.isFocus) {
          // 点击其他地方时触发blur校验
          if (this.showCheckbox){
            // 多选返回数组
            this.dispatch('FormItem', 'on-form-blur', this.selectedMultiple)          
          } else {
            // 单选返回字符串
            this.dispatch('FormItem', 'on-form-blur', this.selectedSingle)
          }
          this.isFocus = false
        }
        

      },
      selectChange(val){
        let strModel = this.formatValue;
        if (this.visible) {
          this.$emit('on-select-change', val); 
        }
        if (!this.showCheckbox) {
          this.selectedSingle=val.length!=0?val[0].title:'';
          this.query = this.filterable?this.selectedSingle:'';
          this.model = val.length!=0?val[0][strModel]:'';
          this.hideMenu();
          this.findQuery(this.data,'');
        }
      },
      checkChange(val){
        let strModel = this.formatValue;
        if (this.filterable) {
          this.query='';
        }
        let arr=[];
        let arrModel = [];
        val.forEach(item=>{
          arr.push(item.title);
          arrModel.push(item[strModel]);
        })
        this.model=arrModel;
        this.selectedMultiple=arr;
        this.$emit('on-check-change', val);
        // this.$nextTick(()=>{
        //   this.offsetArrow();
        // });
      },
      toggleExpand(val){
        this.$emit('on-toggle-expand', val);
      },
      clearSingleSelect () {
        if (this.showCloseIcon) {
          resetDate(this.data);
          if (!this.showCheckbox) {
            this.model='';
          }else{
            this.model=[];
            this.selectedMultiple=[];
          }
          if (this.filterable) {
            this.query = '';
          }
        }
        function resetDate(data) {
          data.forEach((col,i)=>{
            if (!!col.checked) {
              col.checked = false;
            }
            if(!!col.selected){
              col.selected = false;
            }
            if(!!col.indeterminate){
              col.indeterminate = false;
            }
            if (col.children && col.children.length>0) {
              resetDate(col.children);
            }
          });
        }
      },
      handleFocus(){
        this.query = '';
      },
      handleBlur () {
      },
      handleInputDown () {
        var val = this.query;
        this.findQuery(this.data,val);
      },
      findQuery(data,val){
        var that = this;
        data.forEach((col,i)=>{
          that.$set(col, 'filterable', false);
          if (val!=''&&!!col.title&& col.title.indexOf(val)!=-1) {
            that.$set(col, 'filterable', true);
          }
          if (col.children && col.children.length>0) {
            this.findQuery(col.children,val);
          }
        });
      },
      handleInputDelete () {
        if (this.multiple && this.model.length && this.query === '') {
          this.removeTag(this.model.length - 1);
        }
      },
      strtoArr(val){
        if (this.showCheckbox && this.isString) {
          if (val==''||val==' '||val == null||val == undefined) {
            return [];
          }else if(val.length>0&&val.indexOf(',')==-1){
            return new Array(val);
          }else{
            return val.split(',');
          }
        }else{
          return val;
        }
      },
      arrtoStr(val){
        if (this.showCheckbox && this.isString && typeOf(val) == 'array') {
          if (val.length == 0) {
            return '';
          }else{
            return val.join(',');
          } 
        }else{
          return val;
        }
      },
      setInit(data,value){
        let _this = this;
        function findDown(tdata,curValue){
          tdata.forEach((item)=>{
            if (item[_this.formatValue] == curValue) {
              _this.$set(item,'selected',true);
              return;
            }else{
              if (item.children&&item.children.length>0) {
                findDown(item.children,curValue);
              }
            }
          });
        }
        findDown(data,value);
        this.$nextTick(()=>{
          let tree = this.$refs.tree;     
          this.selectChange(tree.getSelectedNodes());
        });
      }
    },
    watch:{
      firstValue:{
        immediate:true,
        handler(val){
          if (val && val != ' ' && val != []) {
            this.$nextTick(()=>{
              this.setInit(this.baseDate,val);
            });
          }
        }
      },
      value(val){
        this.model = this.strtoArr(val);
      },
      model () {  
        let backModel = this.arrtoStr(this.model);   
        // this.$emit('input', this.model);
        this.$emit('input', backModel);
        // 初次会执行
        if (this.isFirst) {
          this.dispatch('FormItem', 'on-form-change', this.model)
        }
        this.isFirst = true
      },
      selectedMultiple (){
        this.$nextTick(()=>{
          this.offsetArrow();
        })
      },
      visible (val){
        if (val) {
          this.broadcast('Drop', 'on-update-popper');
        } else {
          this.broadcast('Drop', 'on-destroy-popper');
        }
      },
      data : {
        deep: true,
        handler: function (cur) {
          // if (this.firstValue && this.firstValue.length>0 && cur) {
          //   this.setInit(cur,this.firstValue);
          //   this.firstValue = '';
          // }
          this.baseDate = cur;
        }
      }
    },
    mounted(){
      this.$nextTick(()=>{
        let tree = this.$refs.tree;
        if (!!this.showCheckbox) {
          this.checkChange(tree.getCheckedNodes());
        }else{
          this.selectChange(tree.getSelectedNodes());
        }
        this.offsetArrow();
      });
    }
  }
</script>