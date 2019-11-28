<template>
<div class="top">
<h-tooltip textWrap :content="content" placement="top-start">
<h-button>中文</h-button>
</h-tooltip>
<h-tooltip textWrap :content="content1" placement="top-start">
<h-button>英文</h-button>
</h-tooltip>
<h-tooltip textWrap :content="content2" placement="top-start">
<h-button>一行</h-button>
</h-tooltip>
<h-tooltip textWrap :content="content2" placement="top-start">
<h-button>一行</h-button>
</h-tooltip>
<h-tooltip placement="top" :content="content" :disabled="disabled" always>
<h-button @click="disabled = true">点击提示消失</h-button>
</h-tooltip>
<h-tooltip textWrap placement="top">
<h-button>slot</h-button>
<div slot="content">
<p>{{content}}</p>
<p>-----fen ge xian--------</p>
<p>{{content1}}</p>
</div>
</h-tooltip>
<h-button @click="showBox">msg Box</h-button>
<h-msgBox v-model="modal" width="360">
<p slot="header" style="color:#f60;text-align:center">
<h-icon name="warning"></h-icon>
<span>删除确认</span>
</p>
<div style="text-align:center">
<p>此任务删除后，下游 10 个任务将无法执行。</p>
<p>是否继续删除？</p>
<h-tooltip textWrap :content="content" placement="top-start">
<h-button>中文</h-button>
</h-tooltip>
</div>
<div slot="footer"> </div>
</h-msgBox>
</div>
</template>
<script>
export default {
data() {
return {
content: 'Top Left 文字       提示Top Left 文Top Left 文      字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top LTop Left 文字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top L字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示',
content1: 'adsgdf         lsugpalepfufhfhfçccpalepf   ufhfhfçccccccccccccfdshfadupfapalepfufhfhfçccccccccccccfdshfadupfaccccccccccfdshfadupfaoier',
content2: 'fgfgffgfg杜甫我大方是发v',
disabled: false,
modal: false,
}
},
methods: {
showBox() {
this.modal = true
}
}
};
</script>