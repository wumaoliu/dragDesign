<template>
  <div
    class="wrapper"
    :class="{
      'active': active,
      'is-move': isMove
    }"
    :style="{
      top: `${y}px`,
      left: `${x}px`
    }"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <span
      v-show="active"
      class="delete-icon"
      @click="handleRemoveNode"
    >-</span>
    <span
      class="line line-x"
      :class="{'line-show': active}"
      :style="{width: `${x}px`}"
    ></span>
    <span
      class="line line-y"
      :class="{'line-show': active}"
      :style="{height: `${y}px`}"
    ></span>
    <slot></slot>
  </div>
</template>

<script>
import EventBus from '../utils/eventBus'
import {INIT, px2mm, mm2px, calcPosition} from '../utils/utils'

export default {
  name: 'wrapper',
  props: {
    type: {
      type: String,
      default: 'cell'
    },
    index: Number,
    position: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0
      })
    }
  },
  watch: {
    position: {
      immediate: true,
      handler (val) {
        this.x = val.x
        this.y = val.y
      }
    }
  },
  data () {
    return {
      x: 0,
      y: 0,
      active: false,
      offsetInfo: {},
      limitX: INIT.x,
      limitY: INIT.y,
      isMove: false
    }
  },
  methods: {
    handleMouseDown (ev) {
      let {top, left, width, height} = this.$el.getBoundingClientRect()
      this.active = true
      this.offsetInfo = {
        x: ev.clientX - left,
        y: ev.clientY - top,
        w: width,
        h: height
      }
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handlemouseUp)
    },
    handleMouseMove (ev) {
      // let {x, y, w, h} = this.offsetInfo
      let {x, y} = this.offsetInfo
      let {top, left} = this.$parent.$el.getBoundingClientRect()
      let position = {
        left: ev.clientX - left - x,
        top: ev.clientY - top - y
      }
      // this.x = calcPosition(position.left, [0, mm2px(this.limitX) - w - 2])
      // this.y = calcPosition(position.top, [0, mm2px(this.limitY) - h - 2])
      this.x = calcPosition(position.left, [0, mm2px(this.limitX) - 2])
      this.y = calcPosition(position.top, [0, mm2px(this.limitY) - 2])
      this.isMove = true
    },
    handlemouseUp () {
      this.active = false
      this.isMove = false
      EventBus.$emit('updateNode', this.index, 'style', {
        left: px2mm(this.x),
        top: px2mm(this.y)
      })
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handlemouseUp)
    },
    handleClick () {
      EventBus.$emit('changeNode', this.index)
    },
    handleRemoveNode () {
      EventBus.$emit('removeNode', this.index)
    },
    handleSelectNode (index, node) {
      this.active = this.index === index
    },
    handleChangeCoordinate ({limitX, limitY}) {
      this.limitX = limitX
      this.limitY = limitY
    }
  },
  mounted () {
    EventBus.$on('selectNode', this.handleSelectNode)
    EventBus.$on('changeCoordinate', this.handleChangeCoordinate)
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  position: absolute;
  cursor: pointer;
  display: inline-block;
  &:hover{
    outline: 1px dashed #000000;
    z-index: 2;
  }
  &.active{
    outline: 1px dashed #000000;
    z-index: 1;
  }
  &.is-move{
    z-index: 3
  }
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
</style>
