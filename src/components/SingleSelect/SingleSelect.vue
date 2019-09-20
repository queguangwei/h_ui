<template>
  <div :class="classes"
       v-clickoutside="{trigger: 'mousedown', handler: handleClose}"
       ref="select">
    <div :class="[prefixCls + '-selection']"
         ref="reference"
         :tabindex="selectTabindex"
         @keydown="keydown"
         @click="showdrop">
      <!-- 下拉输入框模拟（非远程搜索时渲染）  -->
      <span :class="[prefixCls + '-placeholder']"
            v-show="showPlaceholder && (!filterable&&!newSearchModel||showBottom)">{{ localePlaceholder }}</span>
      <span :class="[prefixCls + '-selected-value']"
            v-show="!showPlaceholder && !(filterable && !showBottom)">{{ selectedSingle }}</span>
      <!-- 下拉输入框(远程搜索时渲染) -->
      <input type="text"
             v-if="filterable && !showBottom &&!newSearchModel"
             v-model="query"
             :disabled="disabled"
             :readonly="!editable||readonly"
             :class="[prefixCls + '-input']"
             :placeholder="showPlaceholder?localePlaceholder:''"
             @focus="handleFocus"
             @blur="handleBlur"
             @keydown="resetInputState"
             @keyup="handleInputKeyup($event)"
             :tabindex="tabindex"
             :title="selectedSingle"
             ref="input">
      <Icon name="unfold"
            :class="[prefixCls + '-arrow']"
            v-if="!searchIcon && (!remote || showArrow ||newSearchModel)"
            @click.native.stop="arrowClick"
            ref="arrowb"></Icon>
    </div>
    <div v-if="animated">
      <transition :name="transitionName">
        <Drop :class="dropdownCls"
              :dropWidth="dropWidth"
              v-show="dropVisible"
              :placement="fPlacement"
              :data-transfer="transfer"
              :widthAdaption="widthAdaption"
              :maxDropWidth="maxDropWidth"
              ref="dropdown"
              v-transfer-dom>
          <div :class="content"
               ref="content"
               @click="handleclick">
            <span :class="searchClass"
                  ref='search'
                  v-if="filterable && showBottom">
              <input type="text"
                   v-model="query"
                   :disabled="disabled"
                   :readonly="!editable||readonly"
                   :class="[prefixCls + '-input']"
                   :placeholder="localeSearchHolder"
                   @blur="handleBlur"
                   @keydown="resetInputState"
                   :tabindex="tabindex"
                   ref="input">
            </span>
            <div id="blockWrapper"
                 v-show="(!notFound && !remote) || (remote && !notFound)"
                 :class="[prefixCls + '-dropdown-list']"
                 :style="listStyle"
                 ref='blockWrapper'>
              <slot></slot>
            </div>
            <div v-show="loading" :class="[prefixCls+'-block-loading']">{{localeLoadingText}}</div>
          </div>
        </Drop>
      </transition>
    </div>
    <div v-else>
      <Drop :class="dropdownCls"
            :dropWidth="dropWidth"
            v-show="dropVisible"
            :placement="fPlacement"
            :data-transfer="transfer"
            :widthAdaption="widthAdaption"
            :maxDropWidth="maxDropWidth"
            ref="dropdown"
            v-transfer-dom>
        <div :class="content"
             ref="content"
             @click="handleclick">
          <span :class="searchClass"
                ref='search'
                v-if="filterable && showBottom">
            <input type="text"
                   v-model="query"
                   :disabled="disabled"
                   :readonly="!editable||readonly"
                   :class="[prefixCls + '-input']"
                   :placeholder="localeSearchHolder"
                   @blur="handleBlur"
                   @keydown="resetInputState"
                   :tabindex="tabindex"
                   ref="input">
          </span>
          <div id="blockWrapper"
               v-show="(!notFound && !remote) || (remote && !notFound)"
               :class="[prefixCls + '-dropdown-list']"
               :style="listStyle"
               ref='blockWrapper'>
            <slot></slot>
          </div>
          <div v-show="loading" :class="[prefixCls+'-block-loading']">{{localeLoadingText}}</div>
        </div>
      </Drop>
    </div>
  </div>
