<script>
import {
  Input,
  InputNumber,
  Select,
  ColorPicker
} from 'element-ui'
import {LIMIT, INIT} from '../utils/utils'
import {configs} from './repository'
import EventBus from '../utils/eventBus'

const components = {
  input: Input,
  number: InputNumber,
  select: Select,
  colorPicker: ColorPicker
}

const keyConfig = {
  key: 'key',
  label: '字段',
  type: 'input',
  init: ''
}

const renderComponent = (item, key, vm) => {
  let h = vm.$createElement
  let options = null
  let props = {
    value: vm[`${key}Model`][item.key],
    ...(item.props || {})
  }
  let on = {
    input: (val) => {
      vm[`${key}Model`][item.key] = val
      item.on && item.on.input && item.on.input(...arguments)
    }
  }
  if (item.type === 'select') {
    options = (item.options || []).map(item => h(
      'el-option',
      {
        props: {
          ...item
        }
      }
    ))
  }
  return h(
    components[item.type],
    {
      style: {
        maxWidth: '130px',
        width: '100%'
      },
      props,
      on
    },
    options
  )
}

const renderCollapseItem = (collapseItem, vm) => {
  let h = vm.$createElement
  let [key, title] = Object.entries(collapseItem)[0]
  if (!vm[`${key}Options`].length) return null
  let form = h(
    'el-form',
    {
      class: {
        'form': true
      },
      props: {
        inline: true,
        labelPosition: 'left',
        model: vm[`${key}Model`]
      }
    },
    vm[`${key}Options`].map(item => h(
      'el-form-item',
      {
        props: {
          label: item.label,
          prop: item.key
        }
      },
      [renderComponent(item, key, vm)]
    ))
  )
  return h(
    'el-collapse-item',
    {
      scopedSlots: {
        title: () => h(
          'div',
          {
            class: {
              'title': true
            }
          },
          title
        )
      }
    },
    [form]
  )
}

export default {
  name: 'componentConfig',
  render (h) {
    let vm = this
    let collapseItems = this.isDesign ? [
      {pane: '面板'},
      {prop: '属性'},
      {style: '样式'}
    ] : []
    collapseItems = collapseItems.map(item => renderCollapseItem(item, vm))
    return h(
      'el-collapse',
      {
        class: {
          config: true
        },
        props: {
          accordion: true
        }
      },
      collapseItems
    )
  },
  props: {
    isDesign: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      index: '',
      propOptions: [],
      styleOptions: [],
      propModel: {},
      styleModel: {},
      paneOptions: [
        {
          key: 'limitX',
          label: '宽度（mm）',
          type: 'number',
          props: {
            min: LIMIT.minX,
            max: LIMIT.maxX
          },
          on: {
            input: this.emitChange
          }
        },
        {
          key: 'limitY',
          label: '高度（mm）',
          type: 'number',
          props: {
            min: LIMIT.minY,
            max: LIMIT.maxY
          },
          on: {
            input: this.emitChange
          }
        }
      ],
      paneModel: {
        limitX: INIT.x,
        limitY: INIT.y
      }
    }
  },
  methods: {
    handleSelectNode (index, node) {
      if (node) {
        // 是否标签元素
        let isPresetTag = node.dataSource === 'preset' && node.key !== 'priceMaker'
        // 是否通用字段元素
        let isCustomTag = node.dataSource === 'remote' && node.commonTag
        let defaultPropOptions = configs[node.type].props
        this.index = node.$index
        this.styleModel = node.style
        this.styleOptions = configs[node.type].style
        this.propModel = node.props
        this.propOptions = isPresetTag ? defaultPropOptions : (isCustomTag ? defaultPropOptions.concat(keyConfig) : [])
      }
    },
    handleChangeCoordinate ({limitX, limitY}) {
      this.paneModel = {
        limitX: +limitX,
        limitY: +limitY
      }
    },
    emitChange () {
      EventBus.$emit('changeCoordinate', this.paneModel)
    }
  },
  mounted () {
    EventBus.$on('selectNode', this.handleSelectNode)
    EventBus.$on('changeCoordinate', this.handleChangeCoordinate)
  }
}
</script>

<style lang="less" scoped>
.config{
  width: 140px;
  border-bottom: none;
  & .title{
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
  }
  & .form{
    padding-left: 10px;
  }
}
</style>
