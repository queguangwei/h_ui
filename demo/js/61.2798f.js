webpackJsonp([61],{710:function(e,t,a){var r=a(0)(a(787),a(865),null,null);e.exports=r.exports},787:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{fcolumn:[{key:"check",title:" ",type:"index",width:100},{key:"input",title:"输入框",align:"center"},{key:"select",title:"选择器",align:"right"},{key:"radio",title:"单选框"},{key:"money",title:"金额框"},{key:"checkbox",title:"多选框"},{key:"fatdate",title:"特殊日期"}],formData:[{input:"1",select:"",radio:"",money:"",checkbox:[],fatdate:"",date:"",time:"",slider:"",tree:"",textarea:"1"}],phone:0,lists:[{data_value:"男"},{data_value:"女"}],model1:"",changeform:!1,formItem1:{input:"1",select:[],radio:"",money:"",checkbox:[],fatdate:"",date:"",time:"",slider:"",tree:"",textarea:"",cascader:[]},formItem2:{input:"1",select:"",radio:"",money:"",checkbox:[],fatdate:"",date:"",time:"",slider:"",tree:"",textarea:""},data2:[{value:"beijing",label:"北京",children:[{value:"gugong",label:"故宫"},{value:"tiantan",label:"天坛"},{value:"wangfujing",label:"王府井"}]},{value:"jiangsu",label:"江苏",children:[{value:"nanjing",label:"南京",children:[{value:"fuzimiao",label:"夫子庙"}]},{value:"suzhou",label:"苏州",children:[{value:"zhuozhengyuan",label:"拙政园"},{value:"shizilin",label:"狮子林"}]}]}],formValid:{user:"你好",stringInput:"",password:"",test1:"",test2:""},select1:"",select2:"",stringRule:["email"],regRule:[{test:/^[a-zA-Z]+$/,message:"不全是字母",trigger:"blur"}],columns1:[{title:"姓名",key:"name",ellipsis:!0},{title:"年龄",key:"age",hiddenCol:!0},{title:"地址",key:"address"}],data1:[{name:"王小明",age:18,address:"北京市朝阳区芍药居"},{name:"张小刚",age:25,address:"北京市海淀区西二旗"},{name:"李小红",age:30,address:"上海市浦东新区世纪大道"},{name:"周小伟",age:26,address:"深圳市南山区深南大道"}],baseData1:[{title:"parent",id:"1-0",children:[{title:"child1",id:"1-1",children:[{title:"child1-1-1",id:"1-1-1"},{title:"child1-1-2",id:"1-1-2"}]},{title:"child2",id:"1-2",children:[]}]}]}},methods:{rowClick:function(e){console.log(e)},submit1:function(){console.log("tijiao")},getAllData:function(){console.log(this.$refs.formGird.getAllData())}}}},865:function(e,t,a){"use strict";var r=a(1),o=function(e){return e&&e.__esModule?e:{default:e}}(r);e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h-tabs",{attrs:{value:"name1"}},[a("h-tab-pane",{attrs:{label:"标签一",name:"name1"}},[a("h-form-gird",{ref:"formGird",attrs:{columns:e.fcolumn,data:e.formData,height:"200",autoClear:!1,stripe:!0,border:!0,showHeader:!0,noDataText:"123",canDrag:!0,loading:!1},on:{"on-row-click":e.rowClick},model:{value:e.formItem1,callback:function(t){e.formItem1=t},expression:"formItem1"}},[a("h-form",{ref:"formItem1",attrs:{model:e.formItem1,compareModel:e.formItem2,"label-width":80,cols:"2"}},[a("h-form-item",{attrs:{label:"输入框",prop:"input",required:""}},[a("h-input",{attrs:{placeholder:"请输入"},model:{value:e.formItem1.input,callback:function(t){e.$set(e.formItem1,"input",t)},expression:"formItem1.input"}})],1),e._v(" "),a("h-form-item",{attrs:{label:"日期控件"}},[a("h-row",[a("h-col",{attrs:{span:"11"}},[a("h-form-item",{attrs:{prop:"date",required:""}},[a("h-datePicker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.formItem1.date,callback:function(t){e.$set(e.formItem1,"date",t)},expression:"formItem1.date"}})],1)],1),e._v(" "),a("h-col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}},[e._v("-")]),e._v(" "),a("h-col",{attrs:{span:"11"}},[a("h-form-item",{attrs:{prop:"time",required:""}},[a("h-timePicker",{attrs:{type:"time",placeholder:"选择时间"},model:{value:e.formItem1.time,callback:function(t){e.$set(e.formItem1,"time",t)},expression:"formItem1.time"}})],1)],1)],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"选择器",prop:"select",required:""}},[a("h-select",{attrs:{filterable:""},model:{value:e.formItem1.select,callback:function(t){e.$set(e.formItem1,"select",t)},expression:"formItem1.select"}},[a("h-option",{attrs:{value:"beijing"}},[e._v("北京市")]),e._v(" "),a("h-option",{attrs:{value:"shanghai"}},[e._v("上海市")]),e._v(" "),a("h-option",{attrs:{value:"shenzhen"}},[e._v("深圳市")])],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"金额框",prop:"money",required:""}},[a("h-typefield",{model:{value:e.formItem1.money,callback:function(t){e.$set(e.formItem1,"money",t)},expression:"formItem1.money"}},[a("h-select",{staticStyle:{width:"45px"},attrs:{slot:"append",placeholder:"",isArrow:!1,clearable:!1,tranfer:!0},slot:"append",model:{value:e.select2,callback:function(t){e.select2=t},expression:"select2"}},[a("h-option",{attrs:{value:"com"}},[e._v(".com")]),e._v(" "),a("h-option",{attrs:{value:"org"}},[e._v(".org")]),e._v(" "),a("h-option",{attrs:{value:"io"}},[e._v(".io")])],1)],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"单选框",prop:"radio",required:""}},[a("h-radio-group",{model:{value:e.formItem1.radio,callback:function(t){e.$set(e.formItem1,"radio",t)},expression:"formItem1.radio"}},[a("h-radio",{attrs:{label:"male"}},[e._v("男")]),e._v(" "),a("h-radio",{attrs:{label:"female"}},[e._v("女")])],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"多选框",prop:"checkbox",required:""}},[a("h-checkbox-group",{model:{value:e.formItem1.checkbox,callback:function(t){e.$set(e.formItem1,"checkbox",t)},expression:"formItem1.checkbox"}},[a("h-checkbox",{attrs:{label:"吃饭"}}),e._v(" "),a("h-checkbox",{attrs:{label:"睡觉"}}),e._v(" "),a("h-checkbox",{attrs:{label:"跑步"}}),e._v(" "),a("h-checkbox",{attrs:{label:"看电影"}})],1)],1),e._v(" "),a("h-form-item",{attrs:(0,o.default)({label:"特殊日期",required:"",prop:"fatdate"},"required","")},[a("h-fast-date",{model:{value:e.formItem1.fatdate,callback:function(t){e.$set(e.formItem1,"fatdate",t)},expression:"formItem1.fatdate"}})],1),e._v(" "),a("h-form-item",{attrs:{label:"下拉表",prop:"slider",required:""}},[a("h-select-table",{model:{value:e.formItem1.slider,callback:function(t){e.$set(e.formItem1,"slider",t)},expression:"formItem1.slider"}},[a("h-table-option",{attrs:{border:"",columns:e.columns1,data:e.data1}})],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"下拉树",prop:"tree",required:""}},[a("h-select-tree",{staticStyle:{width:"200px"},attrs:{data:e.baseData1,placement:"top",placeholder:"你好"},model:{value:e.formItem1.tree,callback:function(t){e.$set(e.formItem1,"tree",t)},expression:"formItem1.tree"}})],1),e._v(" "),a("h-form-item",{attrs:{label:"文本域",prop:"textarea",required:""}},[a("h-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入..."},model:{value:e.formItem1.textarea,callback:function(t){e.$set(e.formItem1,"textarea",t)},expression:"formItem1.textarea"}})],1)],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary"},on:{"on-click":e.submit1}},[e._v("提交")]),e._v(" "),a("Button",[e._v("取消")])],1)],1)],1),e._v(" "),a("h-tab-pane",{attrs:{label:"标签二",name:"name2"}},[a("h-form-gird",{ref:"formGird1",attrs:{columns:e.fcolumn,data:e.formData,height:"200",autoClear:!1,stripe:!0,border:!0,showHeader:!0,noDataText:"123",canDrag:!0,loading:!1},on:{"on-row-click":e.rowClick},model:{value:e.formItem2,callback:function(t){e.formItem2=t},expression:"formItem2"}},[a("h-form",{ref:"formItem2",attrs:{model:e.formItem2,compareModel:e.formItem2,"label-width":80,cols:"2"}},[a("h-form-item",{attrs:{label:"输入框",prop:"input",required:""}},[a("h-input",{attrs:{placeholder:"请输入"},model:{value:e.formItem2.input,callback:function(t){e.$set(e.formItem2,"input",t)},expression:"formItem2.input"}})],1),e._v(" "),a("h-form-item",{attrs:{label:"日期控件"}},[a("h-row",[a("h-col",{attrs:{span:"11"}},[a("h-form-item",{attrs:{prop:"date",required:""}},[a("h-datePicker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.formItem2.date,callback:function(t){e.$set(e.formItem2,"date",t)},expression:"formItem2.date"}})],1)],1),e._v(" "),a("h-col",{staticStyle:{"text-align":"center"},attrs:{span:"2"}},[e._v("-")]),e._v(" "),a("h-col",{attrs:{span:"11"}},[a("h-form-item",{attrs:{prop:"time",required:""}},[a("h-timePicker",{attrs:{type:"time",placeholder:"选择时间"},model:{value:e.formItem2.time,callback:function(t){e.$set(e.formItem2,"time",t)},expression:"formItem2.time"}})],1)],1)],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"选择器",prop:"select",required:""}},[a("h-select",{attrs:{filterable:""},model:{value:e.formItem2.select,callback:function(t){e.$set(e.formItem2,"select",t)},expression:"formItem2.select"}},[a("h-option",{attrs:{value:"beijing"}},[e._v("北京市")]),e._v(" "),a("h-option",{attrs:{value:"shanghai"}},[e._v("上海市")]),e._v(" "),a("h-option",{attrs:{value:"shenzhen"}},[e._v("深圳市")])],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"金额框",prop:"money",required:""}},[a("h-typefield",{model:{value:e.formItem2.money,callback:function(t){e.$set(e.formItem2,"money",t)},expression:"formItem2.money"}},[a("h-select",{staticStyle:{width:"45px"},attrs:{slot:"append",placeholder:"",isArrow:!1,clearable:!1,tranfer:!0},slot:"append",model:{value:e.select2,callback:function(t){e.select2=t},expression:"select2"}},[a("h-option",{attrs:{value:"com"}},[e._v(".com")]),e._v(" "),a("h-option",{attrs:{value:"org"}},[e._v(".org")]),e._v(" "),a("h-option",{attrs:{value:"io"}},[e._v(".io")])],1)],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"单选框",prop:"radio",required:""}},[a("h-radio-group",{model:{value:e.formItem2.radio,callback:function(t){e.$set(e.formItem2,"radio",t)},expression:"formItem2.radio"}},[a("h-radio",{attrs:{label:"male"}},[e._v("男")]),e._v(" "),a("h-radio",{attrs:{label:"female"}},[e._v("女")])],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"多选框",prop:"checkbox",required:""}},[a("h-checkbox-group",{model:{value:e.formItem2.checkbox,callback:function(t){e.$set(e.formItem2,"checkbox",t)},expression:"formItem2.checkbox"}},[a("h-checkbox",{attrs:{label:"吃饭"}}),e._v(" "),a("h-checkbox",{attrs:{label:"睡觉"}}),e._v(" "),a("h-checkbox",{attrs:{label:"跑步"}}),e._v(" "),a("h-checkbox",{attrs:{label:"看电影"}})],1)],1),e._v(" "),a("h-form-item",{attrs:(0,o.default)({label:"特殊日期",required:"",prop:"fatdate"},"required","")},[a("h-fast-date",{model:{value:e.formItem2.fatdate,callback:function(t){e.$set(e.formItem2,"fatdate",t)},expression:"formItem2.fatdate"}})],1),e._v(" "),a("h-form-item",{attrs:{label:"下拉表",prop:"slider",required:""}},[a("h-select-table",{model:{value:e.formItem2.slider,callback:function(t){e.$set(e.formItem2,"slider",t)},expression:"formItem2.slider"}},[a("h-table-option",{attrs:{border:"",columns:e.columns1,data:e.data1}})],1)],1),e._v(" "),a("h-form-item",{attrs:{label:"下拉树",prop:"tree",required:""}},[a("h-select-tree",{staticStyle:{width:"200px"},attrs:{data:e.baseData1,placement:"top",placeholder:"你好"},model:{value:e.formItem2.tree,callback:function(t){e.$set(e.formItem2,"tree",t)},expression:"formItem2.tree"}})],1),e._v(" "),a("h-form-item",{attrs:{label:"文本域",prop:"textarea",required:""}},[a("h-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入..."},model:{value:e.formItem2.textarea,callback:function(t){e.$set(e.formItem2,"textarea",t)},expression:"formItem2.textarea"}})],1)],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary"},on:{"on-click":e.submit1}},[e._v("提交")]),e._v(" "),a("Button",[e._v("取消")])],1)],1)],1)],1),e._v(" "),a("Button",{on:{"on-click":e.getAllData}},[e._v(" 获取所有数据")]),e._v(" "),a("span",[e._v(e._s(e.formItem1))])],1)},staticRenderFns:[]}}});