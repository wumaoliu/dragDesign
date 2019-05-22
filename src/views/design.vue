<template>
  <div>
    <component-banner></component-banner>
    <component-viewer></component-viewer>
  </div>
</template>

<script>
import componentBanner from '@/components/componentBanner'
import componentViewer from '@/components/componentViewer'

export default {
  name: 'design',
  components: {
    componentBanner,
    componentViewer
  }
}
</script>
