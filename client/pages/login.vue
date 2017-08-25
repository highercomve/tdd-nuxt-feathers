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
            <button class="button is-success">
              Login
            </button>
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import TopHeader from '~/components/TopHeader.vue'

export default {
  components: {
    TopHeader
  },
  data: () => {
    return {
      email: '',
      password: '',
      error: null,
      message: null
    }
  },
  methods: {
    create () {
      this.$store.dispatch('users/authenticate', { email: this.email, password: this.password })
      .then(() => {
        this.email = ''
        this.password = ''
        this.$router.go('/')
      })
      .catch(error => {
        console.log(error)
        if (!!error && !!error.data && !!error.data.message) {
          this.error = error.data.message                    
        } else {
          this.error = error          
        }
      })
    }
  },
  asyncData ({ req }) {
    return {
      renderer: req ? 'server' : 'client',
    }
  }
}
</script>
