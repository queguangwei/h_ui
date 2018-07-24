<template>
  <div>
    <slot name="header">
      <span></span>
      <Button v-if="!isSure" type="ghost" @click="addData">添加</Button>
      <Button v-if="isSure" type="ghost" @click="modifySure">确认</Button>
    </slot>
    <slot>FormContent</slot>
    <Table :columns="fColumn" :data="fData" :height="height" :border='border' ref="table" @on-row-click="rowClick"></Table>
    <slot name="footer">
      <div :class="footerClass">
        <Button type="primary" @click="addData">提交</Button>
        <Button @click="addData">取消</Button>
      </div>
    </slot>
  </div>
</template>
<script>
import {deepCopy} from '../../util/tools';
import Table from  '../Table/Table.vue';
import Button from  '../Button/Button.vue';
// import FormItem from  '../FormItem.vue';

const prefixCls = 'h-form-gird';

export default {
  name: 'FormGird',
  mixins: [],
  components: {Table,Button},
  props: {
    value:{
      type: Object
    },
    height:[Number,String],
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
    uniqueKey:String,
    border:Boolean,
    autoClear:{
      type:Boolean,
      default:false,
    }
  },
  data () {
    return {
      fColumn:this.columns,
      fData:this.data,
      isSure:false,
      curIndex:-1
    };
  },
  computed: {
    footerClass(){
      return {};
    }
  },
  methods: {
    addData(){
      this.fData.push(deepCopy(this.value));
    },
    getData(){
      return this.$refs.table.data;
    },
    modifySure(){
      if (this.curIndex==-1) return false;
      this.$set(this.fData,this.curIndex,this.value)
      this.isSure=false;
    },
    rowClick(cur){
      let curObj = cur[0];
      this.curIndex = cur[1];
      this.isSure = true;
      this.$emit('input',curObj);
    },
    changeColumn(){
      let column = deepCopy(this.columns);
      column.push({
        title: ' ',
        key: 'delete',
        render:(h,params)=>{
          return h('Button', {
            props: {
              type: 'text'
            },
            nativeOn:{
              'click':()=>{
                event.stopPropagation();
                this.deleteData(params.index);
              }
            }
          },'删除')
        }
      })
      this.fColumn = column;
    },
    deleteData(index){
      this.fData.splice(index,1);
      this.isSure = false;
      this.curIndex = -1;
    }
  },
  watch: {
    column(){
      this.changeColumn();
    }
  },
  created () {
  },
  mounted(){
    this.changeColumn();
  }
};
</script>
