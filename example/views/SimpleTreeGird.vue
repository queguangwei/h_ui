<template>
  <div>
    <h-button @on-click="loadData">加载数据</h-button>
    <h-button @on-click="changeData">展开关闭某行</h-button>
    <!-- isCheckbox checkStrictly -->
    <!-- selectRoot -->
    <h-simple-tree-gird ref="treeGird" :columns="columns1" isCheckbox no-data-text="123" :data="treedata" canDrag :height="400" @on-select-root="selectChange" @on-expand="expand" @on-drag="expand" @on-row-click="selectChange" @on-scroll="selectChange">
      <span slot="loading">1244</span>
    </h-simple-tree-gird>
  </div>
</template>
<script>
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
          renderHeader:(h,params)=>{
            return h('span','123')
          },
          render:(h,params)=>{
            return h('span','123')
          }
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
          // width: 200,
          key: 'city',
          multiple:false,
        },
        {
          title: '下拉树',
          // width: 200,
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
      this.treedata=this.baseData;
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
    changeData(){
      this.$refs.treeGird.expandRow(1,false);
    }
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