<template>
  <div>
    <!-- <h2>SimpleTable</h2>
    <h-simple-table
      :columns="columns"
      border
      :barWidth="30"
      :barHeight="30"
      :data="data"
      height="300"
      width="1000"
      notAdaptive
    >
    </h-simple-table> -->
    <h2>总列宽大于表格列宽</h2>
    <h-table
      :columns="columns1"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data1"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽大于表格列宽</h2>
    <h-table
      :columns="columns1"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data2"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽大于表格列宽</h2>
    <h-table
      :columns="columns1"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data3"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽小于表格列宽，大于表格列宽减滚动条宽</h2>
    <h-table
      :columns="columns2"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data1"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽小于表格列宽，大于表格列宽减滚动条宽</h2>
    <h-table
      :columns="columns2"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data2"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽小于表格列宽，大于表格列宽减滚动条宽</h2>
    <h-table
      :columns="columns2"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data3"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽小于表格列宽</h2>
    <h-table
      :columns="columns3"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data1"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽小于表格列宽</h2>
    <h-table
      :columns="columns3"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data2"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>总列宽小于表格列宽</h2>
    <h-table
      :columns="columns3"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data3"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>最后一列不设置列宽</h2>
    <h-table
      :columns="columns4"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data1"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2>最后一列不设置列宽</h2>
    <h-table
      :columns="columns4"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data2"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
    <h2 class="bug">最后一列不设置列宽</h2>
    <h-table
      :columns="columns4"
      border
      :barWidth="17"
      :barHeight="17"
      :data="data3"
      height="300"
      width="1000"
      patibleHeight
    >
    </h-table>
  </div>
</template>
<script>
let jsonData = [];
let tData = require("../assets/aa.json");
for (let i = 0; i < 1; i++) {
  jsonData = tData.slice(0, 50);
}
export default {
  data() {
    return {
      columns1: [
        {
          type: "index",
          align: "center",
          width: 200,
          fixed: "left"
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200
        },
        {
          title: "地址",
          width: 200,
          key: "securityCode",
          fixed: "right"
        },
        {
          title: "地址1",
          key: "securityName",
          width: 220
        }
      ],
      columns2: [
        {
          type: "index",
          align: "center",
          width: 200,
          fixed: "left"
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200
        },
        {
          title: "地址",
          width: 200,
          key: "securityCode",
          fixed: "right"
        },
        {
          title: "地址1",
          key: "securityName",
          width: 190
        }
      ],
      columns3: [
        {
          type: "index",
          align: "center",
          width: 200,
          fixed: "left"
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200
        },
        {
          title: "地址",
          width: 200,
          key: "securityCode",
          fixed: "right"
        },
        {
          title: "地址1",
          key: "securityName",
          width: 170
        }
      ],
      columns4: [
        {
          type: "index",
          align: "center",
          width: 200,
          fixed: "left"
        },
        {
          type: "selection",
          align: "center",
          key: "select",
          width: 200,
          fixed: "left"
        },
        {
          title: "年龄",
          key: "tradeDate",
          width: 200,
          fixed: "right"
        },
        {
          title: "地址",
          // width: 200,
          key: "securityCode"
        },
        {
          title: "地址1",
          key: "securityName",
          // width: 178
        }
      ],
      data1: tData.slice(0, 50),
      data2: tData.slice(0, 5),
      data3: []
    };
  },
  methods: {}
};
</script>
<style lang="sass">
button.h-btn {
  color: lightblue!important;
}
/*滚动条样式*/
/*---滚动条默认显示样式--*/
// .h-table-body::-webkit-scrollbar-thumb {
//     background-color: transparent;
//     border-color: transparent;
//     height: 50px;
// }
/*---滚动条浮动显示样式--*/
// .h-table-body:hover::-webkit-scrollbar-thumb {
//     background-color: #606C7D;
//     border-color: transparent;
//     height: 50px;
// }
/*---滚动条边角--*/
// .h-table-body::-webkit-scrollbar-corner {
//   background-color: transparent;
// }
/*---鼠标点击滚动条显示样式--*/
// .h-table-body::-webkit-scrollbar-thumb:hover {
//   background-color: #818B99;
// }
/*---滚动条大小--*/
// .h-table-body::-webkit-scrollbar {
//   width: 6px;
//   height: 6px;
// }
/*---滚动框背景样式--*/
// .h-table-body::-webkit-scrollbar-track-piece {
//   background-color: transparent;
// }
// .h-table-body::-webkit-scrollbar-thumb:active {
//   background-color: #495566;
// }

