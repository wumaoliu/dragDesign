<template>
  <div>
    <div
      class="item"
      v-for="item in configs"
      v-text="item.label"
      :key="item.type"
      draggable="true"
      @dragstart="handleDrag"
    ></div>
  </div>
</template>

<script>
import {configs} from './repository'

export default {
  name: 'componentBanner',
  data () {
    return {
      configs
    }
  },
  methods: {
    handleDrag (ev) {
      // TODO
      ev.dataTransfer.setData('type', 'cell')
      ev.dataTransfer.setData('behavior', 'createNode')
    }
  }
}
</script>

<style scoped>
.item{
  border: 1px solid #EBEEF5;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
