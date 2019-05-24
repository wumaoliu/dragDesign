<template>
  <div class="design">
    <component-banner></component-banner>
    <coordinate>
      <component-viewer></component-viewer>
    </coordinate>
    <component-config></component-config>
    <component-tree></component-tree>
  </div>
</template>

<script>
import componentBanner from '@/components/componentBanner'
import componentViewer from '@/components/componentViewer'
import componentConfig from '@/components/componentConfig'
import componentTree from '@/components/componentTree'
import coordinate from '@/components/coordinate'

export default {
  name: 'design',
  components: {
    componentBanner,
    componentViewer,
    componentConfig,
    componentTree,
    coordinate
  }
}
</script>

<style scoped>
.design{
  display: flex;
  justify-content: space-around;
}
</style>
