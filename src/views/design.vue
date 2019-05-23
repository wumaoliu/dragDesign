<template>
  <div class="test">
    <component-banner></component-banner>
    <component-viewer></component-viewer>
    <component-config></component-config>
  </div>
</template>

<script>
import componentBanner from '@/components/componentBanner'
import componentViewer from '@/components/componentViewer'
import componentConfig from '@/components/componentConfig'

export default {
  name: 'design',
  components: {
    componentBanner,
    componentViewer,
    componentConfig
  }
}
</script>

<style scoped>
.test{
  position: relative;
  padding: 20px;
  margin: 20px
}
</style>
