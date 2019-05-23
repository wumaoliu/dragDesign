<script>
import {
  Input
} from 'element-ui'
import {configs} from './repository'
import EventBus from '@/utils/eventBus'

const components = {
  input: Input
}

export default {
  name: 'componentConfig',
  render (h) {
    let propsPane = h(
      'el-form',
      {
        props: {
          inline: true,
          labelWidth: '100px',
          model: this.propsModel
        }
      },
      this.propOptions.map(item => h(
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
                value: this.propsModel[item.key]
              },
              on: {
                input: (val) => {
                  this.propsModel[item.key] = val
                }
              }
            }
          )
        ]
      ))
    )
    let stylePane = h(
      'el-form',
      {
        props: {
          inline: true,
          labelWidth: '100px',
          model: this.styleModel
        }
      },
      this.styleOptions.map(item => h(
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
                value: this.styleModel[item.key]
              },
              on: {
                input: (val) => {
                  this.styleModel[item.key] = val
                }
              }
            }
          )
        ]
      ))
    )
    let tab = h(
      'el-tabs',
      {
        class: {
          tab: true
        }
      },
      [propsPane, stylePane].map((item, idx) => h(
        'el-tab-pane',
        {
          props: {
            label: idx ? '样式' : '属性'
          }
        },
        [item]
      ))
    )
    return tab
  },
  data () {
    return {
      index: '',
      propOptions: [],
      styleOptions: [],
      propsModel: {},
      styleModel: {}
    }
  },
  methods: {
    handleSelectNode (index, node) {
      if (node) {
        this.index = node.$index
        this.propsModel = node.props
        this.styleModel = node.style
        this.propOptions = configs[node.type].props
        this.styleOptions = configs[node.type].style
      }
    }
  },
  mounted () {
    EventBus.$on('selectNode', this.handleSelectNode)
  }
}
</script>

<style scoped>
.tab{
  width: 500px;
}
</style>
