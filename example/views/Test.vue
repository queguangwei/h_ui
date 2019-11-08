<template>
  <div class="factorTest">
    <h2>修改模式要素1</h2>
    <div>
      <button @click="submitFormData">提交测试</button>
      <button @click="popPage">弹出测试</button>
      <button @click="gotoPage">跳转测试</button>
      <button @click="closePage">关闭测试</button>
      <button @click="activePage">激活主页测试</button>
      <button @click="refreshPage">刷新测试</button>
    </div>
     <h-table class="tables" rowSelectOnly  border :columns="columns2" :data="data1"></h-table>
  <!-- <h-table :columns="columns" :data="data1" headAlgin="center" border :highlight-row="true" @on-current-change="click1" :loading="loading" bodyAlgin="left">
        <span slot="loading">我是自定义加载！！！</span>
      </h-table> -->
    
    
  </div>
</template>
<script>
const ItemCol = 6 ;
export default {
  name: "trust_base_biz_factorTest",
  data() {
    return {
      columns2: [
				{
					type: "selection",
					width: 60,
					align: "center"
				},
				{
          title: "姓名",
          width: 60,
					key: "name"
				},
				{
          title: "年龄",
          // width: 60,
					key: "age"
				},
				{
          // hiddenCol:true,
					title: "地址",
					key: "address"
				}
			],
			data1: [
				{
					name: "王小明",
					age: 18,
					address: "北京市朝阳区芍药居"
				},
				{
					name: "张小刚",
					age: 25,
					address: "北京市海淀区西二旗"
				}
			],
      factors3: {
        has_panel: true,
        cols: 12,
        labelWidth: 140,
        query_mode: "query_update",
          factor_type_list: [
          {
            factor_type_name: "下拉框",
            factor_type_code: "combox1",
            factors: [
              {
                init_value: "",
                factor_type_code: "combox1",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "r1",
                factor_desc: "要素类型5",
                field_type: "5",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素5下拉框",
                factor_code: "combox1_5_1",
                factor_value: null,
                isneedreview: false,
                ext_config: {
                  required:true,
                  cols: 6,
                  hasGroup: true,
                  items: [
                    {
                      label: "中國",
                      items: [
                        {
                          code: "beijing",
                          text: "北京市"
                        },
                        {
                          code: "shanghai",
                          text: "上海市"
                        },
                        {
                          code: "shenzhen",
                          text: "深圳市"
                        },
                        {
                          code: "hangzhou",
                          text: "杭州市"
                        },
                        {
                          code: "nanjing",
                          text: "南京市"
                        },
                        {
                          code: "chongqing",
                          text: "重庆市"
                        }
                      ]
                    },
                    {
                      label: "American",
                      items: [
                        {
                          code: "newyork",
                          text: "紐約"
                        },
                        {
                          code: "Chicago",
                          text: "芝加哥"
                        }
                      ]
                    }
                  ]
                }
              },
              {
                init_value: "",
                factor_type_code: "combox1",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "r1",
                factor_desc: "要素类型10",
                field_type: "10",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素10多选下拉框",
                factor_code: "combox1_10_1",
                factor_value: null,
                isneedreview: false,
                ext_config: {
                  cols: 6,
                  hasGroup: true,
                  items: [
                    {
                      label: "中國",
                      items: [
                        {
                          code: "beijing",
                          text: "北京市"
                        },
                        {
                          code: "shanghai",
                          text: "上海市"
                        },
                        {
                          code: "shenzhen",
                          text: "深圳市"
                        },
                        {
                          code: "hangzhou",
                          text: "杭州市"
                        },
                        {
                          code: "nanjing",
                          text: "南京市"
                        },
                        {
                          code: "chongqing",
                          text: "重庆市"
                        }
                      ]
                    },
                    {
                      label: "American",
                      items: [
                        {
                          code: "newyork",
                          text: "紐約"
                        },
                        {
                          code: "Chicago",
                          text: "芝加哥"
                        }
                      ]
                    }
                  ]
                }
              }
            ]
          },
          {
           factor_type_name: "测试组件",
           factor_type_code: "demo",
            factors: [
              {
                init_value: "",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "r1",
                factor_desc: "要素类型1",
                field_type: "1",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素1普通文本",
                factor_code: "input1_1_1",
                factor_value: "回填文本值已输入",
                isneedreview: false,
                ext_config: {
                  cols: ItemCol,
                  validRules: [
                    {
                      test: {},
                      message: "不全是字母",
                      trigger: "blur"
                    }
                  ],
                  required: true
                }
              },
              {
                init_value: "",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "require_rule_test|disable_rule_test|visible_rule_test|changeFactorLabel_rule_test|setCompVisibleByTypename_rule_test|exp_rule_test|tipRule_rule_test|confirmRule_rule_test",
                factor_desc: "要素类型2",
                field_type: "2",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素2数字录入",
                factor_code: "input1_2_1",
                factor_value: "1234",
                isneedreview: false,
                ext_config: {
                  cols: ItemCol,
                  tip:{
                    content:"kkkkkk",
                    placement:"right-start",
                    icon:{position:"right"}
                  }
                }
              },
              {
                init_value: "",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "r1",
                factor_desc: "要素类型4",
                field_type: "4",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素4日期录入",
                factor_code: "date1_4_1",
                factor_value: "2019-09-04",
                isneedreview: false,
                ext_config: {
                  cols: ItemCol
                }
              },
              {
                init_value: "",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "r1",
                factor_desc: "要素类型16",
                field_type: "16",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素16金额录入",
                factor_code: "typefield1_16_1",
                factor_value: "",
                isneedreview: false,
                ext_config: {
                  cols: ItemCol
                }
              },
              {
                init_value: "",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "tipRule_rule_test2",
                factor_desc: "要素类型18",
                field_type: "18",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素18金额录入",
                factor_code: "typefield1_18_1",
                factor_value: "",
                isneedreview: false,
                ext_config: {
                  cols: ItemCol
                }
              },
              {
                init_value: "",
                is_can_update: true,
                copy_from_out: "",
                rule_id: "tipRule_rule_test3",
                factor_desc: "要素类型3",
                field_type: "3",
                is_can_view: true,
                from_edit_table: false,
                factor_name: "要素3文本域录入",
                factor_code: "input1_3_1",
                factor_value: "sss",
                isneedreview: false,
                ext_config: {
                  cols: 6
                }
              },
              {
                is_can_update: true,
                field_type: "6",
                factor_name: "6:数据字典",
                factor_code: "combox1_6_1",
                factor_value: null,
                ext_config: {
                  cols: ItemCol,
                  dictName: "BIZ_AUTH_TYPE"
                }
              },
              {
                is_can_update: true,
                field_type: "9",
                factor_name: "9:数据字典多选",
                factor_code: "combox1_9_1",
                factor_value: null,
                ext_config: {
                  cols: ItemCol,
                  dictName: "BIZ_AUTH_TYPE"
                }
              },
              {
                is_can_update: true,
                field_type: "17",
                factor_name: "17:数据字典模糊搜索多选",
                factor_code: "combox1_17_1",
                factor_value: null,
                ext_config: {
                  cols: ItemCol,
                  dictName: "PROJECT_PHASE"
                }
              },
              {
                is_can_update: true,
                field_type: "14",
                factor_name: "14:單选默认支持模糊搜索",
                factor_code: "combox1_1ItemCol_1",
                factor_value: null,
                ext_config: {
                  cols: ItemCol,
                  hasGroup: true,
                  items: [
                    {
                      label: "中國",
                      items: [
                        {
                          code: "beijing",
                          text: "北京市"
                        },
                        {
                          code: "shanghai",
                          text: "上海市"
                        },
                        {
                          code: "shenzhen",
                          text: "深圳市"
                        },
                        {
                          code: "hangzhou",
                          text: "杭州市"
                        },
                        {
                          code: "nanjing",
                          text: "南京市"
                        },
                        {
                          code: "chongqing",
                          text: "重庆市"
                        }
                      ]
                    },
                    {
                      label: "American",
                      items: [
                        {
                          code: "newyork",
                          text: "紐約"
                        },
                        {
                          code: "Chicago",
                          text: "芝加哥"
                        }
                      ]
                    }
                  ]
                }
              },
              {
                is_can_update: true,
                field_type: "15",
                factor_name: "15:多选默认支持模糊搜索",
                factor_code: "combox1_15_1",
                factor_value: null,
                ext_config: {
                  cols: ItemCol,
                  hasGroup: true,
                  items: [
                    {
                      label: "中國",
                      items: [
                        {
                          code: "beijing",
                          text: "北京市"
                        },
                        {
                          code: "shanghai",
                          text: "上海市"
                        },
                        {
                          code: "shenzhen",
                          text: "深圳市"
                        },
                        {
                          code: "hangzhou",
                          text: "杭州市"
                        },
                        {
                          code: "nanjing",
                          text: "南京市"
                        },
                        {
                          code: "chongqing",
                          text: "重庆市"
                        }
                      ]
                    },
                    {
                      label: "American",
                      items: [
                        {
                          code: "newyork",
                          text: "紐約"
                        },
                        {
                          code: "Chicago",
                          text: "芝加哥"
                        }
                      ]
                    }
                  ]
                }
              },
              {
                is_can_update: false,
                field_type: "31",
                factor_name: "31:分组组件",
                factor_code: "filedgroup",
                factor_value:{
                  tree:'',
                  input1:'',
                },
                ext_config:{
                  cols: ItemCol,
                  leftType:'t-base-select-tree',
                  rightType:'t-base-input',
                  leftField:{
                    data:[
                      {
                        title: 'parent',
                        id: '1-0',
                        children: [
                          {
                            title: 'child1',
                            id: '1-1',
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
                    hiddenLabel:true,
                    checkprop:"tree",
                    required:true,
                  },
                  rightField:{
                    labelWidth:0,
                    hiddenLabel:true,
                    checkprop:"input1",
                    required:true,
                  },
                }
              },
              {
                is_can_update: false,
                field_type: "28",
                factor_name: "28:日期组组件",
                factor_code: "Dates",
                factor_value:{
                  data1:'',
                  data2:'',
                  data3:''
                },
                ext_config:{
                  cols: ItemCol,
                  leftType:'t-base-date',
                  rightType:'t-base-date',
                  sort:true,
                  leftField:{
                    hiddenLabel:true,
                    checkprop:"data1",
                    required:true,
                  },
                  rightField:{
                    labelWidth:0,
                    hiddenLabel:true,
                    checkprop:"data2",
                    required:true,
                  },
                  sortField:{
                    checkprop:"data3",
                  }
                }
              },
              {
                  is_can_update: false,
                  field_type: "20",
                  factor_name: "20:隐藏域",
                  factor_code: "input1_20_1",
                  factor_value: "sss",
                  ext_config: {
                      cols: ItemCol
                  }
              },
              {
                  is_can_update: false,
                  field_type: "33",
                  factor_name: "33:级联组件",
                  factor_code: "tab_select_1",
                  factor_value: "",
                  ext_config: {
                      hiddenLabel:true,
                      cols: ItemCol,
                      data:[
                          {
                              value: 'beijing',
                              label: '北京',
                              children: [
                                  {
                                      value: 'gugong',
                                      label: '故宫'
                                  },
                                  {
                                      value: 'tiantan',
                                      label: '天坛'
                                  },
                                  {
                                      value: 'wangfujing',
                                      label: '王府井'
                                  }
                              ]
                          },
                          {
                              value: 'jiangsu',
                              label: '江苏',
                              children: [
                                  {
                                      value: 'nanjing',
                                      label: '南京',
                                      children: [
                                          {
                                              value: 'fuzimiao',
                                              label: '夫子庙',
                                          }
                                      ]
                                  },
                                  {
                                      value: 'suzhou',
                                      label: '苏州',
                                      children: [
                                          {
                                              value: 'zhuozhengyuan',
                                              label: '拙政园',
                                          },
                                          {
                                              value: 'shizilin',
                                              label: '狮子林',
                                          }
                                      ]
                                  }
                              ],
                          }
                      ],
                      pathvalue:false,
                      reqParams:{
                          url:"",
                          params:{value:1,key:2}
                      },
                      required:false,
                  }
              },
              {
                  is_can_update: false,
                  field_type: "39",
                  factor_name: "39:时间区间",
                  factor_code: "input1_39_1",
                  factor_value: "20190904 - 20190905",
                  ext_config: {
                    format:"yyyyMMdd",
                      cols: ItemCol
                  }
              },
              {
                  is_can_update: false,
                  field_type: "30",
                  factor_name: "30:下拉自定义URL页面",
                  factor_code: "cascader",
                  factor_value: "22222222222",
                  ext_config: {
                      cols: ItemCol,
                      exterior:false,
                      url:"views/bizViews/factor/form",
                      required:false,
                      hiddenLabel:true
                  }
              },
               {
                  is_can_update: false,
                  field_type: "34",
                  factor_name: "34:富文本",
                  factor_code: "base-editor",
                  factor_value: {content:"22222222222"},
                  ext_config: {
                  }
              }
            ]
          },
              {
                  factor_type_name: "文档上传",
                  factor_type_code: "textUpload",
                  factors:[{
                      is_can_update: false,
                      field_type: "21",
                      factor_name: "自定义页面2",
                      factor_code: "dyncpage1",
                      factor_value: { stringInput: "sasa" },
                      ext_config: {
                          path_props:{app_name:"BASE",route_id:"trust_base_biz_singleUploadView"},
                          required: true,
                          hiddenLabel:true
                      }
                  }]
              }
        ],
          factor_rule_list: [
          {
              is_not_exe_rule: "0",
              fun_name: "setCompVisibleByTypename",
              rule_name: "分类隐藏",
              temp_code: null,
              fun_args: "'下拉框',[input1_2_1]!='12345678'",
              rule_id: "setCompVisibleByTypename_rule_test",
              event_type: "on-change",
              is_use: "1",
              is_init_exe: "2"
          },
          
        ]
      }
    };
  },
  created() {
    // this.$on('do-factor-ext-fc',this.doFactorExtFc)
  },
  methods: {
    doFactorExtFc(value) {
      console.log(value);
    },
    doFactorExtFc2(value) {
      console.log(value);
    },
    deleteFirstFactor(){
        this.$refs.factorComp.deleteFactor(this.$refs.factorComp.dataPool.factorData[0]["factors"][0]);
    },
    changeFactorName(){
        this.$refs.factorComp["changeFactorName"]({"factor_name":"hhhh","factor_code":this.$refs.factorComp.dataPool.factorData[0]["factors"][0]["factor_code"]})
    },
    copyFactor(){
        let f = this.$refs.factorComp.dataPool.factorData[0]["factors"][0];
        f.factor_type_name = "sss" ;
        this.$refs.factorComp["copyFactor"]({"factor":f})
    },
    submitFormData(){
       let res = this.$refs.factorForm.getAllFactorData(true,true)
       console.log(res)
    },
    popPage(){

    },
    gotoPage(){
      let parm = {};
      let tabObj = {
          tabId: "basecompTest"+(Math.random()+""),
          tabName: "基础组件测试",
          tabUrl: "/test/basecompTest",
          routeId: "trust_base_biz_basecompTest",
          propInfo: parm,
          configInfo: {isKeepAlive:true}
      };
      this.$TBaseTab.addSysTab(tabObj);
    },
    closePage(){
        this.$TBaseTab.close();
    },
    activePage(){
        this.$TBaseTab.activate("mainIndex");
    },
    refreshPage(){
        this.$TBaseTab.refresh();
    }
  }
};
</script>
<style>
.factorTest h2 {
  margin: 10px;
  color: #0058ff;
}
.tables{
  width: 500px;
}
</style>
