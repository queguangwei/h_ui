import SimpleMultiSelect from '../SelectTable/SelectTable.vue'
export default {
  name: 'SimpleMultiSelect',
  mixins: [SimpleMultiSelect],
  props: {
    block:{
      default: true,
    },
    newSearchModel:{
      type:Boolean,
      dafault:true,
    },
  },
  data() {
    return {
      selectedResult:'',
      newSearchModelselectItem:{},
      isCopy:false,
      newSearchCheckAll:false,
      newSearchUnCheckAll:false,
    }
  },
  methods: {
    showdrop(){
      return  
    },
    handleFocus(e) {
      e.target.selectionStart = 0
      e.target.selectionEnd = this.selectedResult.length
    },
  },
  mounted() {
  },
  beforeDestroy() {
  },
  watch:{
    selectedResult(val, oldVal){
      let  searchkey=''
      let selectAry=val.split(',')
      // let oldselectAry=oldVal.split(",");
      let multipleAry=[]
      if(this.isCopy){
        this.$emit('on-paste',{oldval:oldVal,newval:val})
        this.isCopy=false
        return
      }
      if(this.newSearchCheckAll){
        this.newSearchCheckAll=false
        return
      }
      if(this.newSearchUnCheckAll){
        this.newSearchUnCheckAll=false
        return
      }
      if(oldVal!=''&&val==''&&this.model.length>0){
        this.model=[]
        return
      }
      if(oldVal+','==val){
        searchkey=','
        this.newModelhandleSearch(searchkey)
        return
      }
      this.selectedMultiple.forEach(item=>{
        multipleAry.push(item['label'])
      })
      //if(this.isSearchDelete){
      this.newModelSearchDelete(multipleAry)
      // }
      for(let i=0;i<selectAry.length;i++){
        if(multipleAry.indexOf(selectAry[i])<0){
          searchkey=selectAry[i]
        }
      }
      if(searchkey==''&&multipleAry.length<selectAry.length){
        searchkey=selectAry[selectAry.length-1]
      }
      if(searchkey==''){
        return
      }
      this.newModelhandleSearch(searchkey)

    },
    newSearchModelselectItem(changeitem){
      if(!changeitem) return
      let label=changeitem['label']
      let selectVal=changeitem['value']
      let selectAry=this.selectedResult.trim().split(',')
      let index=selectAry.indexOf(label)
      if(index>=0){
        selectAry.splice(index,1)
      }else{
        if(this.specialIndex){
          if(selectVal==this.specialVal){
            selectAry=[]
          }
        }
        selectAry.push(label)
      }
      let str=selectAry.join(',')
      if(str.substr(0,1)==','){
        str=str.substr(1)
      }
      this.selectedResult=str
    }
  }
}