webpackJsonp([29],{700:function(n,t,e){e(964);var a=e(0)(e(777),e(868),null,null);n.exports=a.exports},777:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Carouser",data:function(){return{value1:"1",value2:"1",value3:"1",value4:"1-1"}},methods:{change:function(n){console.log(n)}}}},868:function(n,t,e){"use strict";n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("h2",[n._v("基本用法 手风琴")]),n._v(" "),e("h-collapse",{on:{"on-change":n.change},model:{value:n.value1,callback:function(t){n.value1=t},expression:"value1"}},[e("h-panel",{attrs:{name:"1"}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("h-select"),n._v(" "),e("h-input")],1)]),n._v(" "),e("h-panel",{attrs:{name:"2"}},[n._v("\n        斯蒂夫·盖瑞·沃兹尼亚克\n        "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。")])]),n._v(" "),e("h-panel",{attrs:{name:"3"}},[n._v("\n        乔纳森·伊夫\n        "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。")])])],1),n._v(" "),e("h2",[n._v("手风琴")]),n._v(" "),e("h-collapse",{attrs:{accordion:""},model:{value:n.value2,callback:function(t){n.value2=t},expression:"value2"}},[e("h-panel",{attrs:{name:"1"}},[n._v("\n        史蒂夫·乔布斯\n        "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。")])]),n._v(" "),e("h-panel",{attrs:{name:"2"}},[n._v("\n        斯蒂夫·盖瑞·沃兹尼亚克\n        "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。")])]),n._v(" "),e("h-panel",{attrs:{name:"3"}},[n._v("\n        乔纳森·伊夫\n        "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。")])])],1),n._v(" "),e("h2",[n._v("面板嵌套")]),n._v(" "),e("h-collapse",{attrs:{accordion:""},model:{value:n.value3,callback:function(t){n.value3=t},expression:"value3"}},[e("h-panel",{attrs:{name:"1"}},[n._v("\n        史蒂夫·乔布斯\n        "),e("div",{attrs:{slot:"content"},slot:"content"},[n._v("\n          史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。\n          "),e("h-collapse",{attrs:{accordion:""},model:{value:n.value4,callback:function(t){n.value4=t},expression:"value4"}},[e("h-panel",{attrs:{name:"1-1"}},[n._v("\n              iPhone\n              "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("iPhone，是美国苹果公司研发的智能手机，它搭载iOS操作系统。第一代iPhone于2007年1月9日由苹果公司前首席执行官史蒂夫·乔布斯发布，并在2007年6月29日正式发售。")])]),n._v(" "),e("h-panel",{attrs:{name:"1-2"}},[n._v("\n              iPad\n              "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("iPad是由苹果公司于2010年开始发布的平板电脑系列，定位介于苹果的智能手机iPhone和笔记本电脑产品之间，（屏幕中有4个虚拟程序固定栏）与iPhone布局一样，提供浏览网站、收发电子邮件、观看电子书、播放音频或视频、玩游戏等功能。由英国出生的设计主管乔纳森·伊夫（Jonathan Ive）（有些翻译为 乔纳森·艾维）领导的团队设计的，这个圆滑、超薄的产品反映出了伊夫对德国天才设计师Dieter Rams的崇敬之情。")])])],1)],1)]),n._v(" "),e("h-panel",{attrs:{name:"2"}},[n._v("\n        斯蒂夫·盖瑞·沃兹尼亚克\n        "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。")])]),n._v(" "),e("h-panel",{attrs:{name:"3"}},[n._v("\n        乔纳森·伊夫\n        "),e("p",{attrs:{slot:"content"},slot:"content"},[n._v("乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。")])])],1),n._v(" "),e("br"),e("br"),e("br"),e("br"),n._v(" "),e("br"),e("br"),e("br"),n._v(" "),e("br")],1)},staticRenderFns:[]}},926:function(n,t,e){t=n.exports=e(39)(),t.push([n.i,"\n.demo-carousel{\n  height: 200px;\n  line-height: 200px;\n  text-align: center;\n  color: #fff;\n  font-size: 20px;\n  background: #506b9e;\n}\n",""])},964:function(n,t,e){var a=e(926);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(49)("8bcd05d8",a,!0)}});