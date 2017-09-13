<template>
  <div class="container">
    <TopHeader title="Login" v-bind:renderer="renderer" />
    <section class="column is-half">
      <p v-if="error" class="help is-danger">
        {{error}}
      </p>
      <form v-on:submit.prevent="create" >
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input name="email" v-model="email" class="input" type="email" placeholder="Email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input name="password" v-model="password" class="input" type="password" placeholder="Password">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success">Login</button>
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'

function mapValueToStore (obj, field) {
  obj[field] = {
    get () { return this.$store.state.auth.loginData[field]; },
    set (value) { return this.$store.commit('auth/setLoginData', { [field]: value }); }
  }
  return obj;
}

export default {
  components: {
    TopHeader
  },
  computed: {
    ...['email', 'password', 'error', 'loading'].reduce(mapValueToStore, {})
  },
  methods: {
    create () {
      this.$store.dispatch('auth/authenticate');
    }
  },
  asyncData ({ req }) {
    return {
      renderer: req ? 'server' : 'client',
    }
  }
}
</script>
