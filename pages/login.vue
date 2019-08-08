<template>
  <div>
    <h1>Login</h1>
    <a-row type="flex" justify="center" align="middle">
      <a-form :form="form" @submit="checkCredentials">
        <a-form-item>
          <a-input v-model="providedUsername" placeholder="Username"></a-input>
          <a-input
            v-model="providedPassword"
            placeholder="Password"
            type="password"
            >password
          </a-input>
        </a-form-item>
        <a
          href="#"
          title="Click to get your login data reminded"
          class="remindPassword"
          @click="remindPassword"
        >
          Password forgotten
        </a>
        <a-button type="primary" icon="unlock" size="large">Login</a-button>
      </a-form>
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

<style scoped></style>
