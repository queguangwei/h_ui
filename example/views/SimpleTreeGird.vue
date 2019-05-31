<template>
  <div>
    <h-button @on-click="loadData">加载数据</h-button>
    <h-button @on-click="changeData1('1103')">展开第一层</h-button>
    <h-button @on-click="changeData('1103')">展开关闭某行</h-button>
    <h-button @on-click="clearData">清除已选项</h-button>
    <h-button @on-click="selectData(true)">选择某行</h-button>
    <h-button @on-click="selectData(false)">不选择某行</h-button>
    <!-- isCheckbox checkStrictly -->
    <!-- selectRoot -->
    <h-simple-tree-gird ref="treeGird" canMove :columns="columns1" isCheckbox no-data-text="123" :data="treedata" canDrag :height="400" @on-select-root="selectChange" @on-expand="expand" @on-drag="expand" @on-row-click="selectChange" @on-scroll="selectChange">
      <span slot="loading">1244</span>
    </h-simple-tree-gird>
  </div>
</template>
<script>
let tData =require('../assets/simpleTreeGird.json'); 
let bigData = [];
for(var i=0;i<5;i++){
  let obj =  {
    id: i,
    expand:i==0?true:false,
    name: '王小明'+i,
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    tree: '345',
  }
  bigData.push(obj)
}
for(var i=50;i<1000;i++){
  let obj =  {
    id: i,
    name: '王小明'+i,
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    _parentId:parseInt(Math.random()*50,10)
  }
  bigData.push(obj)
}
for(var i=1000;i<10000;i++){
  let obj =  {
    id: i,
    name: '王小明'+i,
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    _parentId:Math.ceil(Math.random()*1000),
  }
  bigData.push(obj)
}
let bigData1 = [{
  id:0,
  expand:true,
  name: '王小明',
  age: 18,
  address: '北京市朝阳区芍药居',
  money: '120.00',
  cardId: '6223 ',
  city: '北京',
  dating:'2018',
  timing:'16',
  tree: '345',
  children:[{
    id:1,
    parentId:0,
    name: '王小明',
    age: 18,
    address: '北京市朝阳区芍药居',
    money: '120.00',
    cardId: '6223 ',
    city: '北京',
    dating:'2018',
    timing:'16',
    tree: '345',
    children:[{
      id:2,
      parentId:1,
      name: '王小明',
      age: 18,
      address: '北京市朝阳区芍药居',
      money: '120.00',
      cardId: '6223 ',
      city: '北京',
      dating:'2018',
      timing:'16',
      tree: '345',
    }]
  }]
}]

export default {
  data () {
    return {
      baseData: [],
      treedata: [],
      columns1: [
         {
                /* type: 'selectTree', */
                title: '科目',
                key: 'show_accountelement_fullname',
                // width: 100,
                align: 'left',
            },
            {
                /* type: 'text', */
                title: '科目方向',
                // width: 200,
                key: 'accountelement_dir',
                align: 'left',
                // hiddenCol: true,
            },
            {
                /* type: 'text', */
                title: '科目方向',
                // width: 300,
                key: 'show_dir',
                align: 'center',
                hiddenCol: false,
            }
      ],
    }
  },
  methods: {
    convertTreeData(rows, attributes) {
      var keyNodes = {}, parentKeyNodes = {};
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          row.id = row[attributes.keyField];
          row.parentId = row[attributes.parentKeyField];
          // row.expanded = row[attributes.expanded]?true:false
          // row.checked = row[attributes.checked]?true:false
          // row.indeterminate = row[attributes.indeterminate]?true:false
          row.children = [];
          keyNodes[row.id] = row;
          if (parentKeyNodes[row.parentId]) { parentKeyNodes[row.parentId].push(row); }
          else { parentKeyNodes[row.parentId] = [row]; }
          var children = parentKeyNodes[row.id];
          if (children) { row.children = children; }
          var pNode = keyNodes[row.parentId];
          if (pNode) { pNode.children.push(row); }
        }
      return parentKeyNodes[attributes.rootParentId];
    },
    loadData(){
      let old = new Date().getTime()
      // this.treedata=this.baseData;
      this.treedata=tData;
      // this.bigData = jsonData.slice(0, 100);
      this.$nextTick(() => {
        let newDate = new Date().getTime() - old
        console.log(newDate)
      })
    },
    selectChange(data) {
      console.log(data);
    },
    expand(data,status){
      console.log(data)
      console.log(status)
    },
    changeData(id){
      this.$refs.treeGird.expandRow(id,true);
    },
    changeData1(){
      this.$refs.treeGird.expandRow(1,true)
      this.$refs.treeGird.expandRow(2,true)
      this.$refs.treeGird.expandRow(3,true)
      this.$refs.treeGird.expandRow(4,true)
      this.$refs.treeGird.expandRow(6,true)
      // for(var item in this.baseData){
      //   this.$refs['treeGird'].expandRow(this.baseData[item].code,true)
      // }
    },
    clearData(){
      this.$refs.treeGird.clearSelected();
    },
    selectData(status){
      this.$refs.treeGird.selectRow('1103',status);
    },
  },
  mounted () {
    let attributes = {
      keyField: 'id',
      parentKeyField: '_parentId',
      expanded: 'expand',
      checked: 'checked',
      checked: 'indeterminate',
      rootKey: 'root'
    }
    this.baseData = this.convertTreeData(bigData, attributes);
  }
}
</script>