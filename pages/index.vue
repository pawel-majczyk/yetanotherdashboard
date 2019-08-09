<template>
  <div class="container">
    <div>
      <a-row type="flex" justify="center" align="middle">
        <h1 class="title">
          Yet Another Dashboard
        </h1>
        <h2 class="subtitle">
          simple dashboard prototype
        </h2>
      </a-row>
      <Login v-if="!isLogged" @logged="handleLogin" />
      <router-link v-else to="dashboard">
        <a-button type="default" size="large"
          >Logged in! Go to dashboard already!</a-button
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Login from '~/components/Login.vue'

export default {
  components: {
    Login
  },
  computed: {
    isLogged() {
      return this.$store.state.login.userLogged
    }
  },
  methods: {
    ...mapMutations({ logUserIn: 'login/logUserIn' }),
    handleLogin(payload) {
      if (payload.validateStatus === 'success') {
        this.logUserIn()
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
