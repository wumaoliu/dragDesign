<script>
import {components} from './repository'
import RenderDom from '@/utils/renderDom'

let renderDom

export default {
  name: 'componentViewer',
  components,
  render (h) {
    if (!renderDom) renderDom = new RenderDom(h, this.state)
    console.log(renderDom.render(this.nodeList))
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
    state: {
      type: String,
      default: 'design'
    }
  },
  data () {
    return {
      nodeList: require('@/mock/nodeList'),
      newNodeType: ''
    }
  },
  methods: {
    handleDragover (ev) {
      // 阻止dragover默认行为，保证drop事件触发
      ev.preventDefault()
    },
    handleDrop (ev) {
      this.newNodeType = ev.dataTransfer.getData('type')
      this.nodeList.push({
        type: this.newNodeType,
        props: {},
        style: {}
      })
    }
  }
}
</script>

<style scoped>
.main-viewer{
  width: 100%;
  height: 600px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}
</style>
