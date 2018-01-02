<template>
  <div :class="prefixCls">
    <Tree-node
      v-for="(item,i) in stateTree"
      :key="i"
      :data="item"
      visible
      :multiple="multiple"
      :show-checkbox="showCheckbox"
      :showIndeterminate="showIndeterminate"
      :checkStrictly="checkStrictly"
      >
    </Tree-node>
    <div :class="[prefixCls + '-empty']" v-if="!data.length">{{ localeEmptyText }}</div>
  </div>
</template>
<script>
  import TreeNode from './Node.vue';
  import { findComponentsDownward } from '../../util/tools';
  import Emitter from '../../mixins/emitter';
  import Locale from '../../mixins/locale';

  const prefixCls = 'h-tree';

  let key = 1;

  export default {
    name: 'Tree',
    mixins: [ Emitter, Locale ],
    components: { TreeNode },
    props: {
      data: {
        type: Array,
        default () {
          return [];
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
      emptyText: {
        type: String
      },
      loadData: {
        type: Function
      },
      render: {
        type: Function
      },
      checkStrictly:{
        //父子节点联动
        type:Boolean,
        default:false
      },
      showIndeterminate:{
        type:Boolean,
        default:false
      },
    },
    data () {
      return {
        prefixCls: prefixCls,
        stateTree: this.data,
        flatState: [],
      };
    },
    watch:{
      data: {
        deep: true,
        handler () {
            this.stateTree = this.data;
            this.flatState = this.compileFlatState();
            this.rebuildTree();
        }
      }
    },
    computed: {
      localeEmptyText () {
        if (this.emptyText === undefined) {
          return this.t('i.tree.emptyText');
        } else {
          return this.emptyText;
        }
      }
    },
    methods: {
      compileFlatState () { // so we have always a relation parent/children of each node
        let keyCounter = 0;
        const flatTree = [];
        function flattenChildren(node, parent) {
            node.nodeKey = keyCounter++;
            flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey };
            if (typeof parent != 'undefined') {
                flatTree[node.nodeKey].parent = parent.nodeKey;
                flatTree[parent.nodeKey].children.push(node.nodeKey);
            }

            if (node.children) {
                flatTree[node.nodeKey].children = [];
                node.children.forEach(child => flattenChildren(child, node));
            }
        }
        this.stateTree.forEach(rootNode => {
          flattenChildren(rootNode);
        });
        return flatTree;
      },
      updateTreeUp(nodeKey){
        const parentKey = this.flatState[nodeKey].parent;
        if (typeof parentKey == 'undefined') return;

        const node = this.flatState[nodeKey].node;
        const parent = this.flatState[parentKey].node;
        if (node.checked == parent.checked && node.indeterminate == parent.indeterminate) return; // no need to update upwards

        if (node.checked == true) {
            this.$set(parent, 'checked', parent.children.every(node => node.checked));
            this.$set(parent, 'indeterminate', !parent.checked&&!this.showIndeterminate);
        } else {
            this.$set(parent, 'checked', false);
            this.$set(parent, 'indeterminate', parent.children.some(node => node.checked || node.indeterminate)&&!this.showIndeterminate);
        }
        this.updateTreeUp(parentKey);
      },
      rebuildTree () { // only called when `data` prop changes
        const checkedNodes = this.getCheckedNodes();
        checkedNodes.forEach(node => {
            this.updateTreeDown(node, {checked: true});
            // propagate upwards
            const parentKey = this.flatState[node.nodeKey].parent;
            if (!parentKey && parentKey !== 0) return;//如过存在父节点
            const parent = this.flatState[parentKey].node;
            const childHasCheckSetter = typeof node.checked != 'undefined' && node.checked;//选中为true
            if (childHasCheckSetter && parent.checked != node.checked && !this.checkStrictly) {//当前子节点选中且父组件为选中
              this.updateTreeUp(node.nodeKey); // update tree upwards
            }
        });
      },
      getSelectedNodes () {
        return this.flatState.filter(obj => obj.node.selected).map(obj => obj.node);
      },
      getCheckedNodes () {
        return this.flatState.filter(obj => obj.node.checked).map(obj => obj.node);
      },
      updateTreeDown(node, changes = {}) {
        for (let key in changes) {
          this.$set(node, key, changes[key]);
        }
        if (node.children && !this.checkStrictly) {
          node.children.forEach(child => {
              this.updateTreeDown(child, changes);
          });
        }
      },
      handleSelect (nodeKey) {
        const node = this.flatState[nodeKey].node;
        if (!this.multiple){ // reset previously selected node
          const currentSelectedKey = this.flatState.findIndex(obj => obj.node.selected);
          if (currentSelectedKey >= 0 && currentSelectedKey !== nodeKey) this.$set(this.flatState[currentSelectedKey].node, 'selected', false);
        }
        this.$set(node, 'selected', !node.selected);
        this.$emit('on-select-change', this.getSelectedNodes());
      },
      handleCheck({ checked, nodeKey }) {
        const node = this.flatState[nodeKey].node;
        this.$set(node, 'checked', checked);
        this.$set(node, 'indeterminate', false);
        if (!this.checkStrictly) {
          this.updateTreeUp(nodeKey); // propagate up
          this.updateTreeDown(node, {checked, indeterminate: false}); // reset `indeterminate` when going down
        } 
        this.$emit('on-check-change', this.getCheckedNodes());
      }
    },
    created(){
      this.flatState = this.compileFlatState();
      this.rebuildTree();
    },
    mounted () {
      this.$on('on-check', this.handleCheck);
      this.$on('on-selected', this.handleSelect);
      this.$on('toggle-expand', node => this.$emit('on-toggle-expand', node));
    }
  };
</script>