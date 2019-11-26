<template>
  <div class="top">
    <h-tooltip textWrap :content="content" placement="top-start">
      <h-button>上左</h-button>
        <!-- <div slot="content">
          <div v-html="content"></div>
        </div> -->
    </h-tooltip>
  </div>
</template>
<script>
export default {
    data() {
        return {
            content: 'Top Left 文字提示Top Left 文Top Left 文字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top LTop Left 文字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top L字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示Top Left 文字提示'
        }
    }
};
</script>
