<template>
  <div>
    <h1>Home</h1>
    <p>This was rendered by the {{ renderer }}</p>
    <nuxt-link to="/about">About</nuxt-link>
  </div>
</template>

<script>
export default {
  asyncData ({req}) {
    return {
      renderer: req ? 'server' : 'client',
    }
  }
}
</script>
