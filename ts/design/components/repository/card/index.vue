<template>
  <el-card>
    <div slot="header">
      <span v-text="title"></span>
    </div>
    <div v-text="content"></div>
  </el-card>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
