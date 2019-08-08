<template>
  <div>
    <a-row type="flex" justify="center" align="middle" class="login-panel">
      <a-col span="8">
        <a-row type="flex" justify="center" align="middle">
          <h1>Login</h1>
        </a-row>
        <a-row type="flex" justify="center" align="middle">
          <a-form :form="form" @submit="checkCredentials">
            <a-form-item>
              <a-input
                v-model="providedUsername"
                placeholder="Username"
              ></a-input>
              <a-input
                v-model="providedPassword"
                placeholder="Password"
                type="password"
                >password
              </a-input>
            </a-form-item>
            <a-row type="flex" justify="space-between" align="middle">
              <a
                href="#"
                title="Click to get your login data reminded"
                class="remindPassword"
                @click="remindPassword"
              >
                Password forgotten
              </a>
              <a-button type="primary" icon="unlock" size="large"
                >Login</a-button
              >
            </a-row>
          </a-form>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this),
      providedUsername: '',
      providedPassword: '',
      validUsername: 'admin@admin.com',
      validPassword: 'admin'
    }
  },
  computed: {
    validData() {
      return `user: "${this.validUsername}" | password: "${this.validPassword}"`
    }
  },
  methods: {
    remindPassword(e) {
      e.preventDefault()
      alert(this.validData)
    },
    validateLoginName() {},
    checkCredentials() {}
  }
}
</script>

<style scoped>
.login-panel {
  background: #eee;
  padding: 2em 0;
}
</style>
