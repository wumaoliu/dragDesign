<template>
  <div
    :class="{active}"
    @click="handleClick"
  >
    <!-- <span>右上删除 TODO </span> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'wrapper',
  data () {
    return {
      active: true
    }
  },
  methods: {
    handleClick () {}
  }
}
</script>

<style scoped>
.active{
  position: absolute;
  cursor: pointer;
  display: inline-block;
  outline: 1px solid #cccccc
}
</style>
