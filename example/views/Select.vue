<template>
<div>   
    <h1>Select组件</h1>
    <p>选择器支持单选、多选、搜索，以及键盘快捷操作。</p>
    <h1>基础用法</h1>
    <p>使用v-model双向绑定数据,默认为单选</p>
    <br>
    <p>单选时，value只接受字符串和数字类型，多选时，value只接受数组类型</p>
    <h-select v-model="model34" style="width:120px" @on-change="change">
        <h-option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</h-option>
    </h-select>
    {{model34}}
    <h-select v-model="model44" multiple style="width:320px" :isString="true" isCheckall @on-change="change">
        <h-option v-for="item in cityList" multiple :value="item.value" :key="item.value">{{ item.label }}</h-option>
    </h-select>
    {{model44}}
    <br>
    <div>
        <h-select v-model="model1" width="200" @on-change="change">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
    </div>
    <h1>
        设置select尺寸
    </h1>
    <br>
    <p>设置size属性为large或small，将输入框设置为大和小尺寸，不设置为默认中尺寸</p>
    <br>
    <div>
        <span>小:</span>
        <h-select v-model="model2" size="small" width="100">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
         <span>正常:</span>
        <h-select v-model="model3" width="100">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
         <span>大:</span>
        <h-select v-model="model4" size="large" width="100">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
    </div>
    <h1>
       disabled:禁用(可直接配置disabled，或配置disabled属性为true)
    </h1>
    <br>
    <div>
        <span>select禁用：</span>
        <h-select v-model="model5" width="200" disabled>
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
        <span>option禁用：</span>
        <h-select v-model="model5" width="200">
            <h-option value="beijing">北京市</h-option>
            <h-option value="shanghai" disabled>上海市</h-option>
            <h-option value="shenzhen">深圳市</h-option>
        </h-select>
        <span>正常;</span>
        <h-select v-model="model6" width="200">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
    </div>
     <br>
    <h1>
        clearable:选择后可清空输入框选项(可直接配置clearable，或配置clearable属性为true)注意：仅适用于单选模式
    </h1>
    <br>
    <div>
        <span>可清空</span>
        <h-select v-model="model6" width="200" clearable>
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
    </div>
    <br>
    <h1>
        option-group:选项分组
    </h1>
    <br>
    <div>
        <span>分组:</span>
        <h-select v-model="model7" width="200" multiple :isString="true">
            <h-option-group label="热门城市">
                <h-option v-for="(item, index) in cityList1" :value="item.value" :key="item.value">{{ item.label }}</h-option>
            </h-option-group>
             <h-option-group label="其他城市">
                <h-option v-for="(item, index) in cityList2" :value="item.value" :key="item.value">{{ item.label }}</h-option>
            </h-option-group>
        </h-select>
        {{model7}}
    </div>
    <br>
    <h1>
        自定义select下拉选项格式(一般会在option中国绑定label显示)
    </h1>
    <br>
    <div>
        <span>自定义:</span>
        <h-select v-model="model8" width="200">
            <h-option v-for="(item, index) in uList" :value="item.id" :label="item.name"  :key="item.id">
                <span>{{ item.name }}</span>
                <span style="float:right;color:#ccc;position:absolute;right:8px">{{ item.id }}</span>
            </h-option>
        </h-select>
    </div>
    <br>
    <h1>
         multiple:多选（可直接配置 multiple，或配置 multiple属性为true），多选模式下。model接收数组类型的数据，返回数组类型的数据
    </h1>
    <br>
    <div>
        <span>多选123:</span>
        <h-select v-model="model9" width="260"  multiple size="large" :isString="true">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
        <!-- <h-select v-model="model9" width="260"  multiple size="small" :isString="true">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select> -->
        {{model9}}
    </div>
    <br>
    <h1>
         filterable:可搜索（可直接配置 filterable，或配置 filterable属性为true），多选模式下可以使用键盘delete键删除最后一个选项
    </h1>
    <br>
    <div>
        <span>单选可搜索:</span>
        <h-select v-model="model10" width="200"  filterable>
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
         <span>多选可搜索:</span>
        <h-select v-model="model11" width="200"  multiple filterable :isString="true">
            <h-option v-for="(item, index) in uList" :value="item.id" :key="item.id">{{ item.name }}</h-option>
        </h-select>
        {{model11}}
    </div>
    <h1>
         remote:远程可搜索，需同时设置 filterable、remote、remote-method、loading 四个 props，其中 loading 用于控制是否正在搜索中，remote-method 是远程搜索的方法。设置初始显示值，需设置 label 属性。
    </h1>
    <br>
    <div>
        <span>远程搜索:</span>
        <h-select width="200"  
                  v-model="model13"
                  filterable
                  remote
                  :remote-method="remoteMethod1"
                  :loading="loading1">
            <h-option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</h-option>
        </h-select>
        {{model13}}
    </div>
    <h-select v-model="mode224"  not-found-text="新设置的为空显示的内容" filterable>
        <h-option v-for="item in cityList224" :value="item.value" :key="item.value">{{ item.value }}</h-option>
    </h-select>
</div>
</template>
<script>
    export default {
        data () {
            return {
                cityList: [
                        {
                            value: 'beijing',
                            label: '北京市北京市北京市北京市北京市北京市'
                        },
                        {
                            value: 'shanghai',
                            label: '上海市上海市上海市上海市上海市上海市上海市'
                        },
                        {
                            value: 'shenzhen',
                            label: '深圳市'
                        },
                        {
                            value: 'hangzhou',
                            label: '杭州市'
                        },
                        {
                            value: 'shenzhen111',
                            label: '南京市111'
                        },
                        {
                            value: 'shenzhen222',
                            label: '重庆市222'
                        },
                        {
                            value: 'shenzhen223',
                            label: '重庆市223'
                        }, 
                        {
                            value: 'shenzhen224',
                            label: '重庆市224'
                        }, 
                        {
                            value: 'shenzhen225',
                            label: '重庆市225'
                        },
                        {
                            value: 'shenzhen226',
                            label: '重庆市226'
                        },
                        {
                            value: 'shenzhen227',
                            label: '重庆市227'
                        },

                    ],
                model34: '',
                model44: 'shenzhen,hangzhou',
                mode224:'',
                model1: '',
                model2: '',
                model3: '',
                model4: '',
                model5: '',
                model6: '',
                model7: '',
                model8: '',
                model9: '',
                model10: '',
                model11: '',
                model13: '',
                loading1: false,
                options1:[],
                mu:true,
                mu1:true,
                d: [],
                uList : [
                ],
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'],
                cityList1: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    }
                ],
                cityList2: [
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                cityList224:''
            }
        },
        methods: {
            change(e){
                console.log(e);
            },
            clear(){
                this.d = [];
            },
            remoteMethod1 (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        this.options1 = [];
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            },
        },
        mounted(){
            this.uList=[
                {id:'1',name:"中国"},
                {id:'2',name:"美国"},
                {id:'3',name:"韩国"},
                {id:'4',name:"韩国"},
                {id:'5',name:"韩国"},
                {id:'6',name:"韩国"},
                {id:'7',name:"韩国"},
                {id:'8',name:"韩国"}
            ];
        }
      }
</script>
<style>
    p{
        font-size: 18px;
    }
</style>