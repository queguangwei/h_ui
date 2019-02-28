<template>
<div>
  <h-button @on-click="loadData">加载数据</h-button>
   <h-simple-tree-gird :columns="columns1" isCheckbox :data="treedata" :height="400" @on-select-change="selectChange"></h-simple-tree-gird >
</div>
</template>
<script>
let bigData = [];
for(var i=0;i<50;i++){
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
export default {
  data () {
    return {
      baseData: [],
      treedata: [],
      columns1: [
        {
          title: '姓名',
          key: 'name',
          width: 300,
          ellipsis:true,
          // hiddenCol:true,
        },
        {
          title: '年龄',
          width: 200,
          key: 'age',
          align: 'center',
        },
        {
          width: 100,
          title: '地址',
          ellipsis: true,
          key: 'address',
          align: 'right',
        },
        {
          title: '金额',
          width: 200,
          key: 'money',
        },
        {
          title: '卡号',
          width: 200,
          key: 'cardId',
        },
        {
          title: '地区',
          width: 200,
          key: 'city',
          multiple:false,
        },
        {
          title: '下拉树',
          key: 'tree',
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
      this.treedata=this.baseData;
    },
    selectChange(data) {
      console.log(data);
    },
    expand(data,status){
      console.log(data)
      console.log(status)
    }
  },
  mounted(){
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
};
</script>