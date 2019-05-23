<template>
  <div>
    <el-tag
      v-for="item in configs"
      v-text="item.label"
      :key="item.type"
      draggable="true"
      @dragstart.native="handleDrag"
    >
    </el-tag>
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
