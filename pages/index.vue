<template>
  <div class="container">
    <a-col :xs="24" :sm="22" :md="20" :lg="20" :xl="14" class="title">
      <h1 class="title__text">
        Yet Another Dashboard
      </h1>
      <h2 class="title__subtext">
        simple dashboard prototype
      </h2>
    </a-col>
    <a-col
      :xs="24"
      :sm="22"
      :md="20"
      :lg="20"
      :xl="14"
      class="login__container"
    >
      <LoginForm v-if="!isLogged" @logged="handleLogin" />
      <router-link v-else to="dashboard">
        <a-button
          ref="enter"
          type="default"
          size="large"
          class="login__enter-dashboard-btn"
          >Succesfully logged in! Go to dashboard
          <a-icon type="right" />
        </a-button>
      </router-link>
    </a-col>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import LoginForm from '~/components/LoginForm.vue'

export default {
  components: {
    LoginForm
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
        this.$nextTick(() => this.$refs.enter.$el.focus())
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
  width: 100%;
  flex-direction: column;
}

.title {
  background: linear-gradient(#ee40df, #02062e);
  border: 0.25em solid #02062e;
  border-top: 0.25em solid #65faff;
  border-top-left-radius: 1.5em;
  border-top-right-radius: 1.5em;
  border-bottom: 0;
}

.title__text {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 4rem;
  color: #65faff;
  letter-spacing: 1px;
}

.title__subtext {
  font-weight: 300;
  font-size: 2.25rem;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 5px;
}

.links {
  padding-top: 15px;
}

.login__container {
  border: 0.25em solid #02062e;
  border-top: 0;
  background: #eee;
  min-height: 20em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.login__enter-dashboard-btn {
  margin: 4em auto;
}
</style>
