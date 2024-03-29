<template>
  <div class="base-container container">
    <a-col :xs="24" :sm="22" :md="20" :lg="20" :xl="14" class="title">
      <h1 class="title__text">
        Yet Another Dashboard
      </h1>
      <h2 class="title__subtext">
        <q>
          <strong>
            The purpose of visualization is <em>insight</em>, not pictures.
          </strong>
        </q>
        <br />
        ―Ben Shneiderman
      </h2>
    </a-col>
    <a-col :xs="24" :sm="22" :md="20" :lg="20" :xl="14" class="login-view">
      <transition name="page" mode="out-in" @after-enter="focusForEnter">
        <LoginForm
          v-if="!isLogged"
          key="isLogged"
          :logging-status="loggingStatus"
          @loginAttempt="handleLoginAttempt"
        />
        <router-link
          v-if="isLogged"
          ref="enter"
          key="isLogged"
          to="dashboard"
          class="login-view__enter-dashboard-btn"
        >
          <a-Button
            type="default"
            size="large"
            class="login-view__enter-dashboard-btn"
          >
            Succesfully logged in! Go to dashboard
            <a-icon type="right" />
          </a-Button>
        </router-link>
      </transition>
    </a-col>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoginForm from '~/components/LoginForm.vue'

export default {
  components: {
    LoginForm
  },
  computed: {
    ...mapState('login', {
      loggingStatus: (state) => state.loggingStatus,
      isLogged: (state) => state.userLogged
    })
  },
  methods: {
    ...mapActions({ tryLoggingIn: 'login/tryLoggingIn' }),
    handleLoginAttempt(payload) {
      this.tryLoggingIn(payload)
    },
    focusForEnter() {
      this.$nextTick(() => this.$refs.enter.$el.focus())
    }
  }
}
</script>

<style>
.container {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  background: peachpuff;
}

.title__text {
  display: block;
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;
  font-size: 4rem;
  letter-spacing: 1px;
  color: #0a0a0a;
}

.title__subtext {
  padding-bottom: 5px;
  font-weight: 300;
  font-size: 1.25rem;
  word-spacing: 5px;
  color: #666;
  text-align: right;
  padding: 1em;
}

.links {
  padding-top: 15px;
}

.login-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 20em;
  background: linear-gradient(#eee, #fff);
}
.login-view__enter-dashboard-btn {
  align-self: center;
  width: fit-content;
}
</style>
