<template>
  <li :class="classes" @click.stop="select" @mouseout.stop="blur" v-show="!hidden">
    <checkbox v-show="multiple" v-model="selected" :disabled="disabled" @on-change="checkChange"></checkbox>
    <slot>{{ showLabel }}</slot>
  </li>
</template>
<script>
  import Emitter from '../../mixins/emitter';
  import Checkbox from '../Checkbox/Checkbox.vue';
  import {hasClass} from '../../util/tools';
  const prefixCls = 'h-select-item';

  export default {
    name: 'Option',
    componentName: 'select-item',
    mixins: [ Emitter ],
    components:{Checkbox},
    props: {
      value: {
        type: [String, Number],
        required: true
      },
      label: {
        type: [String, Number]
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        selected: false,
        index: 0,
        isFocus: false,
        hidden: false,
        searchLabel: '',
        multiple:false
      };
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-selected`]: this.selected,
            [`${prefixCls}-focus`]: this.isFocus
          }
        ];
      },
      showLabel () {
        return (this.label) ? this.label : this.value;
      }
    },
    methods: {
      select () {
        if (this.disabled||this.multiple) {
          return false;
        }
        this.dispatch('Select', 'on-select-selected', this.value);
      },
      checkChange(val){
        this.dispatch('Select', 'on-select-selected', this.value);
      },
      blur () {
        this.isFocus = false;
      },
      queryChange (val) {
        const parsedQuery = val.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
        this.hidden = !new RegExp(parsedQuery, 'i').test(this.searchLabel);
      }
    },
    mounted () {
      var str=this.$el.innerHTML
      // console.log(str);
      this.searchLabel =str.slice(Number(str.indexOf('</label>')+8));
      // console.log(this.searchLabel)
      this.dispatch('Select', 'append');
      this.$on('on-select-close', () => {
        this.isFocus = false;
      });
      this.$on('on-query-change', (val) => {
        this.queryChange(val);
      });
      var el = this.$el.parentNode;
      while(!hasClass(el,'h-select')){
        el = el.parentNode;
      }
      this.multiple=hasClass(el,'h-select-multiple')?true:false;
    },
    beforeDestroy () {
      this.dispatch('Select', 'remove');
    }
  };
</script>
