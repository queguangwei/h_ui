<template>
  <div>
    <h2>SimpleTable</h2>
    <h-simple-table
      :columns="columns1"
      border
      :data="data1"
      height="300"
      width="1000"
      notAdaptive
    >
    </h-simple-table>
    <h2>总列宽大于表格列宽</h2>
    <h-table
      :columns="columns1"
      border
      :data="data1"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>总列宽大于表格列宽</h2>
    <h-table
      :columns="columns1"
      border
      :data="data2"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>总列宽大于表格列宽</h2>
    <h-table
      :columns="columns1"
      border
      :data="data3"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>总列宽小于表格列宽，大于表格列宽减滚动条宽</h2>
    <h-table
      :columns="columns2"
      border
      :data="data1"
      height="300"
      width="1000"
    >
    </h-table>
    <h2>总列宽小于表格列宽，大于表格列宽减滚动条宽</h2>
    <h-table
      :columns="columns2"
      border
      :data="data2"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>总列宽小于表格列宽，大于表格列宽减滚动条宽</h2>
    <h-table
      :columns="columns2"
      border
      :data="data3"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>总列宽小于表格列宽</h2>
    <h-table
      :columns="columns3"
      border
      :data="data1"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>总列宽小于表格列宽</h2>
    <h-table
      :columns="columns3"
      border
      :data="data2"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>总列宽小于表格列宽</h2>
    <h-table
      :columns="columns3"
      border
      :data="data3"
      width="1000"
      maxHeight="300"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>最后一列不设置列宽</h2>
    <h-table
      :columns="columns4"
      border
      :data="data1"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2>最后一列不设置列宽</h2>
    <h-table
      :columns="columns4"
      border
      :data="data2"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
    >
    </h-table>
    <h2 class="bug">最后一列不设置列宽</h2>
    <h-table
      :columns="columns4"
      border
      :data="data3"
      height="300"
      width="1000"
      :patibleHeight="patibleHeight"
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
      patibleHeight: true,
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
          width: 200
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

