<template>
  <div class="base-container container">
    <aCol :xs="24" :sm="22" :md="20" :lg="20" :xl="14" class="title">
      <h1 class="title__text">
        Yet Another Dashboard
      </h1>
      <h2 class="title__subtext">
        simple dashboard prototype
      </h2>
    </aCol>
    <aCol :xs="24" :sm="22" :md="20" :lg="20" :xl="14" class="login__container">
      <transition name="page" mode="out-in" @after-enter="focusForEnter">
        <LoginForm v-if="!isLogged" key="isLogged" @logged="handleLogin" />
        <router-link
          v-if="isLogged"
          ref="enter"
          key="isLogged"
          to="dashboard"
          class="login__enter-dashboard-btn"
        >
          <aButton
            type="default"
            size="large"
            class="login__enter-dashboard-btn"
          >
            Succesfully logged in! Go to dashboard
            <aIcon type="right" />
          </aButton>
        </router-link>
      </transition>
    </aCol>
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
        this.logUserIn(payload.name)
      }
    },
    focusForEnter() {
      this.$nextTick(() => this.$refs.enter.$el.focus())
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  flex-direction: column;
}

.title {
  background: peachpuff;
}

.title__text {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 4rem;
  color: #0a0a0a;
  letter-spacing: 1px;
}

.title__subtext {
  font-weight: 300;
  font-size: 2.25rem;
  color: #666;
  word-spacing: 5px;
  padding-bottom: 5px;
}

.links {
  padding-top: 15px;
}

.login__container {
  background: linear-gradient(#eee, #fff);
  min-height: 20em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.login__enter-dashboard-btn {
  width: fit-content;
  align-self: center;
}
</style>
