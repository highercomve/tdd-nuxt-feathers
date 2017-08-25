<template>
  <section class="container">
    <TopHeader title="Lobby" v-bind:renderer="renderer" />
    <Messages />
  </section>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'

export default {
  middleware: 'authenticated',
  components: {
    TopHeader
  },
  fetch ({ store, params }) {
    return store.dispatch('messages/fetchAll')
  },
  asyncData ({ req }) {
    return {
      renderer: req ? 'server' : 'client',
    }
  }
}
</script>
