<script>
import {components, configs} from './repository'
import RenderDom from '@/utils/renderDom'
import EventBus from '@/utils/eventBus'

let renderDom

export default {
  name: 'componentViewer',
  components,
  render (h) {
    if (!renderDom) renderDom = new RenderDom(h, this.state)
    let mainViewer = h(
      'div',
      {
        class: {
          'main-viewer': true
        },
        on: {
          dragover: this.handleDragover,
          drop: this.handleDrop
        }
      },
      renderDom.render(this.nodeList)
    )
    let topBar = h(
      'div',
      {
        class: {
          'top-bar': this.state === 'design'
        }
      }
    )
    return h(
      'div',
      {
        class: {
          'side-bar': this.state === 'design'
        }
      },
      [topBar, mainViewer]
    )
  },
  props: {
    state: {
      type: String,
      default: 'design'
    }
  },
  data () {
    return {
      nodeList: require('@/mock/nodeList'),
      activeIndex: ''
    }
  },
  methods: {
    handleDragover (ev) {
      // 阻止dragover默认行为，保证drop事件触发
      ev.preventDefault()
    },
    handleDrop (ev) {
      let {top, left} = this.$el.getBoundingClientRect()
      let type = ev.dataTransfer.getData('type')
      let index = ev.dataTransfer.getData('index')
      let behavior = ev.dataTransfer.getData('behavior')
      let offsetInfo = {x: 0, y: 0}
      if (behavior === 'moveNode') offsetInfo = JSON.parse(ev.dataTransfer.getData('offsetInfo'))
      let positionStyle = {
        top: `${ev.clientY - top - offsetInfo.y}px`,
        left: `${ev.clientX - left - offsetInfo.x}px`
      }
      if (behavior === 'createNode') {
        let initProps = {}
        let initStyle = {}
        configs[type].props.map(item => {
          initProps[item.key] = item.init
        })
        configs[type].style.map(item => {
          initStyle[item.key] = item.init
        })
        let newNode = {
          type: type,
          props: initProps,
          style: {
            ...initStyle,
            ...positionStyle
          }
        }
        this.handleCreateNode(newNode)
      } else {
        this.handleUpdateNode(index, 'style', positionStyle)
      }
    },
    handleCreateNode (node) {
      this.nodeList.push(node)
      setTimeout(() => {
        this.handleChangeNode(this.nodeList.length - 1)
      }, 0)
    },
    handleUpdateNode (index, key, value) {
      this.nodeList[index][key] = {
        ...this.nodeList[index][key],
        ...value
      }
      this.emitRender()
      setTimeout(() => {
        this.handleChangeNode(+index)
      }, 0)
    },
    handleRemoveNode (index) {
      this.nodeList.splice(index, 1)
      this.handleChangeNode()
    },
    handleChangeNode (index) {
      this.activeIndex = index
      let selectNode = this.nodeList[index]
      EventBus.$emit('selectNode', index, selectNode)
    },
    emitRender () {
      this.nodeList = [...this.nodeList]
    }
  },
  mounted () {
    EventBus.$on('removeNode', this.handleRemoveNode)
    EventBus.$on('changeNode', this.handleChangeNode)
  }
}
</script>

<style scoped>
.main-viewer{
  width: 100%;
  height: 600px;
  overflow: hidden;
  position: relative;
}
.top-bar{
  position: relative;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC) repeat-x;/*./image/ruler_h.png*/
  background-position-x: -1px;
}
.side-bar{
  width: 749px;
  height: 517px;
  position: relative;
  margin-top: 20px;
  border: 1px solid #000000;
  border-top: none;
  border-left: none;
  padding-left: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC) repeat-y; /*./image/ruler_v.png*/
  background-position-y: 17px;
}
</style>
