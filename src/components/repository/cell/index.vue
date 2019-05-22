<template>
  <div class="cell" v-text="content"></div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    labelText: {
      type: String,
      default: '标签'
    },
    value: {
      type: [String, Number],
      default: '值'
    },
    separation: {
      type: String,
      default: '：'
    }
  },
  data () {
    return {
      content: `${this.labelText}${this.separation}${this.value}`
    }
  }
}
</script>

<style scoped>
</style>
