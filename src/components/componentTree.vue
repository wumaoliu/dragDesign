<template>
  <div>
    <span>节点列表</span>
    <el-tree
      :data="nodeTree"
      :props="props"
      :render-content="renderContent"
      @node-click="handleSelectNode"
    >
    </el-tree>
  </div>

</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  name: 'componentTree',
  data () {
    return {
      nodeTree: [],
      props: {
        children: 'children',
        label: 'type'
      }
    }
  },
  methods: {
    renderContent (h, {data}) {
      return h(
        'span',
        {},
        `${data.type} [${data.$index}]`
      )
    },
    handleRefreshTree (tree) {
      this.nodeTree = tree
    },
    handleSelectNode (node) {
      EventBus.$emit('selectNode', node.$index, node)
    }
  },
  mounted () {
    EventBus.$on('afterRender', this.handleRefreshTree)
  }
}
</script>
