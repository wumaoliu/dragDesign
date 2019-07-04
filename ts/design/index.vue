<template>
  <div class="design">
    <component-banner></component-banner>
    <coordinate
      class="coordinate"
      :is-design="isDesign"
    >
      <component-viewer
        v-bind="$attrs"
        v-on="$listeners"
        :is-design="isDesign"
        ref="viewer"
      ></component-viewer>
    </coordinate>
    <component-config
      :is-design="isDesign"
    ></component-config>
    <!-- <component-tree></component-tree> -->
  </div>
</template>

<script>
import componentBanner from './components/componentBanner'
import componentViewer from './components/componentViewer'
import componentConfig from './components/componentConfig'
import componentTree from './components/componentTree'
import coordinate from './components/coordinate'
import EventBus from './utils/eventBus'
import {INIT, getUnitKeys, px2mm} from './utils/utils'
import {configs} from './components/repository'
import {deepCopy} from '@/utils/utils'

export default {
  name: 'design',
  components: {
    componentBanner,
    componentViewer,
    componentConfig,
    componentTree,
    coordinate
  },
  props: {
    isDesign: {
      type: Boolean,
      default: true
    },
    wrapper: {
      type: Object,
      default: () => ({
        width: `${INIT.x}mm`,
        height: `${INIT.y}mm`,
        position: 'relative'
      })
    }
  },
  watch: {
    wrapper: {
      immediate: true,
      handler (val) {
        let {width, height} = val
        let limit = {
          limitX: parseInt(width),
          limitY: parseInt(height)
        }
        EventBus.$emit('changeCoordinate', limit)
      }
    }
  },
  data () {
    return {
      limit: {
        limitX: INIT.x,
        limitY: INIT.y
      }
    }
  },
  methods: {
    getTemplateData () {
      let nodeList = deepCopy(this.$refs.viewer.nodeList)
      return nodeList.map(node => {
        let {type, style, props: {value, key}} = node
        let styleConfig = configs[type].style
        let mmKey = getUnitKeys(styleConfig, ['mm'])
        let pxKey = getUnitKeys(styleConfig, ['px'])
        // 样式数据处理，模板中定义1mm对应5px，非物理意义上1mm，所以须保证输出模板尺寸单位为mm
        Object.keys(style).map(key => {
          if (mmKey.includes(key)) {
            style[key] = `${style[key]}mm`
          } else if (pxKey.includes(key)) {
            style[key] = `${px2mm(style[key])}mm`
          }
        })
        node = {
          ...node,
          name: value,
          key: node.key || key || ''
        }
        // 精简JSON
        delete node.props
        delete node.$index
        return node
      })
    },
    getStyleData () {
      return {
        width: `${this.limit.limitX}mm`,
        height: `${this.limit.limitY}mm`,
        position: 'relative'
      }
    },
    setLimit (limit) {
      this.limit = limit
    }
  },
  mounted () {
    EventBus.$on('changeCoordinate', this.setLimit)
  }
}
</script>

<style lang="less" scoped>
.design{
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
