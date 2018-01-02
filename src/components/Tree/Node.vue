<template>
  <collapse-transition>
    <!-- <ul :class="classes" v-show="visible"> -->
    <ul :class="classes">
      <li>
        <span :class="arrowClasses" @click="handleExpand">
          <Icon v-if="showArrow" name="play_fill"></Icon>
          <Icon v-if="showLoading" name="load-c" class="h-load-loop"></Icon>
        </span>
        <h-checkbox
          v-if="showCheckbox"
          :value="data.checked"
          :indeterminate="data.indeterminate"
          :disabled="data.disabled || data.disableCheckbox"
          @click.native.prevent="handleCheck"></h-checkbox>
        <Render v-if="data.render" :render="data.render" :data="data" :node="node"></Render>
        <Render v-else-if="isParentRender" :render="parentRender" :data="data" :node="node"></Render>
        <span v-else :class="titleClasses" @click="handleSelect">{{data.title}}</span>
        <Tree-node
          v-if="data.expand"
          v-for="(item,i) in data.children"
          :key="i"
          :data="item"
          :multiple="multiple"
          :checkStrictly="checkStrictly"
          :showIndeterminate="showIndeterminate"
          :show-checkbox="showCheckbox">
        </Tree-node>
      </li>
    </ul>
  </collapse-transition>
</template>
<script>
  import Checkbox from '../Checkbox/Checkbox.vue';
  import Icon from '../Icon/Icon.vue';
  import Render from './render';
  import CollapseTransition from '../Notice/collapse-transition';
  import Emitter from '../../mixins/emitter';
  import { findComponentsUpward,findComponentsDownward } from '../../util/tools';

  const prefixCls = 'h-tree';

  export default {
    name: 'TreeNode',
    mixins: [ Emitter ],
    components: { Checkbox, Icon, CollapseTransition, Render},
    props: {
      data: {
        type: Object,
        default () {
          return {};
        }
      },
      multiple: {
        type: Boolean,
        default: false
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      checkStrictly:{
        type:Boolean
      },
      showIndeterminate:{
        type:Boolean
      }
      // visible: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data () {
      return {
        prefixCls: prefixCls,
        indeterminate: false
      };
    },
    computed: {
      classes () {
        return [
          `${prefixCls}-children`
        ];
      },
      selectedCls () {
        return [
          {
            [`${prefixCls}-node-selected`]: this.data.selected
          }
        ];
      },
      arrowClasses () {
        return [
          `${prefixCls}-arrow`,
          {
            [`${prefixCls}-arrow-disabled`]: this.data.disabled,
            [`${prefixCls}-arrow-open`]: this.data.expand,
            // [`${prefixCls}-arrow-hidden`]: !(this.data.children && this.data.children.length)
          }
        ];
      },
      titleClasses () {
        return [
          `${prefixCls}-title`,
          {
            [`${prefixCls}-title-selected`]: this.data.selected,
            [`${prefixCls}-title-filterable`]: this.data.filterable
          }
        ];
      },
      showArrow () {
          return (this.data.children && this.data.children.length) || ('loading' in this.data && !this.data.loading);
      },
      showLoading () {
        return 'loading' in this.data && this.data.loading;
      },
      isParentRender () {
        const Tree = findComponentsUpward(this, 'Tree');
        return Tree && Tree.render;
      },
      parentRender () {
        const Tree = findComponentsUpward(this, 'Tree');
        if (Tree && Tree.render) {
            return Tree.render;
        } else {
            return null;
        }
      },
      node () {
        const Tree = findComponentsUpward(this, 'Tree');
        if (Tree) {
            // 将所有的 node（即flatState）和当前 node 都传递
            return [Tree.flatState, Tree.flatState.find(item => item.nodeKey === this.data.nodeKey)];
        } else {
            return [];
        }
      }
    },
    methods: {
      handleExpand () {
        const item = this.data;
        if (item.disabled) return;

        // async loading
        if (item.children.length === 0) {
          const tree = findComponentsUpward(this, 'Tree');
          if (tree && tree.loadData) {
            this.$set(this.data, 'loading', true);
            tree.loadData(item, children => {
              this.$set(this.data, 'loading', false);
              if (children.length) {
                this.$set(this.data, 'children', children);
                this.$nextTick(() => this.handleExpand());
              }
            });
            return;
          }
        }
        if (item.children && item.children.length) {
          this.$set(this.data, 'expand', !this.data.expand);
          this.dispatch('Tree', 'toggle-expand', this.data);
        }
      },
      handleSelect () {
        if (this.data.disabled) return;
        this.dispatch('Tree', 'on-selected', this.data.nodeKey);
      },
      // handleSelect () {
      //   if (this.data.disabled) return;
      //   if (this.data.selected) {
      //     this.data.selected = false;
      //   } else if (this.multiple) {
      //     this.$set(this.data, 'selected', !this.data.selected);
      //   } else {
      //     this.dispatch('Tree', 'selected', this.data);
      //   }
      //   this.dispatch('Tree', 'on-selected', this.data.nodeKey);
      // },
      handleCheck () {
        if (this.data.disabled) return;
        var checked;
        if (!!this.checkStrictly || !!this.showIndeterminate) {
          checked = !this.data.checked;
        }else{
          checked = !this.data.checked && !this.data.indeterminate
        }
        const changes = {
            checked: checked,
            nodeKey: this.data.nodeKey
        };
        this.dispatch('Tree', 'on-check', changes);
      }
      // handleCheck () {
      //   if (this.disabled) return;
      //   const checked = !this.data.checked;//true
      //   if (!!this.checkStrictly || !!this.showIndeterminate) {
      //     if (!checked || this.indeterminate) {
      //       findComponentsDownward(this, 'TreeNode').forEach(node => node.data.checked = false);
      //     } else {          
      //       findComponentsDownward(this, 'TreeNode').forEach(node => node.data.checked = true);
      //     }
      //   }
      //   this.data.checked = checked;
      //   this.dispatch('Tree', 'checked');
      //   this.dispatch('Tree', 'on-checked');
      // },
      // setIndeterminate () {
      //   if (!!this.showIndeterminate) {
      //     this.indeterminate = this.data.checked ? false : findComponentsDownward(this, 'TreeNode').some(node => node.data.checked);
      //   }
      // }
    },
    created () {
      // if (!!this.checkStrictly || !!this.showIndeterminate) {
      //   this.data.indeterminate=false;
      // }
      // created node.vue first, mounted tree.vue second
      // if (!this.data.checked) this.$set(this.data, 'checked', false);
    },
    mounted () {
      // this.$on('indeterminate', () => {
      //   this.broadcast('TreeNode', 'indeterminate');
      //   this.setIndeterminate();
      // });
    }
  };
</script>