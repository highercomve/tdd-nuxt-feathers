<template>
  <div>
    <nav class="navbar ">
      <div class="navbar-brand">
        <a class="navbar-item">
          <Logo />
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item">
            <nuxt-link class="navbar-link" to="/">Lobby</nuxt-link>
            <nuxt-link class="navbar-link" to="/about">About</nuxt-link>
            <nuxt-link class="navbar-link" to="/login">Login</nuxt-link>
          </div>
        </div>
      </div>
    </nav>
    <h1 class="title is-1">{{ title }}</h1>
    <p>This was rendered by the {{ renderer }}, and you are login as
      <username />
    </p>
    <hr>
  </div>
</template>
<style>
.navbar {
  height: 40px;
}
</style>

<script>
import Logo from '~/components/Logo.vue'
import Username from '~/components/Username.vue'

export default {
  components: {
    Logo,
    Username
  },
  props: ['title', 'renderer'],
}
</script>
