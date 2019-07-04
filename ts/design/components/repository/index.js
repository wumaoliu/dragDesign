// 引入组件
import Cell from './cell'
import Card from './card'

// 引入配置
import configForCell from './cell/config'
import configForCard from './card/config'

const components = {
  cell: Cell,
  card: Card
}

const configs = {
  cell: configForCell,
  card: configForCard
}

export {
  components,
  configs
}
