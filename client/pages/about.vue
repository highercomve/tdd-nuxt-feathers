<template>
  <section class="container">
    <TopHeader title="About" v-bind:renderer="renderer" />
  </section>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'

export default {
  components: {
    TopHeader
  },
  asyncData ({ req }) {
    return {
      renderer: req ? 'server' : 'client',
    }
  }
}
</script>
