<template>
  <div>
    <h-simple-table 
      showHeader
      highlightRow
      border
      :columns="columns1"
      :data="bigData3"
      :multiLevel='multiLevel1'
      :show-header="true"
      :disabled-hover="true"
      :toScrollTop="true"
      :scrollTopSet="scrollTopSet"
    ></h-simple-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scrollTopSet: 100,
      bigData3: [],
      columns1: [
        { type: "selection", width: 60, align: "center", title: "" },
        { title: "核对日期", key: "liquidate_date" },
        { title: "产品序号", key: "fund_id" },
        { title: "产品代码", key: "fund_code" },
        { title: "产品名称", key: "fund_name", width: 300, ellipsis: true },
        {
          title: "交易市场",
          key: "market_no",
          dict: "610400",
        },
        { title: "证券代码", key: "report_code" },
        { title: "证券名称", key: "stock_name", ellipsis: true },
        {
          title: "多空标志",
          key: "position_type",
          dict: "40350",
        },
        {
          title: "资产类型",
          key: "asset_type",
          dict: "10036",
        },
        {
          title: "投资类型",
          key: "invest_type",
          dict: "40351",
        },
        {
          title: "远期标志",
          key: "future_flag",
        },
        // 差值
        {
          title: "价格",
          key: "calc_price_diff",
          ellipsis: true,
          hiddenCol: false,
          displaytype: "N",
        },
        {
          title: "持仓数量",
          key: "current_amount_diff",
          ellipsis: true,
          hiddenCol: false,
          displaytype: "N",
        },
        {
          title: "市值",
          key: "asset_balance_diff",
          ellipsis: true,
          hiddenCol: false,
          displaytype: "N",
        },
        {
          title: "结转成本",
          key: "current_cost_diff",
          ellipsis: true,
          hiddenCol: false,
          displaytype: "N",
        },
        // 系统数据
        { title: "价格", key: "calc_price", ellipsis: true, hiddenCol: false },
        {
          title: "持仓数量",
          key: "current_amount",
          ellipsis: true,
          hiddenCol: false
        },
        {
          title: "市值",
          key: "asset_balance",
          ellipsis: true,
          hiddenCol: false
        },
        {
          title: "结转成本",
          key: "current_cost",
          ellipsis: true,
          hiddenCol: false
        },
        // 估值数据
        {
          title: "价格",
          key: "calc_price_fa",
          ellipsis: true,
          hiddenCol: false
        },
        {
          title: "持仓数量",
          key: "current_amount_fa",
          ellipsis: true,
          hiddenCol: false
        },
        {
          title: "市值",
          key: "asset_balance_fa",
          ellipsis: true,
          hiddenCol: false
        },
        {
          title: "结转成本",
          key: "current_cost_fa",
          ellipsis: true,
          hiddenCol: false
        }
      ],
      multiLevel1: [
        {title: '', cols: 12, align: 'center'},
        {title: '差值', cols: 4, align: 'center'},
        {title: '系统数据', cols: 4, align: 'center'},
        {title: '财务数据', cols: 4, align: 'center'}
      ],
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>
