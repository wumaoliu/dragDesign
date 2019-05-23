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
    <span
      class="line line-x"
      :class="{'line-show': active}"
      :style="{width: positionX}"
    ></span>
    <span
      class="line line-y"
      :class="{'line-show': active}"
      :style="{height: positionY}"
    ></span>
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
    index: Number,
    positionX: [Number, String],
    positionY: [Number, String]
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
        // 补全top、left方向18px标尺
        x: ev.clientX - left + 18,
        y: ev.clientY - top + 18
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
  outline: 1px dashed #000000;
}
.delete-icon{
  width: 16px;
  height: 16px;
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #000000;
  border-radius: 50%;
  text-align: center;
  line-height: 12px;
  color: #ffffff;
}
.line{
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
}
.line-x{
  height: 1px;
  border-top: 1px dashed #000000;
  transform: rotateZ(180deg);
}
.line-y{
  width: 1px;
  border-left: 1px dashed #000000;
  transform: rotateZ(180deg);
}
.wrapper:hover .line{
  display: block;
}
.line.line-show{
  display: block;
}
.active{
  outline: 1px dashed #000000;
}
</style>
