// es6 polyfill
require('./style/main.scss')
// import Components from './components'
import Directives from './directives'
// import Message from './components/Message'
// import Notice from './components/Notice'
// import hMsgBox from './components/MsgBox'
// import hAlert from './components/Alert/Alert.vue'
// import hLoadingBar from './components/Loadingbar';

import Affix from './components/Affix';
import Alert from './components/Alert';
import AutoComplete from './components/AutoComplete';
import Backtop from './components/Backtop';
import Badge from './components/Badge';
import Breadcrumb from './components/Breadcrumb';
import Button from './components/Button';
import Card from './components/Card';
import Carousel from './components/Carousel';
import Cascader from './components/Cascader';
import Checkbox from './components/Checkbox';
import Circle from './components/Circle';
import Collapse from './components/Collapse';
import DatePicker from './components/DatePicker';
import Dropdown from './components/Dropdown';
import Form from './components/Form';
import Gobottom from './components/GoBottom';
import Icon from './components/Icon';
import Input from './components/Input';
import InputNumber from './components/InputNumber';
// import Scroll from './components/scroll';
import LoadingBar from './components/LoadingBar';
import Menu from './components/Menu';
import Message from './components/Message';
import MsgBox from './components/MsgBox';
import Notice from './components/Notice';
import Page from './components/Page';
import Poptip from './components/Poptip';
import Progress from './components/Progress';
import Radio from './components/Radio';
// import Rate from './components/rate';
import SelectTree from './components/SelectTree';
import Slider from './components/Slider';
import Spin from './components/Spin';
import Steps from './components/Steps';
import Switch from './components/Switch';
import Table from './components/Table';
import Tabs from './components/Tabs';
// import Tag from './components/tag';
import Timeline from './components/Timeline';
import TimePicker from './components/TimePicker';
import Tooltip from './components/Tooltip';
import Transfer from './components/Transfer';
import Tree from './components/Tree';
import Typefield from './components/Typefield';
import Upload from './components/Upload';
import Row from './components/Grid';
import Select from './components/Select';
import locale from './locale';

const h_ui = {
    Affix,
    hAffix: Affix,
    Alert,
    hAlert: Alert,
    AutoComplete,
    hAutoComplete: AutoComplete,
    Backtop,
    hBacktop: Backtop,
    Gobottom,
    hGobottom: Gobottom,
    Badge,
    hBadge: Badge,
    Breadcrumb,
    hBreadcrumb: Breadcrumb,
    BreadcrumbItem: Breadcrumb.Item,
    hBreadcrumbItem:  Breadcrumb.Item,
    Button,
    hButton: Button,
    ButtonGroup: Button.Group,
    hButtonGroup: Button.Group,
    Card,
    hCard: Card,
    Carousel,
    hCarousel: Carousel,
    Carouselitem: Carousel.Item,
    hCarouselitem: Carousel.Item,
    Cascader,
    hCascader: Cascader,
    Checkbox,
    hCheckbox: Checkbox,
    CheckboxGroup: Checkbox.Group,
    hCheckboxGroup: Checkbox.Group,
    // Circle,
    hCircle: Circle,
    Row,
    hRow: Row,
    Col: Row.Item,
    hCol: Row.Item,
    Collapse,
    hCollapse: Collapse,
    Panel: Collapse.Panel,
    hPanel: Collapse.Panel,
    DatePicker,
    hDatePicker: DatePicker,
    Dropdown,
    hDropdown: Dropdown,
    DropdownItem: Dropdown.Item,
    hDropdownItem: Dropdown.Item,
    DropdownMenu: Dropdown.Menu,
    hDropdownMenu: Dropdown.Menu,
    Form,
    hForm: Form,
    FormItem: Form.Item,
    hFormItem: Form.Item,
    Icon,
    hIcon: Icon,
    Input,
    hInput: Input,
    InputNumber,
    hInputNumber: InputNumber,
    LoadingBar,
    hLoadingBar: LoadingBar,
    Menu,
    hMenu: Menu,
    MenuGroup: Menu.Group,
    hMenuGroup: Menu.Group,
    MenuItem: Menu.Item,
    hMenuItem: Menu.Item,
    Submenu: Menu.Sub,
    hSubmenu: Menu.Sub,
    Message,
    hMessage: Message,
    MsgBox,
    hMsgBox: MsgBox,
    Notice,
    hNotice: Notice,
    Page,
    hPage: Page,
    Poptip,
    hPoptip: Poptip,
    Progress,
    hProgress: Progress,
    Radio,
    hRadio: Radio,
    RadioGroup: Radio.Group,
    hRadioGroup: Radio.Group,
    Select,
    hSelect: Select,
    Option: Select.Option,
    hOption: Select.Option,
    OptionGroup: Select.OptionGroup,
    hOptionGroup: Select.OptionGroup,
    SelectTree,
    hSelectTree: SelectTree,
    Slider,
    hSlider: Slider,
    Spin,
    hSpin: Spin,
    Steps,
    hSteps: Steps,
    Step: Steps.Step,
    hStep: Steps.Step,
  // Switch,
    hSwitch: Switch,
    Table,
    hTable: Table,
    Tabs,
    hTabs: Tabs,
    TabPane: Tabs.Pane,
    hTabPane: Tabs.Pane,
    Timeline,
    hTimeline: Timeline,
    TimelineItem: Timeline.Item,
    hTimelineItem: Timeline.Item,
    TimePicker,
    hTimePicker: TimePicker,
    Tooltip,
    hTooltip: Tooltip,
    Transfer,
    hTransfer: Transfer,
    Tree,
    hTree:Tree,
    Typefield,
    hTypefield: Typefield,
    Upload,
    hUpload:Upload
};
const install = function(Vue, opts = {}) {
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    Object.keys(h_ui).forEach(key => {
        Vue.component(key, h_ui[key]);
    });
    Object.keys(Directives).forEach(key => {
      Vue.directive(key, Directives[key])
    })
    Vue.prototype.$hLoading = LoadingBar;
    Vue.prototype.$hMessage = Message;
    Vue.prototype.$hMsgBox = MsgBox;
    Vue.prototype.$hNotice = Notice;
    Vue.prototype.$hSpin = Spin;
};
// function Venus(Vue, opts = {}) {
//   // 引用语言
//   locale.use(opts.locale);
//   locale.i18n(opts.i18n);

//   Object.keys(Directives).forEach(key => {
//     Vue.directive(key, Directives[key])
//   })
//   Object.keys(Components).forEach(key => {
//     Vue.component(key, Components[key])
//   })
//   Object.keys(View).forEach(key => {
//     Vue.component(key, View[key])
//   })
//   Vue.prototype.$hLoading = hLoadingBar;
//   Vue.prototype.$hMessage = Message;
//   Vue.prototype.$hNotice = Notice;
//   Vue.prototype.$hMsgBox = hMsgBox;
// }

if (typeof window !== 'undefined' && window.Vue) {
  // Venus(window.Vue)
  // window.Vue.use(Venus)
  install(window.Vue);
}
module.exports = Object.assign(h_ui, {install}); // eslint-disable-line no-undef
// module.exports = Venus
