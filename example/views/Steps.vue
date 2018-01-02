<template>
  <div>

     <h2>基础用法</h2>
    <h-steps :current="1">
        <h-step title="已完成" content="这里是该步骤的描述信息"></h-step>
        <h-step title="进行中" content="这里是该步骤的描述信息"></h-step>
        <h-step title="待进行" content="这里是该步骤的描述信息"></h-step>
        <h-step title="待进行" content="这里是该步骤的描述信息"></h-step>
    </h-steps>

    <h2>迷你版 ( size:small )</h2>
    <h-steps :current="2" size="small">
        <h-step title="已完成"></h-step>
        <h-step title="已完成"></h-step>
        <h-step title="进行中"></h-step>
        <h-step title="待进行"></h-step>
    </h-steps>

    <h2>带有图标</h2>
    <h-steps :current="1">
        <h-step title="注册" icon="person-add"></h-step>
        <h-step title="上传头像" icon="camera_fill"></h-step>
        <h-step title="验证邮箱" icon="email"></h-step>
    </h-steps>

    <h2>切换步骤</h2>
    <p>当前正在进行第 {{ current + 1 }} 步</p>
    <h-steps :current="current">
        <h-step title="步骤1"></h-step>
        <h-step title="步骤2"></h-step>
        <h-step title="步骤3"></h-step>
        <h-step title="步骤4"></h-step>
    </h-steps>
    <h-button type="primary" @click="next">下一步</h-button>

    <h2>垂直方向</h2>
    <h-steps :current="2" direction="vertical">
        <h-step title="已完成" content="这里是该步骤的描述信息"></h-step>
        <h-step title="已完成" content="这里是该步骤的描述信息"></h-step>
        <h-step title="进行中" content="这里是该步骤的描述信息"></h-step>
        <h-step title="待进行" content="这里是该步骤的描述信息"></h-step>
    </h-steps>

    <h2>步骤运行错误</h2>
    <h-steps :current="1" status="error">
        <h-step title="已完成" content="这里是该步骤的描述信息"></h-step>
        <h-step title="进行中" content="这里是该步骤的描述信息"></h-step>
        <h-step title="待进行" content="这里是该步骤的描述信息"></h-step>
        <h-step title="待进行" content="这里是该步骤的描述信息"></h-step>
    </h-steps>


  </div>
</template>

<script>
  export default {
    data () {
              return {
                  current: 0
              }
          },
    methods: {
        next () {
            if (this.current == 3) {
                this.current = 0;
            } else {
                this.current += 1;
            }
        }
    }
  }
</script>
<style type="text/css" scoped>
  .h-steps {
    margin: 15px 0 40px 0;
  }
  p {
    margin: 15px 0!important;
    font-size: 16px;
  }
  button.h-btn-primary {
    margin: -30px 0 40px 0;
  }
</style>




