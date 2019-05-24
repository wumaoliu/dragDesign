<template>
  <div
    class="coordinate"
    :style="coordinateStyle"
  >
    <div class="y-axis">
      <span
        v-for="(item, idx) in markY"
        v-text="item"
        :key="idx"
      ></span>
    </div>
    <div class="right-wrapper">
      <div class="x-axis">
        <span
          v-for="(item, idx) in markX"
          v-text="item"
          :key="idx"
        ></span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'coordinate',
  props: {
    limitX: {
      type: Number,
      default: 150
    },
    limitY: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      markX: this.initMark(this.limitX),
      markY: this.initMark(this.limitY),
      coordinateStyle: {
        width: `${this.limitX * 5 + 17}px`,
        height: `${this.limitY * 5 + 17}px`
      }
    }
  },
  methods: {
    initMark (limit) {
      return new Array(Math.ceil(limit / 10)).fill(0).map((item, idx) => (idx + 1) * 10)
    }
  }
}
</script>

<style scoped>
.coordinate{
  display: flex;
  flex-direction: row;
  position: relative;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
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
}
.y-axis span{
  margin-top: 30px;
  transform: scale(0.75) rotateZ(270deg);
  width: 20px;
  margin-top: 40px;
  margin-bottom: -11px;
  margin-left: -2px;
}
.right-wrapper{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.x-axis{
  display: flex;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC) repeat-x;/*./image/ruler_h.png*/
  background-position-x: -1px;
}
.x-axis span{
  transform: scale(0.75);
  margin-left: 40px;
  margin-right: -10px;
  margin-top: -2px;
  width: 20px;
}
.content{
  flex: 1;
}
</style>
