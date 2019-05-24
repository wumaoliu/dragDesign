<script>
import {components, configs} from './repository'
import RenderDom from '@/utils/renderDom'
import EventBus from '@/utils/eventBus'
import {px2mm} from '@/utils/utils'

let renderDom

export default {
  name: 'componentViewer',
  components,
  render (h) {
    if (!renderDom) renderDom = new RenderDom(h, this.isDesign)
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
    return mainViewer
  },
  props: {
    isDesign: {
      type: Boolean,
      default: true
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
      if (!this.isDesign) return
      let {top, left} = this.$el.getBoundingClientRect()
      let type = ev.dataTransfer.getData('type')
      let index = ev.dataTransfer.getData('index')
      let behavior = ev.dataTransfer.getData('behavior')
      let offsetInfo = {x: 0, y: 0}
      if (behavior === 'moveNode') offsetInfo = JSON.parse(ev.dataTransfer.getData('offsetInfo'))
      let coordinate = {
        x: px2mm(ev.clientX - left - offsetInfo.x),
        y: px2mm(ev.clientY - top - offsetInfo.y)
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
            ...initStyle
          },
          coordinate
        }
        this.handleCreateNode(newNode)
      } else {
        this.handleUpdateNode(index, 'coordinate', coordinate)
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
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
