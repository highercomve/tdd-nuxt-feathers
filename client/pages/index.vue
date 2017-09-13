<template>
  <section class="container">
    <TopHeader title="Lobby" v-bind:renderer="renderer" />
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
    /*
      On pages you can wait for fecth and action
      Example:

      return store.dispatch('messages/fetchAll') // this must be aa action that return a promise
    */
  },
  asyncData ({ req }) {
    return {
      renderer: req ? 'server' : 'client',
    }
  }
}
</script>
