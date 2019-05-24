<template>
  <div>
    <div
      class="item"
      v-for="item in configs"
      v-text="item.label"
      :key="item.type"
      draggable="true"
      @dragstart="(ev) => {handleDrag(ev, item)}"
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
    handleDrag (ev, item) {
      ev.dataTransfer.setData('type', item.type)
      ev.dataTransfer.setData('behavior', 'createNode')
      // 定义拖动图片
      // ev.dataTransfer.setDragImage(imageObj, x, y)
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
