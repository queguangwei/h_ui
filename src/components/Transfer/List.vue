<template>
  <div :class="classes" :style="listStyle">
    <div :class="prefixCls + '-header'">
        <Checkbox :value="checkedAll" :disabled="checkedAllDisabled" @on-change="toggleSelectAll"></Checkbox>
        <span :class="prefixCls + '-header-title'" @click="toggleSelectAll(!checkedAll)">{{ title }}</span>
        <span :class="prefixCls + '-header-count'">{{ count }}</span>
    </div>
    <div :class="bodyClasses">
        <div :class="prefixCls + '-body-search-wrapper'" v-if="filterable">
            <Search
                :prefix-cls="prefixCls + '-search'"
                :query="query"
                @on-query-clear="handleQueryClear"
                @on-query-change="handleQueryChange"
                :placeholder="filterPlaceholder"></Search>
        </div>
        <ul :class="prefixCls + '-content'">
            <Draggable :move="getdata" @update="datadragEnd" :options="{animation: 200}">
                <li
                    v-for="item in filterData"
                    :class="itemClasses(item)"
                    @click.prevent="select(item)">
                    <Checkbox :value="isCheck(item)" :disabled="item.disabled"></Checkbox>
                    <span v-html="showLabel(item)"></span>
                </li>
                <li :class="prefixCls + '-content-not-found'" v-if="!showData">{{ notFoundText }}</li>
            </Draggable>
            <div :class="prefixCls + '-data-not-found'" v-if="showData">{{ notFoundData }}</div>
        </ul>
    </div>
    <div :class="prefixCls + '-footer'" v-if="showFooter"><slot></slot></div>
  </div>
</template>
<script>
    import Search from './Search.vue';
    import Checkbox from '../Checkbox/Checkbox.vue';
    import Draggable from 'vuedraggable';

    export default {
        name: 'TransferList',
        components: { Search, Checkbox, Draggable},
        props: {
            prefixCls: String,
            data: Array,
            renderFormat: Function,
            checkedKeys: Array,
            listStyle: Object,
            title: [String, Number],
            filterable: Boolean,
            filterPlaceholder: String,
            filterMethod: Function,
            notFoundText: String,
            notFoundData: String,
            validKeysCount: Number
        },
        data () {
            return {
                showItems: [],
                query: '',
                showFooter: true,
                showData:false
            };
        },
        watch: {
            data () {
                this.updateFilteredData();
            }
        },
        computed: {
            classes () {
                return [
                    `${this.prefixCls}`,
                    {
                        [`${this.prefixCls}-with-footer`]: this.showFooter
                    }
                ];
            },
            bodyClasses () {
                return [
                    `${this.prefixCls}-body`,
                    {
                        [`${this.prefixCls}-body-with-search`]: this.filterable,
                        [`${this.prefixCls}-body-with-footer`]: this.showFooter
                    }
                ];
            },
            count () {
                const validKeysCount = this.validKeysCount;
                return (validKeysCount > 0 ? `${validKeysCount}/` : '') + `${this.data.length}`;
            },
            checkedAll () {
                return this.data.filter(data => !data.disabled).length === this.validKeysCount && this.validKeysCount !== 0;
            },
            checkedAllDisabled () {
                return this.data.filter(data => !data.disabled).length <= 0;
            },
            filterData () {
                if (this.data.length == 0) {
                   this.showData = true;
                }else {
                   this.showData = false;
                }
                return this.showItems.filter(item => this.filterMethod(item, this.query));
            }
        },
        methods: {
            itemClasses (item) {
                return [
                    `${this.prefixCls}-content-item`,
                    {
                        [`${this.prefixCls}-content-item-disabled`]: item.disabled
                    }
                ];
            },
            showLabel (item) {
                return this.renderFormat(item);
            },
            isCheck (item) {
                return this.checkedKeys.some(key => key === item.key);
            },
            select (item) {
                if (item.disabled) return;
                const index = this.checkedKeys.indexOf(item.key);
                index > -1 ? this.checkedKeys.splice(index, 1) : this.checkedKeys.push(item.key);
            },
            updateFilteredData () {
                this.showItems = this.data;
            },
            toggleSelectAll (status) {
                const keys = status ?
                        this.data.filter(data => !data.disabled || this.checkedKeys.indexOf(data.key) > -1).map(data => data.key) :
                        this.data.filter(data => data.disabled && this.checkedKeys.indexOf(data.key) > -1).map(data => data.key);
                this.$emit('on-checked-keys-change', keys);
            },
            handleQueryClear () {
                this.query = '';
            },
            handleQueryChange (val) {
                this.query = val;
            },
            getdata: function(evt){
                // console.log(evt.draggedContext.element.id);
            },
            datadragEnd:function(evt){
                // console.log('拖动前的索引：'+evt.oldIndex);
                // console.log('拖动后的索引：'+evt.newIndex);  
            }  
        },
        created () {
            this.updateFilteredData();
        },
        mounted () {
            this.showFooter = this.$slots.default !== undefined;
        }
    };
</script>
<style type="text/css">

    .sortable-parent li:hover {
        background: transparent;
    }
    .sortable-chosen {
        background: #fff!important;
    }
    
    .sortable-ghost {
        background: #f3f3f3!important;
    }
    /*
     .sortable-ghost {
        border-bottom: solid 1px #ddd;
        height: 0;
        padding: 0!important;
     }
     .sortable-ghost label,
     .sortable-ghost span {
        display: none;
     }*/
</style>
