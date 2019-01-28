import Vue from 'vue'
import Router from 'vue-router'
// import { resolve } from 'dns';
// import Home from '../views/Home.vue'
// import Hello from '../views/hello.vue'
// import Switchs from '../views/Switchs.vue'
// import Typefield from '../views/Typefield.vue'
// import Input from '../views/Input.vue'
// import Checkbox from '../views/Checkbox.vue'
// import Radio from '../views/Radio.vue'
// import Icon from '../views/Icon.vue'
// import Buttons from '../views/Buttons.vue'
// import Messages from '../views/Messages.vue'
// import Notices from '../views/Notices.vue'
// import MsgBox from '../views/MsgBox.vue'
// import Alerts from '../views/Alerts.vue'
// import Progress from '../views/Progress.vue'
// import Badge from '../views/Badge.vue'
// import InputNum from '../views/InputNumber.vue'
// import Tooltip from '../views/Tooltip.vue'
// import Poptip from '../views/Poptip.vue'
// import Slider from '../views/Slider.vue'
// import Carousel from '../views/Carousel.vue'
// import Grid from '../views/Grid.vue'
// import Select from '../views/Select.vue'
// import Menu from '../views/Menu.vue'
// import Breadcrumb from '../views/Breadcrumb.vue'
// import Layout from '../views/Layout.vue'
// import Upload from '../views/Upload.vue'
// import Table from '../views/Table.vue'
// import Page from '../views/Page.vue'
// import DatePicker from '../views/DatePicker.vue'
// import TimePicker from '../views/TimePicker.vue'
// import Tree from '../views/Tree.vue'
// import Tabs from '../views/Tabs.vue'
// import Dropdown from '../views/Dropdown.vue'
// import Timeline from '../views/Timeline.vue'
// import Collapse from '../views/Collapse.vue'
// import Cascader from '../views/Cascader.vue'
// import Transfer from '../views/Transfer.vue'
// import Loadingbar from '../views/Loadingbar.vue'
// import Backtop from '../views/Backtop.vue'
// import Spin from '../views/Spin.vue'
// import Form from '../views/Form.vue'
// import SelectTree from '../views/SelectTree.vue'
// import Steps from '../views/Steps.vue'
// import Circle from '../views/Circle.vue'
// import Affix from '../views/Affix.vue'
// import Card from '../views/Card.vue'
// import EditGird from '../views/EditGird.vue'
// import GroupTable from '../views/GroupTable.vue'
// import TreeGird from '../views/TreeGird.vue'
// import AsycTreeGird from '../views/AsycTreeGird.vue'
// import SelectTable from '../views/SelectTable.vue'
// import FastDate from '../views/FastDate.vue'
// import SplicePanel from '../views/SplicePanel.vue'
// import Panel from '../views/Panel.vue'
// import SimpleTable from '../views/SimpleTable.vue'
// import TransferTable from '../views/TransferTable.vue'
// import FormGird from '../views/FormGird.vue'
// import Rate from '../views/Rate.vue'
// import Textdiff from '../views/Textdiff.vue'
// import TypefieldRange from '../views/TypefieldRange.vue'
// const hyh = resolve=>{
//     import(xxx.js).then(module=>{//import 实现异步加载
//         resolve(module)
//     });
// }
Vue.use(Router)
// 使用require.ensure，会有一个缓存的效果，每次进行资源请求，判断出客户端缓存的资源是否是最新的,如果是的话,
//服务器就会返回HTTP/304 Not Modified响应头，不是的话会进行
const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { name: 'home', path: '/home', component: resolve=>{ require(['../views/Home.vue'],resolve)} },
    { name: 'switchs', path: '/switchs', component:resolve=>{ require(['../views/Switchs.vue'],resolve)}},
    { name: 'typefield', path: '/typefield', component: resolve=>{ require(['../views/Typefield.vue'],resolve)} },
    {
        name: 'Input',
        path: '/Input',
        component:resolve=>{  require(['../views/Input.vue'],resolve)}
    },
    {
        name: 'inputNum',
        path: '/inputNum',
        component:resolve=>{  require(['../views/InputNumber.vue'],resolve)}
    },
    {
        name: 'checkbox',
        path: '/checkbox',
        component:resolve=>{  require(['../views/Checkbox.vue'],resolve)}
    },
    {
        name: 'radio',
        path: '/radio',
        component:resolve=>{ require(['../views/Radio.vue'],resolve)}
    },
    {
        name: 'icon',
        path: '/icon',
        component:resolve=>{ require(['../views/Icon.vue'],resolve)}
    },
    {
        name: 'buttons',
        path: '/buttons',
        component:resolve=>{ require(['../views/Buttons.vue'],resolve)}
    },
    {
        name: 'messages',
        path: '/messages',
        component:resolve=>{ require(['../views/Messages.vue'],resolve)}
    },
    {
        name: 'notices',
        path: '/notices',
        component:resolve=>{ require(['../views/Notices.vue'],resolve)}
    },
    {
        name: 'alert',
        path: '/alerts',
        component:resolve=>{ require(['../views/Alerts.vue'],resolve)}
    },
    {
        name: 'msgBox',
        path: '/msgBox',
        component:resolve=>{ require(['../views/MsgBox.vue'],resolve)}
    },
    {
        name: 'tooltip',
        path: '/tooltip',
        component:resolve=>{ require(['../views/Tooltip.vue'],resolve)}
    },
    {
        name: 'poptip',
        path: '/poptip',
        component:resolve=>{ require(['../views/Poptip.vue'],resolve)}
    },
    {
        name: 'progress',
        path: '/progress',
        component:resolve=>{ require(['../views/Progress.vue'],resolve)}
    },
    {
        name: 'slider',
        path: '/slider',
        component:resolve=>{ require(['../views/Slider.vue'],resolve)}
    },
    {
        name: 'badge',
        path: '/badge',
        component:resolve=>{ require(['../views/Badge.vue'],resolve)}
    },
    {
        name: 'carousel',
        path: '/carousel',
        component:resolve=>{ require(['../views/Carousel.vue'],resolve)}
    },
    {
        name: 'grid',
        path: '/grid',
        component:resolve=>{ require(['../views/Grid.vue'],resolve)}
    },
    {
        name: 'select',
        path: '/select',
        component:resolve=>{ require(['../views/Select.vue'],resolve)}
    },
    {
        name: 'simpleSelect',
        path: '/simpleSelect',
        component:resolve=>{ require(['../views/SimpleSelect.vue'],resolve)}
    },
    {
        name: 'menu',
        path: '/menu',
        component:resolve=>{ require(['../views/Menu.vue'],resolve)}
    },
    {
        name: 'breadcrumb',
        path: '/breadcrumb',
        component:resolve=>{ require(['../views/Breadcrumb.vue'],resolve)}
    },
    {
        name: 'layout',
        path: '/layout',
        component:resolve=>{ require(['../views/Layout.vue'],resolve)}
    },
    {
        name: 'upload',
        path: '/upload',
        component:resolve=>{ require(['../views/Upload.vue'],resolve)}
    },
    {
        name: 'table',
        path: '/table',
        component:resolve=>{ require(['../views/Table.vue'],resolve)},
        meta: {
            isKeepAlive: true
        }
    },
    {
        name: 'page',
        path: '/page',
        component:resolve=>{ require(['../views/Page.vue'],resolve)}
    },
    {
        name: 'DatePicker',
        path: '/datePicker',
        component:resolve=>{ require(['../views/DatePicker.vue'],resolve)}
    }, 
    {
        name: 'TimePicker',
        path: '/timePicker',
        component:resolve=>{ require(['../views/TimePicker.vue'],resolve)}
    },       
    {
        name: 'Tree',
        path: '/tree',
        component:resolve=>{ require(['../views/Tree.vue'],resolve)}
    },       
    {
        name: 'Tabs',
        path: '/tabs',
        component:resolve=>{ require(['../views/Tabs.vue'],resolve)}
    },       
    {
        name: 'Dropdown',
        path: '/dropdown',
        component:resolve=>{ require(['../views/Dropdown.vue'],resolve)}
    },
    {
        name: 'Timeline',
        path: '/timeline',
        component:resolve=>{ require(['../views/Timeline.vue'],resolve)}
    },
    {
        name: 'Collapse',
        path: '/collapse',
        component:resolve=>{ require(['../views/Collapse.vue'],resolve)}
    },
    {
        name: 'Cascader',
        path: '/cascader',
        component:resolve=>{ require(['../views/Cascader.vue'],resolve)}
    },
    {
        name: 'Transfer',
        path: '/transfer',
        component:resolve=>{ require(['../views/Transfer.vue'],resolve)}
    },
    {
        name: 'Loadingbar',
        path: '/loadingbar',
        component:resolve=>{ require(['../views/Loadingbar.vue'],resolve)}
    },
    {
        name: 'Spin',
        path: '/spin',
        component:resolve=>{ require(['../views/Spin.vue'],resolve)}
    },
    {
        name: 'Backtop',
        path: '/backtop',
        component:resolve=>{ require(['../views/Backtop.vue'],resolve)}
    },
    {
        name: 'Form',
        path: '/form',
        component:resolve=>{ require(['../views/Form.vue'],resolve)}
    },
    {
        name: 'SelectTree',
        path: '/selectTree',
        component:resolve=>{ require(['../views/SelectTree.vue'],resolve)}
    },
    {
        name: 'Steps',
        path: '/steps',
        component:resolve=>{ require(['../views/Steps.vue'],resolve)}
    },
    {
        name: 'Circle',
        path: '/circle',
        component:resolve=>{ require(['../views/Circle.vue'],resolve)}
    },
    {
        name: 'Affix',
        path: '/affix',
        component:resolve=>{ require(['../views/Affix.vue'],resolve)}
    },
    {
        name: 'Card',
        path: '/card',
        component:resolve=>{ require(['../views/Card.vue'],resolve)}
    },
    {
        name: 'EditGird',
        path: '/editgird',
        component:resolve=>{ require(['../views/EditGird.vue'],resolve)}
    },
    {
        name: 'GroupTable',
        path: '/groupTable',
        component:resolve=>{ require(['../views/GroupTable.vue'],resolve)}
    },
    {
        name: 'TreeGird',
        path: '/treeGird',
        component:resolve=>{ require(['../views/TreeGird.vue'],resolve)}
    },
    {
        name: 'AsycTreeGird',
        path: '/asyctreeGird',
        component:resolve=>{ require(['../views/AsycTreeGird.vue'],resolve)}
    },
    {
        name: 'SelectTable',
        path: '/selectTable',
        component:resolve=>{ require(['../views/SelectTable.vue'],resolve)}
    },
    {
        name: 'FastDate',
        path: '/fastDate',
        component:resolve=>{ require(['../views/FastDate.vue'],resolve)}
    },
    {
        name: 'SplicePanel',
        path: '/splicePanel',
        component:resolve=>{ require(['../views/SplicePanel.vue'],resolve)}
    },
    {
        name: 'Panel',
        path: '/panel',
        component:resolve=>{ require(['../views/Panel.vue'],resolve)}
    },
    {
        name: 'Hello',
        path: '/hello',
        component:resolve=>{ require(['../views/Hello.vue'],resolve)}
    },
    {
        name: 'SimpleTable',
        path: '/simpleTable',
        component:resolve=>{ require(['../views/SimpleTable.vue'],resolve)}
    },
    {
        name: 'TransferTable',
        path: '/transferTable',
        component:resolve=>{ require(['../views/TransferTable.vue'],resolve)}
    },
    {
        name:'FormGird',
        path:'/formGird',
        component:resolve=>{ require(['../views/FormGird.vue'],resolve)}
    },
    {
        name:'Rate',
        path:'/rate',
        component:resolve=>{ require(['../views/Rate.vue'],resolve)}
    },
    {
        name: 'Textdiff',
        path: '/textdiff',
        component:resolve=>{ require(['../views/Textdiff.vue'],resolve)}
    },
    {
        name: 'TypefieldRange',
        path: '/typefieldRange',
        component:resolve=>{ require(['../views/TypefieldRange.vue'],resolve)}
    },
    {
        name: 'FileImport',
        path: '/fileimport',
        component:resolve=>{ require(['../views/FileImport.vue'],resolve)}
    },
    {
        name: 'FileExport',
        path: '/fileexport',
        component:resolve=>{ require(['../views/FileExport.vue'],resolve)}
    },   
    {
        name: 'Split',
        path: '/split',
        component:resolve=>{ require(['../views/Split.vue'],resolve)}
    },
    {
        name: 'Drawer',
        path: '/drawer',
        component:resolve=>{ require(['../views/Drawer.vue'],resolve)}
    },
    {
        name: 'DownLoad',
        path: '/downLoad',
        component:resolve=>{ require(['../views/DownLoad.vue'],resolve)}
    },
    {
        name: 'Log',
        path: '/log',
        component:resolve=>{ require(['../views/Log.vue'],resolve)}
    },
    {
        name: 'tag',
        path: '/tag',
        component:resolve=>{ require(['../views/tag.vue'],resolve)}
    },
    {
        name: 'SimpleTreeGird',
        path: '/simpleTreeGird',
        component:resolve=>{ require(['../views/SimpleTreeGird.vue'],resolve)}
    }
 ]
})

router.beforeEach((to, from, next) => {
    let top = document.body.scrollTop
    if (top > 0) {
        const timer = setInterval(() => {
            scrollTo(0, top)
            top -= 100
            if (top <= 0) {
                scrollTo(0, 0)
                clearInterval(timer)
            }
        }, 20)
    }
    next()
})

export default router