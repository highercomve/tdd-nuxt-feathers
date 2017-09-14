<template>
  <section>
    <p v-if="error" class="help is-danger">
      {{error}}
    </p>
    <form v-on:submit.prevent="create">
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
          <button type="submit" class="button is-success submit-form" v-bind:class="{ 'is-loading': loading }">Login</button>
        </p>
      </div>
    </form>
  </section>
</template>

<script>
function mapValueToStore (obj, field) {
  obj[field] = {
    get () {
      return (!!this.storeNamespace) ? 
        this.$store.state[this.storeNamespace].loginData[field] :
        this.$store.state.loginData[field]; 
    },
    set (value) { 
      const storeNamespace = (!!this.storeNamespace) ? `${this.storeNamespace}/` : '';
      return this.$store.commit(`${storeNamespace}setLoginData`, { [field]: value }); 
    }
  }
  return obj;
}

export default {
  props: {
    storeNamespace: {
      type: String
    },
    successCb: {
      type: Function,
      default: (r) => { return r }
    },
    errorCb: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    ...['email', 'password', 'error', 'loading'].reduce(mapValueToStore, {})
  },
  methods: {
    create () {
      const storeNamespace = (!!this.storeNamespace) ? `${this.storeNamespace}/` : '';
      return new Promise((resolve, reject) => {
        this.$store.dispatch(`${storeNamespace}authenticate`)
        .then((jwt) => this.$store.dispatch(`${storeNamespace}setJwtAndGetUser`, jwt))
        .then(this.successCb)
        .then(resolve)
        .catch((error) => {
          this.errorCb(error);
          resolve();
        });
      });
    }
  }
}

</script>

<style lang="scss">
  .input {
    display: block;
    padding: 1.5em 1em;
    width: 300px;
  }
</style>
