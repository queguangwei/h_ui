<template>
  <div>
    <h-row>
      <h-col span="8">
        <h-select-tree v-model="val" :first-value="firstVal" style="width:200px" :data="baseData2" size="large" @on-select-change="selectChange" @on-toggle-expand="selectChange" format-value="id"></h-select-tree>
      </h-col>
      <h-col span="8">
        <h-select-tree v-model="valc" :first-value="firstValc" style="width:200px" :data="baseData1" placement="top" placeholder="你好"></h-select-tree>
      </h-col>
      <h-col span="8">
        <h-select-tree v-model="valc" :first-value="firstValc" style="width:200px" :data="baseData1" placement="top" placeholder="你好"></h-select-tree>
      </h-col>
    </h-row>
    {{val}}
    {{valc}}
    <br><br><br>
    <h-select-tree v-model="val1" style="width:200px" :data="baseData3" showCheckbox checkStrictly @on-check-change="selectChange" isString></h-select-tree>
    {{val1}}
    <h-select-tree v-model="val2" style="width:200px" :data="baseData" showCheckbox isString></h-select-tree>
    <h-select-tree v-model="val4" :data="baseData" showCheckbox ></h-select-tree>
    <br><br><br>
    {{val2}}
    <h-select-tree v-model="val5" style="width:200px" :data="baseData3" showCheckbox checkStrictly></h-select-tree>
    {{val2}}
    <h-select-tree v-model="val3" style="width:200px" :data="baseData4" filterable></h-select-tree>
    {{val3}}
    <h-select-tree v-model="val6" style="width:200px" :data="baseData5" showCheckbox checkStrictly filterable></h-select-tree>
你好你好你好
    <h-select-tree v-model="val7" style="width:200px" :data="baseData5" showCheckbox filterable></h-select-tree>
    {{val4}}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        val:'',
        firstVal:'',
        valc: '',
        firstValc: 'parent',
        val1:[],
        val2:[],
        val3:'',
        val4:[],
        val5:[],
        val6:[],
        val7:[],
        baseData: [
          {
            title: 'parent',
            id: '1-0',
            expand: true,
            children: [
              {
                title: 'child1',
                id: '1-1',
                expand: true,
                children: [
                  {
                    title: 'child1-1-1',
                    id: '1-1-1'
                  },
                  {
                    title: 'child1-1-2',
                    id: '1-1-2'
                  }
                ]
              },
              {
                title: 'child2',
                id: '1-2',
                children: []
              }
            ]
          }
        ],
        baseData1: [
          {
            title: 'parent',
            id: '1-0',
            expand: true,
            children: [
              {
                title: 'child1',
                id: '1-1',
                expand: true,
                children: [
                  {
                    title: 'child1-1-1',
                    id: '1-1-1'
                  },
                  {
                    title: 'child1-1-2',
                    id: '1-1-2'
                  }
                ]
              },
              {
                title: 'child2',
                id: '1-2',
                children: []
              }
            ]
          }
        ],
        baseData2: [],
        baseData3: [{
            expand: true,
            title: 'parent 1',
            children: [{
              title: 'parent 1-0',
              expand: true,
              children: [{
                title: 'leaf',
                disableCheckbox: true
              }, {
                title: 'leaf',
              }]
            }, {
              title: 'parent 1-1',
              expand: true,
              checked: true,
              children: [{
                title: 'leaf',
              }]
            }]
        }],
        baseData4: [
          {
            title: 'parent',
            id: '1-0',
            expand: true,
            children: [
              {
                title: 'child1',
                id: '1-1',
                expand: true,
                children: [
                  {
                    title: 'child1-1-1',
                    id: '1-1-1'
                  },
                  {
                    title: 'child1-1-2',
                    id: '1-1-2'
                  }
                ]
              },
              {
                title: 'child2',
                id: '1-2',
                children: []
              }
            ]
          }
        ],
        baseData5: [],
      }
    },
    methods: {
      selectChange(data){
        console.log(data);
      },
      handleSelectChange (data) {
        // console.log(data);
      },
      updateTree (data) {
        data[0].children[0].checked = true;
        data[0].children[0].children[0].checked = true;
        data[0].children[0].children[1].checked = true;
      },
      handleChange () {
        // console.log(1)
      },
      showChange(arr){
        // console.log(arr)
      },
      showExpand (payload) {
        console.log(payload)
      }
    },
    mounted () {
      this.firstVal = '1';
      this.baseData2= [{
            expand: true,
            title: 'parent 1',
            id:'1',
            children: [{
              title: 'parent 1-0',
              id:'1-0',
              expand: true,
              children: [{
                title: 'leaf',
                id:'1-0-0',
                disableCheckbox: true
              }, {
                title: 'leaf',
                id:'1-0-1',
              }]
            }, {
              title: 'parent 1-1',
              id:'1-1',
              expand: true,
              children: [{
                title: 'leaf',
                id:'1-1-0',
              }]
            }]
        }];
      // this.updateTree(this.baseData);
       this.baseData5= [{
            expand: true,
            title: 'parent 1',
            children: [{
              title: 'parent 1-0',
              expand: true,
              children: [{
                title: 'leaf',
                disableCheckbox: true
              }, {
                title: 'leaf',
              }]
            }, {
              title: 'parent 1-1',
              expand: true,
              checked: true,
              children: [{
                title: 'leaf',
              }]
            }]
        }]
    }
  }
</script>