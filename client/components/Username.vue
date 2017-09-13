<template>
  <span class="user-email"> {{ email }}</span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    email: state => state.auth.user.email
  }),
}
</script>

