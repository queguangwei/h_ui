<template>
  <div :class="classes">
      <slot></slot>
  </div>
</template>
<script>
  import { findComponentsDownward, oneOf,indexOf} from '../../util/tools';
  import Emitter from '../../mixins/emitter';
  const prefixCls = 'h-checkbox-group';

  export default {
    name: 'CheckboxGroup',
    mixins: [ Emitter ],
    props: {
        value: {
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
        vertical: {
            type:Boolean,
            default:false,
        },
        labelInValue:{
            type:Boolean,
            default:false,
        }
    },
    data () {
        return {
            currentValue: this.value,
            curValue:this.value,
            childrens: [],
            childrensBtn: [],
            viewValue: null,
        };
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`h-checkbox-${this.size}`]: !!this.size,
                    [`${prefixCls}-vertical`]: !!this.vertical,
                }
            ];
        }
    },
    mounted () {
        this.updateModel(true);
    },
    methods: {
        updateModel (update) {
            const value = this.value;
            this.childrens = findComponentsDownward(this, 'Checkbox');
            this.childrensBtn = findComponentsDownward(this, 'Checkbtn');
            if (this.childrens&&this.childrens.length>0) {
                this.childrens.forEach(child => {
                    if(!child.notGroup){
                        child.model = value;
                        if (update) {
                            child.currentValue = value.indexOf(child.label) >= 0;
                            child.group = true;
                        }
                    }
                });
                this.viewValue = value
            }
            if(this.childrensBtn&&this.childrensBtn.length>0){
                let arr = []
                this.childrensBtn.forEach(child => {
                    child.isChecked = value.indexOf(child.value) >= 0;
                    if(child.isChecked) arr.push(child.viewValue)
                });
                this.viewValue = arr
            }
        },
        getCurdata(data,status){
            if(this.labelInValue){
                let curArr =  status?this.childrens:this.childrensBtn
                let curData = []
                curArr.forEach(child => {
                    if(child.isChecked){
                        curData.push({
                            value:child.value,
                            label:child.label?child.label:child.value
                        })
                    }
                });
                return curData
            }else{
                return data
            }
        },
        change (data) {
            this.currentValue = data;
            this.$emit('input', data);
            this.$emit('on-change', data);
            this.dispatch('FormItem', 'on-form-change', data);
        },
        changeBtn(value,status){
            if(status){
                this.curValue.push(value);
            }else{
                let index = this.curValue.indexOf(value);
                if(index!=-1){
                   this.curValue.splice(index,1); 
                }
            }
            this.$emit('input', this.curValue);
            this.$emit('on-change', this.getCurdata(this.curValue,false));
            this.dispatch('FormItem', 'on-form-change', this.curValue);
        }
    },
    watch: {
        value () {
            this.updateModel(true);
        },
        currentValue(val){
            this.viewValue = val
        },
        curValue(val){
            let curView = []
            this.childrensBtn.forEach(child => {
                if(child.isChecked){
                    curView.push(child.viewValue)
                }
            });
            this.viewValue = curView
        }
    }
  };
</script>