</template>
<script>
import Icon from '../Icon/Icon.vue'
import Drop from '../Select/Dropdown.vue'
import clickoutside from '../../directives/clickoutside'
import TransferDom from '../../directives/transfer-dom'
import { on, off } from '../../util/dom'
import { oneOf, getScrollBarSize, getStyle, getBarBottom, scrollAnimate } from '../../util/tools'
import Emitter from '../../mixins/emitter'
import Locale from '../../mixins/locale'
const prefixCls = 'h-selectTable'
export default {
  name: 'SingleSelect',
  mixins: [Emitter, Locale],
  components: { Icon, Drop },
  directives: { clickoutside, TransferDom },
  props: {
    animated: {
      type: Boolean,
      default: true
    },
    isSingleSelect:{
      type:Boolean,
      default:true,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    // 使用时，也得设置 value 才行
    label: {
      type: [String, Number, Array],
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String
    },
    filterable: {
      type: Boolean,
      default: true
    },
    focusSelect: {
      type: Boolean,
      default: true
    },
    matchable: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function
    },
    remote: {
      type: Boolean,
      default: false
    },
    remoteMethod: {
      type: Function,
      default(key, done) {
        done()
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default'])
      }
    },
    labelInValue: {
      type: Boolean,
      default: false
    },
    placement: {
      validator(value) {
        return oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ])
      },
      default: 'bottom'
    },
    width: {
      type: [String, Number]
    },
    transfer: {
      type: Boolean,
      default: false
    },
    isComputed: {
      //是否显示加载完成数据提示
      type: Boolean,
      default: false
    },
    dropWidth: {
      //下拉框的宽度
      type: [String, Number]
    },
    format: {
      type: [Array, String],
      default: function() {
        return ['name,age', '_']
      }
    },
    matchWay: {
      validator(value) {
        return oneOf(value, ['left', 'blurry', 'all'])
      },
      default: 'blurry'
    },
    matchCol: {
      type: [String, Array, Number],
      default: ''
    },
    searchHolder: {
      type: String
    },
    showBottom: {
      type: Boolean,
      default: false
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    autoPlacement: {
      type: Boolean,
      default: false
    },
    widthAdaption: {
      type: Boolean,
      default: false
    },
    maxDropWidth: {
      type: [String, Number],
      default: 500
    },
    // focusIndex 初始值
    focusInit: {
      type: Number,
      default: 0
    },
    //一直显示arrow图标，包括远程搜索时
    showArrow: {
      type: Boolean,
      default: true
    },
    accuFilter: {
      type: Boolean,
      default: true
    },
    isBackClear: {
      type: Boolean,
      default: false
    },
    newSearchModel: {
      type: Boolean,
      dafault: false
    },
    searchIcon: {
      type: [Boolean, String],
      default: false
    },
    keepInputValue: {
      type: Boolean,
      default: false
    },
    showFirstLabelOnly: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: [String, Number],
      default: 0,
      validator(value) {
        let num = parseInt(value)
        return num <= 32767 && num >= -1
      }
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      visible: false,
      options: [],
      optionInstances: [],
      selectedSingle: '',
      focusIndex: 0,
      focusValue: '',
      model: null,
      query: '',
      lastQuery: '',
      selectToChangeQuery: false, // 选择一个值后执行过滤，false: 不执行 true: 执行
      availableOptions: [], // simple select 用于左右键选择时选择可用（过滤后）的options
      inputLength: 56,
      notFound: false,
      currentLabel: this.label,
      isInputFocus: false, //是否焦点，为false时触发blur校验
      scrollBarWidth: getScrollBarSize(),
      tabIndex: 0,
      fPlacement: this.placement,
      isBlock: true,
      isQuerySelect: false,
    }
  },
  computed: {
    searchClass() {
      return [
        `${prefixCls}-search`
      ]
    },
    listStyle() {
      let style = {}
      if (this.showBorder) {
        style.paddingTop = this.showBottom ? '52px' : '0'
      } else {
        style.paddingTop = this.showBottom ? '38px' : '0'
      }
      return style
    },
    classes() {
      return [
        `${prefixCls}`,`${prefixCls}-single`,
        {
          [`${prefixCls}-visible`]: this.visible,
          [`${prefixCls}-disabled`]: this.disabled,
          [`${prefixCls}-readonly`]: this.readonly,
          [`${prefixCls}-editable`]: !this.editable,
          [`${prefixCls}-${this.size}`]: !!this.size
        }
      ]
    },
    dropdownCls() {
      return {
        ['h-select-dropdown-transfer']: this.transfer
      }
    },
    content() {
      return {
        [`${prefixCls}-dropdown-content`]: this.showBorder,
        [`${prefixCls}-dropdown-noline-content`]: !this.showBorder
      }
    },
    showPlaceholder() {
      let status = false
      if (typeof this.model === 'string') {
        if (this.model === '') {
          status = true
        }
      } else if (Array.isArray(this.model)) {
        if (!this.model.length) {
          status = true
        }
      } else if (this.model === null) {
        status = true
      }
      return status
    },
    localePlaceholder() {
      if (this.placeholder === undefined) {
        return this.t('i.select.placeholder')
      } else {
        return this.placeholder
      }
    },
    localeSearchHolder() {
      if (this.searchHolder === undefined) {
        return this.t('i.select.searchHolder')
      } else {
        return this.searchHolder
      }
    },
    localeLoadingText() {
      if (this.loadingText === undefined) {
        return this.t('i.select.loading')
      } else {
        return this.loadingText
      }
    },
    transitionName() {
      const bottomPlaced = this.fPlacement.match(/^bottom/)
      return bottomPlaced ? 'slide-up' : 'slide-down'
    },
    dropVisible() {
      let status = true
      const options = this.$slots.default || []
      if (!this.loading && this.remote && this.query === '' && !options.length)
        status = false
      return this.visible && status
    },
    selectTabindex() {
      return this.disabled ? -1
        : this.tabindex + '' !== '-1'
          ? this.filterable
            ? -1
            : this.tabindex
          : 0
    }
  },
  methods: {
    handleInputKeyup(event){
      //o45 忽略tab
      if(event.keyCode !== 9) {
        this.$emit('on-keyup', this.query, event)
      }
    },
    handleclick(e) {
      e.stopPropagation()
    },
    keydown(event) {
      if (event.keyCode === 9) {
        this.hideMenu()
      }
    },
    handleSelectScroll(event) {
      let num = getBarBottom(event.target, this.scrollBarWidth)
      this.$emit('on-scroll', num)
    },
    showdrop() {
      if (this.disabled || !this.editable || this.readonly) {
        return false
      }
      this.isInputFocus = true
//      this.$nextTick(() => {
//        this.select()
//      })
    },
    arrowClick() {
      this.toggleMenu()
    },
    toggleMenu() {
      if (this.disabled || !this.editable || this.readonly) {
        return false
      }
      this.visible = !this.visible
      if (this.newSearchModel) {
        this.isInputFocus = true
      }
      if (this.visible && this.filterable && this.$refs.input) {
        this.$nextTick(() => {
          this.isInputFocus = true
          this.$refs.input.focus()
        })
      }
    },
    hideMenu() {
      this.visible = false
//      this.broadcast('TabelOption', 'on-select-close')
    },
    clearSingleSelect() {
      if (this.readonly || this.disabled) return
      let result = this.value
      this.toggleSingleSelected('')
      this.model = ''
      if (this.filterable) {
        this.query = ''
        this.selectedSingle = ''
      }
      this.hideMenu()
      this.isInputFocus = true
      this.$emit('on-clear-select', result)
    },
    findChild(cb) {
      const find = function(child) {
        const name = child.$options.componentName
        if (name) {
          cb(child)
        } else if (child.$children.length) {
          child.$children.forEach(innerChild => {
            find(innerChild, cb)
          })
        }
      }
      if (this.optionInstances.length) {
        this.optionInstances.forEach(child => {
          find(child)
        })
      } else {
        this.$children.forEach(child => {
          find(child)
        })
      }
    },
    updateOptions(init, slot = false) {
      let options = []
      this.findChild(child => {
        let data = child.cloneData
        data.forEach((col, i) => {
          options.push({
            value: col.value,
            label: col.label || col.value,
            label1: col[child.showCol[0]],
            disabled: col.disabled || false,
            index: i
          })
        })
      })
      this.options = options
      this.availableOptions = options
      this.broadcast('Drop', 'on-update-popper')
      if (init) {
        if (!this.remote) {
          this.updateSingleSelected(true, slot)
        }
        if(this.remote){
          this.$refs.dropdown.setWidthAdaption()
        }
      }
    },
    updateSingleSelected(init = false, slot = false) {
      // 赋值默认项是遍历选项绑定focusIndex
      if(init) {
        for(let i in this.availableOptions) {
          if(this.availableOptions[i].value === this.model) {
            this.focusIndex = this.availableOptions[i].index + 1
            break
          }
        }
      }
      const type = typeof this.model
      if (type === 'string' || type === 'number') {
        let findModel = false
        let curSingle = ''
        if(this.model === '' && this.query !== '') {
          for (let j in this.options) {
            if (this.query === this.options[j].label) {
              curSingle = this.options[j].label
              findModel = true
              break
            }
          }
        }else if(this.model !== '') {
          //O45刷新新增下拉项导致显示中文被清空，O45client测试通过，本地测试却有问题
          this.findChild(child => {
            if(this.remote && child.showCol.length > 0) {
              for (let k in this.options) {
                if (this.model === this.options[k].value) {
                  curSingle = this.options[k].label + ' ' + this.options[k][child.showCol[0]]
                  findModel = true
                  break
                }
              }
            }else {
              for (let k in this.options) {
                if (this.model === this.options[k].value) {
                  curSingle = this.options[k].label
                  findModel = true
                  break
                }
              }
            }
          })
        }
        if (this.model === '') {
          this.selectedSingle = ''
        } else if (this.remote && curSingle) {
          this.selectedSingle = curSingle
        } else if (!this.remote) {
          this.selectedSingle = curSingle
        }
        //o45 证券代码控件需要
        if (slot && !findModel) {
          this.model = ''
          this.query = ''
        }
      }
      this.toggleSingleSelected(this.model, init)
    },
    removeTag(index) {
      if (this.disabled || !this.editable || this.readonly) {
        return false
      }
      if (this.remote) {
        const tag = this.model[index]
        this.selectedMultiple = this.selectedMultiple.filter(
          item => item.value !== tag
        )
      }
      this.model.splice(index, 1)
      if (this.filterable && this.visible && this.$refs.input) {
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
      }
      this.broadcast('Drop', 'on-update-popper')
    },
    toggleSingleSelected(value, init = false) {
      let label = value
      if (this.options.length) {
        let option = this.options.filter(opt => opt.value === value)[0]
        if (option) {
          label = option.label
        }
      }
      this.findChild(child => {
        this.options.forEach((col, i) => {
          if (value == col.value) {
            this.$set(child.cloneData[i], 'selected', true)
            this.$set(child.cloneData[i], 'focus', true)
          } else {
            this.$set(child.cloneData[i], 'selected', false)
            this.$set(child.cloneData[i], 'focus', false)
          }
        })
      })
      // o45开启keepInputValue默认初始值
      if (init) {
        if(this.keepInputValue) {
          this.selectedSingle = this.model
        }
      }else {
        for(let j in this.availableOptions) {
          if(this.availableOptions[j].value === value) {
            this.focusIndex = this.availableOptions[j].index + 1
            break
          }
        }
        if(this.keepInputValue) {
          this.selectedSingle = this.model
        }
        if (this.labelInValue) {
          this.$emit('on-change', { value: value, label: label })
          this.dispatch('FormItem', 'on-form-change', { value: value, label: label })
        } else {
          this.$emit('on-change', value)
          this.dispatch('FormItem', 'on-form-change', value)
        }
      }
    },
    handleClose() {
      this.hideMenu()
      if (this.isInputFocus) {
        let flag = false
        if (this.model === '' && this.query !== '') {
          // 先选值，左右键切换，再删除一个字符仍然有匹配项时
          for(let i in this.availableOptions) {
            if(this.query.toString().split(' ')[0] === this.availableOptions[i].label) {
              this.model = this.availableOptions[i].value
              flag = true
              break
            }
          }
          if(!flag) {
            if(!this.keepInputValue) {
              if (this.availableOptions.length > 0) {
                this.model = this.availableOptions[0].value
              }
            }else {
              this.model = this.query
            }
          }
          flag = false
          this.isQuerySelect = false
        }else {
          this.setSingleSelect()
        }
        this.isInputFocus = false
        // 单选返回字符串
        this.dispatch('FormItem', 'on-form-blur', this.selectedSingle)
      }
    },
    handleKeydown(e) {
      const keyCode = e.keyCode
      if (this.visible) {
        // Esc slide-up
        if (keyCode === 27) {
          e.preventDefault()
          this.hideMenu()
          //下拉框弹出，ESC收起面板后，焦点在输入框，内容全选
          this.focus()
        }
      }
      // right
      if (keyCode === 39) {
        e.preventDefault()
        this.navigateOptions('next')
      }
      // left
      if (keyCode === 37) {
        e.preventDefault()
        this.navigateOptions('prev')
      }
    },
    navigateOptions(direction) {
      if (direction === 'next') {
        const next = this.focusIndex + 1
        this.focusIndex = this.focusIndex >= this.availableOptions.length ? 1 : next
      } else if (direction === 'prev') {
        const prev = this.focusIndex - 1
        this.focusIndex = this.focusIndex <= 1 ? this.availableOptions.length : prev
      }
      this.focusValue = this.availableOptions[this.focusIndex - 1].value
      // 处理滚动条
      this.findChild(child => {
        // let curTop = child.$el.scrollTop
        let itemHeight = child.itemHeight
        let top = itemHeight * (this.focusIndex - 1)
        child.$el.scrollTop = top
      })
      this.selectBlockSingle(this.focusValue)
    },
    resetScrollTop() {
      const index = this.focusIndex - 1
      let bottomOverflowDistance =
        this.optionInstances[index].$el.getBoundingClientRect().bottom -
        this.$refs.dropdown.$el.getBoundingClientRect().bottom
      let topOverflowDistance =
        this.optionInstances[index].$el.getBoundingClientRect().top -
        this.$refs.dropdown.$el.getBoundingClientRect().top
      if (bottomOverflowDistance > 0) {
        this.$refs.dropdown.$el.scrollTop += bottomOverflowDistance
      }
      if (topOverflowDistance < 0) {
        this.$refs.dropdown.$el.scrollTop += topOverflowDistance
      }
    },
    handleFocus(e) {
      e.target.selectionStart = 0
      e.target.selectionEnd = this.query.length
      this.$emit('on-focus')
    },
    handleBlur() {
      this.$emit('on-blur')
    },
    resetInputState(e) {
      this.inputLength = this.$refs.input.value.length * 12 + 56
      if (this.visible && this.showBottom && e.keyCode == 9) {
        //153789 【TS:201907180097-资管业委会（资管）_贺文能-【需求类型】需求【需求描述】simple-select tab切换时失去焦点，不会将下拉框收起， 详见附件】
        this.hideMenu()
        this.isInputFocus = false
      }
      if (this.newSearchModel && !this.isInputFocus) {
        this.isInputFocus = true
      }
      this.$emit('on-keydown', this.query, e)
    },
    getLabel(val) {
      let item = this.options.filter(item => item.value == val)
      return item ? item[0].label : ''
    },
    // use when slot changed
    slotChange() {
      this.options = []
      this.optionInstances = []
    },
    setQuery(query) {
      if (!this.filterable) return
      this.query = query
    },
    modelToQuery() {
      if (this.filterable && this.model !== undefined) {
        this.findChild(child => {
          if (this.model === child.value) {
            if (child.label) {
              this.query = child.label
            } else if (child.searchLabel) {
              this.query = child.searchLabel
            } else {
              this.query = child.value
            }
            this.selectToChangeQuery = true
          }
        })
      }
    },
    broadcastQuery(val) {
      this.broadcast('Block', 'on-query-change', val)
    },
    // 处理 remote 初始值
    updateLabel() {
      if (this.remote) {
        if (this.model !== '') {
          this.selectToChangeQuery = true
          if (this.currentLabel === '') this.currentLabel = this.model
          this.lastQuery = this.currentLabel
          this.query = this.currentLabel
        }
      }
    },
    getFormatValue(value) {
      let val = ''
      let keyArr = this.format[0].split(',')
      let split = this.format[1]
      keyArr.forEach(col => {
        val += value[col] + split
      })
      return val.slice(0, val.length - 1)
    },
    searchStyle() {
      if (this.filterable && this.showBottom) {
        this.$refs.search.style.width = '100%'
        this.$refs.input.style.width = '100%'
      }
    },
    focus() {
      if (this.disabled || this.readonly) return
      this.$nextTick(() => {
        this.isInputFocus = true
        if (this.filterable) {
          this.$refs.input.focus()
        } else {
          this.$refs.reference.focus()
        }
      })
    },
    blur() {
      if (this.filterable) {
        this.$refs.input.blur()
      } else {
        this.$refs.reference.blur()
      }
      this.visible = false
      this.isInputFocus = false
      this.isQuerySelect = false
      let flag = false
      if (this.model === '' && this.query !== '') {
        // 先选值，左右键切换，再删除一个字符仍然有匹配项时
        for(let i in this.availableOptions) {
          if(this.query.toString().split(' ')[0] === this.availableOptions[i].label) {
            this.model = this.availableOptions[i].value
            flag = true
            break
          }
        }
        if(!flag) {
          if(!this.keepInputValue) {
            if (this.availableOptions.length > 0) {
              this.model = this.availableOptions[0].value
            }
          }else {
            this.model = this.query
          }
        }
        flag = false
      }else if(this.model !== '' && this.query !== '') { // 删除字符仍有匹配项但model未被清空
        this.setSingleSelect()
      }
//      this.availableOptions = this.options
//      this.broadcast('Block', 'on-query-change', this.query)
      this.dispatch('FormItem', 'on-form-blur', this.selectedSingle)
    },
    select() {
      if (this.filterable) {
        this.$refs.input.select()
      }
    },
    //左右键、点选选中options中value值
    selectBlockSingle(value, status = false, str, nullValue = false) {
      this.isQuerySelect = status
      //焦点未离开勿更新可选options
      if(!this.isInputFocus) {
        this.availableOptions = this.options
      }
      this.selectToChangeQuery = true
      if (this.model !== value) {
        this.model = value
      }
      if (str === 'click') {
        this.hideMenu()
        this.focus()
      }
      if(nullValue) {
        this.$nextTick(() => {
          this.focusIndex = 0
        })
        this.selectToChangeQuery = false
      }else {
        //不匹配到任何项时选中筛选第一项
        if(value === '' && !this.keepInputValue) {
          this.$nextTick(() => {
            this.focusIndex = 0
            this.$nextTick(() => {
              this.focusIndex = 1
            })
          })
        }
        this.selectToChangeQuery = false
      }

    },
    setPlacement() {
      if (this.autoPlacement) {
        let clientHeight = document.documentElement.clientHeight
        let rect = this.$refs.select.getBoundingClientRect()
        let curbottom = clientHeight - rect.top - rect.height
        let bottomNum = 210
        if (curbottom < bottomNum) {
          this.fPlacement = 'top'
        }else {
          this.fPlacement = 'bottom'
        }
      }
    },
    setSingleSelect() {
      let curlabel = ''
      let index = 0
      //焦点在输入框内
      if(this.isInputFocus) {
        this.findChild(child => {
          // 多列、非多列显示selectedSingle值不一样需区分对待
          if(child.showCol.length > 0) {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label + ' ' + col[child.showCol[0]]
                index = col.index + 1
              }
            })
          }else {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label
                index = col.index + 1
              }
            })
          }
        })
        //下拉框不弹出，仅使用左右键切换选值，要求带出中文,弹出不带中文
        if(this.visible || this.showFirstLabelOnly) {
          let ind = curlabel.indexOf(' ')
          curlabel = curlabel.substring(0, ind)
        }
        this.selectedSingle = curlabel
      }else {
        this.findChild(child => {
          if(child.showCol.length > 0) {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label + ' ' + col[child.showCol[0]]
                index = col.index + 1
              }
            })
          }else {
            this.availableOptions.forEach((col, i) => {
              if (col.value === this.model) {
                curlabel = col.label
                index = col.index + 1
              }
            })
          }
        })
        if(this.showFirstLabelOnly) {
          let ind = curlabel.indexOf(' ')
          curlabel = curlabel.substring(0, ind)
        }else {
//          this.query = curlabel
        }
        this.selectedSingle = curlabel
        //o45 证券代码控件 模糊输入，不匹配下拉项保留输入值
        if(curlabel == '' && this.keepInputValue && this.model) {
          this.query = this.model
          return
        }
      }
      this.isQuerySelect = false
      this.focusIndex = index
    },
    queryChange(val) {
      if (this.remote && this.remoteMethod) {
        if (!this.selectToChangeQuery) {
          // 解决当通过表单方法firstNodeFocused定位到SimpleSelect时只能输入但不展示下拉选项的问题
          if (!this.visible && val) {
            this.visible = true
          }
          this.remoteMethod(val, () => {
            this.$nextTick(() => {
              this.broadcast('Block', 'on-query-change', val)
            })
          })
          this.$emit('on-query-change', val)
        }else {
          // 非自动匹配到的值手动清空后绑定的model没清空问题
          if(val === '') {
            this.model = ''
          }
        }
        this.findChild(child => {
          child.isFocus = false
        })
      } else {
        if (!this.selectToChangeQuery) {
          if (!this.visible && val) {
            this.visible = true
          }
          this.$emit('on-query-change', val)
          this.broadcastQuery(val)
        } else if (this.isQuerySelect) {
          this.broadcastQuery(val)
        }
      }
      this.selectToChangeQuery = false
    }
  },
  mounted() {
    on(this.$refs.select, 'keydown', this.handleKeydown)
    this.modelToQuery()
    // 处理 remote 初始值
    this.updateLabel()
    this.updateOptions(true)
    this.$on('append', () => {
      this.slotChange()
      this.updateOptions(true, true)
    })
    this.$on('remove', () => {
      this.slotChange()
      this.updateOptions(true, true)
    })
    this.$on('on-select-selected', (value, status) => {
      this.model = value
      if (this.filterable) {
        this.findChild(child => {
          if (child.value === value) {
            if (this.query !== '') this.selectToChangeQuery = true
            this.lastQuery = this.query =
              child.label === undefined ? child.searchLabel : child.label
          }
        })
      }
      this.hideMenu()
    })
    this.$on('on-options-visible-change', arg => {
      this.availableOptions = arg.data.filter(option => !option.hidden)
      // 筛选后的options写入index 左右切换使用
      this.availableOptions.forEach((col, i) => {
        this.$set(this.availableOptions[i], 'index', i)
      })
    })
    this.$nextTick(() => {
      this.searchStyle()
    })

//    this.setPlacement()
//    this.$on('on-visible-change', (val, top) => {
//      if (val) {
//        this.$nextTick(() => {
//          this.setPlacement(parseInt(top))
//        })
//      }
//    })
  },
  beforeDestroy() {
    off(this.$refs.select, 'keydown', this.handleKeydown)
    this.broadcast('Drop', 'on-destroy-popper')
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.model == !val) {
          this.isQuerySelect = false
        }
        this.model = val
        // TODO

        if (val === '' && !this.visible) {
          this.query = ''
        }
      }
    },
    label(val) {
      this.currentLabel = val
      this.updateLabel()
    },
    model() {
      this.$emit('input', this.model)
      this.modelToQuery()
      this.updateSingleSelected()
    },
    visible(val) {
      if (val) {
        // 显示前才计算位置
        this.setPlacement()
        this.$nextTick(() => {
          let content = this.$refs.content
          if (content.scrollHeight > content.clientHeight) {
            let cur = this.dropWidth > 0 ? this.dropWidth : parseInt(getStyle(this.$el, 'width'))
            this.findChild(child => {
              child.hasWidth = cur - this.scrollBarWidth
            })
          }
        })
        setTimeout(() => {
          this.dispatch('Msgbox', 'on-esc-real-close', false)
        }, 0)
        this.broadcast('Drop', 'on-update-popper')
      } else {
        if (this.filterable) {
          if (this.$refs.input) {
            this.$refs.input.blur()
          }

          setTimeout(() => {
            if (this.remote && this.remoteMethod) return
            if (this.showBottom) {
              this.query = ''
            }
            this.broadcast('Block', 'on-query-change', '', true)
          }, 300)
        }
        setTimeout(() => {
          this.dispatch('Msgbox', 'on-esc-real-close', true)
        }, 0)
        // this.broadcast('Drop', 'on-destroy-popper');
      }
      this.$emit('on-drop-change', val)
    },
    query(val) {
      let querySingle = val.toString().split(' ')[0] //此处改变query
      this.queryChange(querySingle)
      this.broadcast('Drop', 'on-update-popper')
    },
    selectedSingle(val) {
      if (this.filterable && !this.showBottom && !this.isQuerySelect) {
        this.query = val
        if (this.query !== '')
          this.selectToChangeQuery = true
      }
      this.setSingleSelect()
    },
    placement(val) {
      this.fPlacement = val
    },
    focusIndex: {
      handler(nv) {
        this.broadcast('Block', 'on-focus-index-change', nv - 1)
      }
    },
    isInputFocus(val) {
      if (!val) {
        this.setSingleSelect()
      }
      if ((this.newSearchModel || this.isSingleSelect) && val) {
        this.$emit('on-input-focus')
      }
    },
//    options(val, old) {
//      if (this.remote) {
//        this.findChild(child => {
//          this.focusValue = ''
//          this.focusIndex = 1
//          return true
//        })
//      }
//    }
  }
}
</script>
