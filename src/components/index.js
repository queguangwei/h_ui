import Hello from './Hello'
import Hi from './Hi'
import Typefield from './Typefield'
import Switch from './Switch'
import Input from './Input'
import Checkbox from './Checkbox'
import CheckboxGroup from './Checkbox'
import Radio from './Radio'
// import RadioGroup from './RadioGroup'
import Icon from './Icon'
import Button from './Button'
import ButtonGroup from './Button'
import Badge from './Badge'
import Progress from './Progress'
import InputNum from './InputNumber'
import Tooltip from './Tooltip'
import Slider from './Slider'
import Carousel from './Carousel'
import Carouselitem from './Carousel'
import Circle from './Circle'
import Row from './Grid'
import Col from './Grid'
import Select from './Select'
import Option from './Select'
import OptionGroup from './Select'
import Menu from './Menu'
import MenuGroup from './Menu'
import MenuItem from './Menu'
import Submenu from './Menu'
import Breadcrumb from './Breadcrumb'
import BreadcrumbItem from './Breadcrumb'
import Upload from './Upload'
import Poptip from './Poptip'
import Table from './Table'
import Page from './Page'
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import Tree from './Tree'
import Tabs from './Tabs'
import Dropdown from './Dropdown'
import Timeline from './Timeline'
import Collapse from './Collapse'
import Cascader from './Cascader'
import Transfer from './Transfer'
import SelectTree from './SelectTree'
import Spin from './Spin'
import Backtop from './Backtop'
import GoBottom from './GoBottom'
import Form from './Form'
import FormItem from './Form'
import Steps from './Steps'
import Affix from './Affix'
import Card from './Card'
import AutoComplete from './AutoComplete';

function init(...components) {
  const com = {}
  components.forEach(c => {
    Object.keys(c).forEach(key => {
        com[`H${key}`] = c[key]
    })
  })
  return com
}

export default init(
  Hello,
  Hi,
  Row,
  Col,
  Typefield,
  Switch,
  Input,
  Checkbox,
  Radio,
  Icon,
  Button,
  ButtonGroup,
  Progress,
  InputNum,
  Tooltip,
  Slider,
  Carousel,
  Carouselitem,
  Progress,
  Select,
  Option,
  OptionGroup,
  Menu,
  MenuGroup,
  MenuItem,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Upload,
  Poptip,
  Table,
  Page,
  DatePicker,
  TimePicker,
  Tree,
  Tabs,
  Dropdown,
  Timeline,
  Collapse,
  Cascader,
  Transfer,
  Spin,
  Backtop,
  GoBottom,
  SelectTree,
  Form,
  FormItem,
  Steps,
  Badge,
  Circle,
  Affix,
  Card
)