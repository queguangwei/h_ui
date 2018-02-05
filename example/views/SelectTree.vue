<template>
  <div>
    <h-row>
      <h-col span="8">
        <h-select-tree v-model="val" style="width:200px" :data="baseData2" size="large" @on-select-change="selectChange" @on-toggle-expand="selectChange"></h-select-tree>
      </h-col>
      <h-col span="8">
        <h-select-tree v-model="valc" style="width:200px" :data="baseData1" placement="top" placeholder="你好"></h-select-tree>
      </h-col>
      <h-col span="8">
        <h-select-tree v-model="val" style="width:200px" :data="baseData2" size="small" disabled></h-select-tree>
      </h-col>
    </h-row>
    {{val}}
    <br><br><br>
    <h-select-tree v-model="val1" style="width:200px" :data="baseData3" showCheckbox checkStrictly @on-check-change="selectChange"></h-select-tree>
    <h-select-tree v-model="val2" style="width:200px" :data="baseData" showCheckbox></h-select-tree>
    <h-select-tree v-model="val4" :data="baseData" showCheckbox ></h-select-tree>
    <br><br><br>
    {{val1}}
    <h-select-tree v-model="val5" style="width:200px" :data="baseData3" showCheckbox checkStrictly></h-select-tree>
    {{val2}}
    <h-select-tree v-model="val3" style="width:200px" :data="baseData4" filterable></h-select-tree>
    {{val3}}
    <h-select-tree v-model="val6" style="width:200px" :data="baseData5" showCheckbox checkStrictly filterable></h-select-tree>
    <h-select-tree v-model="val6" style="width:200px" :data="baseData5" showCheckbox filterable></h-select-tree>
    {{val4}}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        val:'parent 1',
        valc: '',
        val1:[],
        val2:[],
        val3:'',
        val4:[],
        val5:[],
        val6:[],
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
        ]
        ,baseData2: [{
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
        baseData5: [{
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
      }
    },
    methods: {
      selectChange(data){
        console.log(data);
      },
      handleSelectChange (data) {
        console.log(data);
      },
      updateTree (data) {
        data[0].children[0].checked = true;
        data[0].children[0].children[0].checked = true;
        data[0].children[0].children[1].checked = true;
      },
      handleChange () {
        console.log(1)
      },
      showChange(arr){
        console.log(arr)
      },
      showExpand (payload) {
        console.log(payload)
      }
    },
    mounted () {
      // this.updateTree(this.baseData);
    }
  }
</script>