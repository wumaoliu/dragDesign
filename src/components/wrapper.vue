<template>
  <div
    class="wrapper"
    :class="{active}"
    draggable="true"
    @dragstart="handleDrag"
    @click="handleClick"
  >
    <span
      v-show="active"
      class="delete-icon"
      @click="handleRemoveNode"
    >-</span>
    <slot></slot>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'wrapper',
  props: {
    type: {
      type: String,
      default: 'cell'
    },
    index: Number
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    handleDrag (ev) {
      let {top, left} = this.$el.getBoundingClientRect()
      let offsetInfo = {
        x: ev.clientX - left,
        y: ev.clientY - top
      }
      ev.dataTransfer.setData('type', this.type)
      ev.dataTransfer.setData('index', this.index)
      ev.dataTransfer.setData('behavior', 'moveNode')
      ev.dataTransfer.setData('offsetInfo', JSON.stringify(offsetInfo))
    },
    handleClick () {
      EventBus.$emit('changeNode', this.index)
    },
    handleRemoveNode () {
      EventBus.$emit('removeNode', this.index)
    },
    handleSelectNode (index, node) {
      this.active = this.index === index
    }
  },
  mounted () {
    EventBus.$on('selectNode', this.handleSelectNode)
  }
}
</script>

<style scoped>
.wrapper{
  position: absolute;
  cursor: pointer;
  display: inline-block;
}
.wrapper:hover{
  outline: 2px solid #409EFF;
}
.delete-icon{
  width: 16px;
  height: 16px;
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #409EFF;
  border-radius: 50%;
  text-align: center;
  line-height: 12px;
  color: #ffffff;
}
.active{
  outline: 2px solid #409EFF;
}
</style>