/*---滚动条默认显示样式--*/
// .h-table-tip::-webkit-scrollbar-thumb {
//   background-color: transparent;
//   border-color: transparent;
//   height: 50px;
// }
/*---滚动条浮动显示样式--*/
// .h-table-tip:hover::-webkit-scrollbar-thumb {
//   background-color: #606C7D;
//   border-color: transparent;
//   height: 50px;
// }
/*---滚动条边角--*/
// .h-table-tip::-webkit-scrollbar-corner {
//   background-color: transparent;
// }
/*---鼠标点击滚动条显示样式--*/
// .h-table-tip::-webkit-scrollbar-thumb:hover {
//   background-color: #818B99;
// }
/*---滚动条大小--*/
// .h-table-tip::-webkit-scrollbar {
//   width: 6px;
//   height: 6px;
// }
/*---滚动框背景样式--*/
// .h-table-tip::-webkit-scrollbar-track-piece {
// background-color: transparent;
// }
.h-table-tip::-webkit-scrollbar-thumb:active {
  background-color: #495566;
}

.h-datagrid-toolbar {
    border: solid #d7dde4;
    .h-btn {
      > .h-icon + span,
      > span + .h-icon{
        color: #666;
      }
      .iconfont {
        color: inherit;
      }
      &.h-btn-disable > .h-icon + span,
      &.h-btn-disable > span + .h-icon,
      &.h-btn-disable > .iconfont {
        color: inherit;
      }
    }
  }
.h-table-header th {
    color: #d8e7f2;
    font-family: inherit;
}
.h-table {
    color: #d8e7f2;
}
.h-table:before,
.h-table:after {
    background-color: #232d3b;
}
.h-table th {
    background-color: #303c4c;
}
.h-table-wrapper {
    border: none;
}
.h-table-border th {
    border-right: 1px solid #232d3b;
}
.h-table th {
    border-bottom: 1px solid #232d3b;
}
.h-table-tip {
    background: #19212c;
}
.h-table-wrapper > .h-table > .h-table-body,
.h-table-wrapper > .h-table > .h-table-tip > .h-table-tiptext {
    background: #eeeff0 linear-gradient(#1f2834 50%, #232d3b 0) 0% 0%/100% 60px;
}
.h-table-tbody td {
    color: #d8e7f2;
    background-color: #1f2834;
    font-family: inherit;
}
.h-table .h-table-body tr:nth-child(2n) td,
.h-table .h-table-fixed-body tr:nth-child(2n) td {
    background-color: #232d3b;
}
.h-table th, .h-table td {
    border-bottom: 1px solid #2e333c;
}
.h-table-row-highlight td,
.h-table-row-checked td,
.h-table tr.h-table-row-highlight.h-table-row-hover td,
.h-table tr.h-table-row-checked.h-table-row-hover td,
.h-table-stripe .h-table-body tr.h-table-row-highlight:nth-child(2n) td,
.h-table-stripe .h-table-fixed-body tr.h-table-row-highlight:nth-child(2n) td,
.h-table-stripe .h-table-body tr.h-table-row-checked:nth-child(2n) td,
.h-table-stripe .h-table-fixed-body tr.h-table-row-checked:nth-child(2n) td {
    background-color: #3e4652;
}
// .h-table .h-table-body tr.h-table-row-checked td {
//     background-color: #3e4652;
// }
.h-table .h-table-body tr.h-table-row-hover td {
    background-color: #49505c;
}
//表格选中项颜色
.h-table .h-table-body tr.h-table-row-checked td {
    background-color: #0092FF !important;
    border-right: 1px solid #303c4c;
}
//工具类边框
.h-datagrid-toolbar {
    border: none;
    background-color: #232d3b;
}
h2.bug {
  color: red;
}
</style>
