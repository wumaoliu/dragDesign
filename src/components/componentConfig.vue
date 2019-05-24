<script>
import {
  Input,
  InputNumber
} from 'element-ui'
import {configs} from './repository'
import EventBus from '@/utils/eventBus'

const components = {
  input: Input,
  number: InputNumber
}

const renderCollapseItem = (collapseItem, vm) => {
  let h = vm.$createElement
  let key = Object.keys(collapseItem)[0]
  let title = Object.values(collapseItem)[0]
  if (!vm[`${key}Options`].length) return null
  let form = h(
    'el-form',
    {
      props: {
        inline: true,
        labelWidth: '100px',
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
      [
        h(
          components[item.type],
          {
            props: {
              value: vm[`${key}Model`][item.key]
            },
            on: {
              input: (val) => {
                vm[`${key}Model`][item.key] = val
              }
            }
          }
        )
      ]
    ))
  )
  return h(
    'el-collapse-item',
    {
      props: {
        title
      }
    },
    [form]
  )
}

export default {
  name: 'componentConfig',
  render (h) {
    let vm = this
    let collapseItems = [
      {prop: '属性'},
      {style: '样式'},
      {coordinate: '坐标'}
    ]
    collapseItems = collapseItems.map(item => renderCollapseItem(item, vm))
    return h(
      'el-collapse',
      {
        class: {
          config: true
        }
      },
      collapseItems
    )
  },
  data () {
    return {
      index: '',
      propOptions: [],
      styleOptions: [],
      coordinateOptions: [],
      propModel: {},
      styleModel: {},
      coordinateModel: {}
    }
  },
  methods: {
    handleSelectNode (index, node) {
      if (node) {
        this.index = node.$index
        this.propModel = node.props
        this.styleModel = node.style
        this.coordinateModel = node.coordinate
        this.propOptions = configs[node.type].props
        this.styleOptions = configs[node.type].style
        this.coordinateOptions = configs[node.type].coordinate
      }
    }
  },
  mounted () {
    EventBus.$on('selectNode', this.handleSelectNode)
  }
}
</script>

<style scoped>
.config{
  width: 300px;
}
</style>
