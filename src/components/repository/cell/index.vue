<template>
  <div class="cell" v-text="value"></div>
</template>

<script>
export default {
  name: 'cell',
  props: {
    value: {
      type: [String, Number],
      default: 'text'
    }
  }
}
</script>

<style scoped>
.cell{
  line-height: 1;
}
</style>
