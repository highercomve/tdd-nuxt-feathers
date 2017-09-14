<template>
  <div class="component">
      Your component created with unicorn CLI
  </div>
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
  props: ['']
}
</script>
<style src="./styles.scss"></style>
