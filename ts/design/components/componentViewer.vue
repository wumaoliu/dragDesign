<script>
import {components, configs} from './repository'
import RenderDom from '../utils/renderDom'
import EventBus from '../utils/eventBus'
import {px2mm, mm2px, size2number, getUnitKeys, INIT} from '../utils/utils'
import {
  isEmpty
} from '@/utils/utils'

let renderDom

export default {
  name: 'componentViewer',
  components,
  render (h) {
    if (!renderDom) renderDom = new RenderDom(h, this.isDesign)
    let on = this.isDesign ? {
      dragover: this.handleDragover,
      drop: this.handleDrop
    } : {}
    let mainViewer = h(
      'div',
      {
        class: {
          'main-viewer': true
        },
        on
      },
      renderDom.render(this.nodeList)
    )
    setTimeout(() => {
      this.$emit('node-change', this.nodeList)
      // 重新render后emit wrapper 对应事件更新取拖拽限制范围
      EventBus.$emit('changeCoordinate', {limitX: this.limitX, limitY: this.limitY})
      // EventBus.$emit('afterRender', this.nodeList) // componentTree 事件
    }, 0)
    return mainViewer
  },
  props: {
    isDesign: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 20
    },
    value: {
      type: Array,
      default: () => ([])
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.nodeList = val.map(node => {
          let {type, style} = node
          let styleConfig = configs[type].style
          let mmKey = getUnitKeys(styleConfig, ['mm'])
          let pxKey = getUnitKeys(styleConfig, ['px'])
          Object.keys(style).map(key => {
            if (mmKey.includes(key)) {
              style[key] = size2number(style[key])
            } else if (pxKey.includes(key)) {
              style[key] = mm2px(size2number(style[key]))
            }
          })
          return {
            ...node,
            type: 'cell',
            props: {
              value: node.name,
              key: node.key
            }
          }
        })
      }
    }
  },
  data () {
    return {
      limitX: INIT.x,
      limitY: INIT.y,
      nodeList: [],
      activeIndex: '',
      priceMaker: ''
    }
  },
  methods: {
    handleDragover (ev) {
      // 阻止dragover默认行为，保证drop事件触发
      ev.preventDefault()
    },
    handleDrop (ev) {
      if (this.nodeList.length >= this.limit) return this.$message.warning(`元素个数大于限制数量`)
      let {top, left} = this.$el.getBoundingClientRect()
      let {type, behavior, sourceData} = JSON.parse(ev.dataTransfer.getData('info'))
      let coordinate = {
        left: px2mm(ev.clientX - left),
        top: px2mm(ev.clientY - top)
      }
      if (behavior === 'createNode') {
        let initProps = {}
        let initStyle = {
          position: 'absolute'
        }
        configs[type].props.map(item => {
          if (!isEmpty(item.init)) initProps[item.key] = item.init
        })
        configs[type].style.map(item => {
          if (!isEmpty(item.init)) initStyle[item.key] = item.init
        })
        let newNode = {
          type: type,
          key: sourceData.key || '',
          name: sourceData.value || sourceData.label,
          dataSource: sourceData.type, // remote preset
          commonTag: !!sourceData.commonTag, // 是否自定义通用标签
          props: {
            ...initProps,
            // value: sourceData.value || sourceData.label
            // 物价员项默认取priceMaker
            value: sourceData.key === 'priceMaker' ? this.priceMaker : (sourceData.value || sourceData.label)
          },
          style: {
            ...initStyle,
            ...coordinate
          }
        }
        this.handleCreateNode(newNode)
      }
    },
    handleCreateNode (node) {
      this.nodeList.push(node)
      setTimeout(() => {
        this.handleChangeNode(this.nodeList.length - 1)
      }, 0)
    },
    handleUpdateNode (index, key, value) {
      if (this.nodeList[index]) {
        this.nodeList[index][key] = {
          ...this.nodeList[index][key],
          ...value
        }
        this.emitRender()
        setTimeout(() => {
          this.handleChangeNode(+index)
        }, 0)
      }
    },
    handleRemoveNode (index) {
      this.nodeList.splice(index, 1)
      this.handleChangeNode()
    },
    handleChangeNode (index) {
      this.activeIndex = index
      let selectNode = this.nodeList[index]
      selectNode && EventBus.$emit('selectNode', index, selectNode)
    },
    handleKeyboardEvent (ev) {
      // 删除节点
      if (!isEmpty(this.activeIndex)) {
        let {width, height} = this.$refs[this.activeIndex].$el.getBoundingClientRect()
        let h = px2mm(height)
        let w = px2mm(width)
        let {top, left} = this.nodeList[this.activeIndex].style
        switch (ev.keyCode) {
          case 37:
            this.handleUpdateNode(this.activeIndex, 'style', {
              left: Math.max(Math.ceil(left - 1), 0)
            })
            break
          case 38:
            this.handleUpdateNode(this.activeIndex, 'style', {
              top: Math.max(Math.ceil(top - 1), 0)
            })
            break
          case 39:
            this.handleUpdateNode(this.activeIndex, 'style', {
              left: Math.min(Math.floor(left + 1), this.limitX - w)
            })
            break
          case 40:
            this.handleUpdateNode(this.activeIndex, 'style', {
              top: Math.min(Math.floor(top + 1), this.limitY - h)
            })
            break
        }
      }
    },
    handleChangeCoordinate ({limitX, limitY}) {
      this.limitX = limitX
      this.limitY = limitY
    },
    emitRender () {
      this.nodeList = [...this.nodeList]
    },
    // 业务逻辑 物价员取模板定义中priceMaker
    setPriceMaker (val) {
      this.priceMaker = val
      this.nodeList.map(node => {
        if (node.key === 'priceMaker') {
          node.name = val
          node.props = {
            ...node.props,
            value: val
          }
        }
      })
    }
  },
  mounted () {
    EventBus.$on('removeNode', this.handleRemoveNode)
    EventBus.$on('changeNode', this.handleChangeNode)
    EventBus.$on('updateNode', this.handleUpdateNode)
    EventBus.$on('changeCoordinate', this.handleChangeCoordinate)
    document.addEventListener('keydown', this.handleKeyboardEvent)
  },
  beforeDestroy () {
    renderDom = null
    document.removeEventListener('keydown', this.handleKeyboardEvent)
  }
}
</script>

<style lang="less" scoped>
.main-viewer{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
