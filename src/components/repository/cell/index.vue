<template>
  <div class="cell">
    <span
      :style="labelStyle"
      v-text="labelText"
    ></span>
    <span
      :style="valueStyle"
      v-text="value"
    ></span>
  </div>
</template>

<script>
import {mm2px} from '@/utils/utils'

export default {
  name: 'cell',
  props: {
    label: {
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
    },
    labelSize: {
      type: Number,
      default: 4
    },
    valueSize: {
      type: Number,
      default: 4
    }
  },
  computed: {
    labelText () {
      return `${this.label}${this.separation}`
    },
    labelStyle () {
      return {
        fontSize: `${mm2px(this.labelSize)}px`
      }
    },
    valueStyle () {
      return {
        fontSize: `${mm2px(this.valueSize)}px`
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.cell{
  line-height: 1;
}
</style>
