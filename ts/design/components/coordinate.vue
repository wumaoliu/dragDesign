<template>
  <div
    class="coordinate"
    :style="coordinateStyle"
  >
    <div
      v-show="isDesign"
      class="borderline-wrapper"
      :style="{
        width: `${borderline.x + 3}px`,
        height: `${borderline.y + 3}px`
      }"
    >
      <div
        class="borderline bottom-borderline"
        :style="{
          top: `${borderline.y}px`
        }"
        @mousedown="(ev) => handleMouseDown(ev, ['y'])"
      ></div>
      <div
        class="borderline right-borderline"
        :style="{
          left: `${borderline.x}px`
        }"
        @mousedown="(ev) => handleMouseDown(ev, ['x'])"
      ></div>
      <div
        class="br-borderline"
        :style="{
          top: `${borderline.y}px`,
          left: `${borderline.x}px`
        }"
        @mousedown="(ev) => handleMouseDown(ev, ['x', 'y'])"
      ></div>
    </div>
    <div class="y-axis" v-show="isDesign">
      <span
        v-for="(item, idx) in markY"
        v-text="item"
        :key="idx"
        :style="{
          top: `${40 + 16 + idx * 50}px`
        }"
      ></span>
    </div>
    <div class="right-wrapper">
      <div class="x-axis" v-show="isDesign">
        <span
          v-for="(item, idx) in markX"
          v-text="item"
          :key="idx"
          :style="{
            left: `${40 + idx * 50}px`
          }"
        ></span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {LIMIT, INIT, px2mm, mm2px, calcPosition} from '../utils/utils'
import EventBus from '../utils/eventBus'

export default {
  name: 'coordinate',
  props: {
    limitX: {
      type: Number,
      default: INIT.x
    },
    limitY: {
      type: Number,
      default: INIT.y
    },
    isDesign: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      markX: this.initMark(LIMIT.maxX),
      markY: this.initMark(LIMIT.maxY),
      coordinateStyle: {
        width: `${this.limitX * 5 + (this.isDesign ? 17 : 0)}px`,
        height: `${this.limitY * 5 + (this.isDesign ? 17 : 0)}px`,
        borderTopWidth: this.isDesign ? 0 : '1px',
        borderLeftWidth: this.isDesign ? 0 : '1px'
      },
      borderline: {
        x: this.limitX * 5 + (this.isDesign ? 17 : 0) - 3,
        y: this.limitY * 5 + (this.isDesign ? 17 : 0) - 3
      },
      clientRect: {}
    }
  },
  methods: {
    initMark (limit) {
      return new Array(Math.ceil(limit / 10)).fill(0).map((item, idx) => (idx + 1) * 10)
    },
    changeCoordinateStyle ({limitX, limitY}) {
      let {isDesign} = this
      this.coordinateStyle = {
        width: `${limitX * 5 + (isDesign ? 17 : 0)}px`,
        height: `${limitY * 5 + (isDesign ? 17 : 0)}px`,
        borderTopWidth: isDesign ? 0 : '1px',
        borderLeftWidth: isDesign ? 0 : '1px'
      }
      this.borderline = {
        x: limitX * 5 + (isDesign ? 17 : 0) - 3,
        y: limitY * 5 + (isDesign ? 17 : 0) - 3
      }
    },
    handleMouseDown (ev, type) {
      let {top, left} = this.$el.getBoundingClientRect()
      this.clientRect = {
        top,
        left,
        type
      }
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handlemouseUp)
    },
    handleMouseMove (ev) {
      let {top, left, type} = this.clientRect
      let offset = {}
      if (type.includes('x')) offset.x = ev.clientX - left + 2
      if (type.includes('y')) offset.y = ev.clientY - top + 2
      let {x, y} = {
        ...this.borderline,
        ...offset
      }
      this.borderline = {
        x: calcPosition(x, [(+mm2px(LIMIT.minX) + 15), (+mm2px(LIMIT.maxX) + 15)]),
        y: calcPosition(y, [(+mm2px(LIMIT.minY) + 15), (+mm2px(LIMIT.maxY) + 15)])
      }
    },
    handlemouseUp (ev) {
      let {x, y} = this.borderline
      let newLimit = {
        limitX: px2mm(x + 2 - (this.isDesign ? 17 : 0)),
        limitY: px2mm(y + 2 - (this.isDesign ? 17 : 0))
      }
      EventBus.$emit('changeCoordinate', newLimit)
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handlemouseUp)
    }
  },
  mounted () {
    EventBus.$on('changeCoordinate', this.changeCoordinateStyle)
  }
}
</script>

<style lang="less" scoped>
.coordinate{
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid #000000;
  overflow: visible;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
.borderline-wrapper{
  position: absolute;
  border: 1px dashed #000000;
}
.borderline{
  position: absolute;
  z-index: 10;
}
.bottom-borderline{
  width: 100%;
  height: 3px;
  cursor: n-resize;
}
.right-borderline{
  height: 100%;
  width: 3px;
  cursor: w-resize;
}
.br-borderline{
  position: absolute;
  width: 3px;
  height: 3px;
  z-index: 11;
  cursor: move;
}
.y-axis{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC) repeat-y; /*./image/ruler_v.png*/
  background-position-y: 16px;
  padding-top: 16px;
  border-top: 1px solid #000000;
  border-right: 1px solid #000000;
  overflow: hidden;
  & span{
    position: absolute;
    width: 20px;
    transform: scale(0.75) rotateZ(270deg);
  }
}
.right-wrapper{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.x-axis{
  display: flex;
  position: relative;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC) repeat-x;/*./image/ruler_h.png*/
  background-position-x: -1px;
  & span{
    position: absolute;
    width: 20px;
    transform: scale(0.75);
  }
}
.content{
  flex: 1;
  overflow: hidden;
}
</style>
