<template>
  <input
  ref="inputEl"
  v-model="inputValue"
  :class="classes" 
  :readonly="readonly"
  :disabled="disabled"
  @input="val"
  @blur="blur" 
  @focus="focuser"
   />
</template>
<script>
export default {
  name: 'DateInput',
  props: {
    value: {
      type: [String,Number]
    },
    type:{
      type:String
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return{
      currentValue: this.value,
      inputValue: '',
    }
  },
  computed:{
    classes(){
    }
  },
  methods: {
    val(event){
      let value = event.target.value.trim();
      let pos = value.length
      if (/^\d+$/.test(value)||!value) {
        this.currentValue = value;
      } else {
        event.target.value = this.currentValue;
        value = this.currentValue;
      }
      if (this.type == 'year') {
        if (pos>4) {
          value = value.substr(-1);
          event.target.value = value    
        }
      }
      if (this.type == 'months') {
        if (pos>2 || Number(value)>12 || value =='00') { 
          value = value.substr(-1);
          event.target.value = value
        }
      }
      if (this.type == 'day') {
        if (pos>2 ||Number(value)>31||value =='00') {
          value = value.substr(-1)
          event.target.value = value
        }
      }
      this.inputValue = value;
      this.$emit('input', this.inputValue);
    },
    blur(event){
      this.$emit('blur', event);
    },
    focuser(){
      this.$emit('focus', event);
    },
    focus(){
      this.$refs.inputEl.focus();
    }
  },
  watch:{
    value(val){
      this.inputValue = val;
    }
  },
  mounted(){
    this.inputValue = this.value;
  },
};
</script>
