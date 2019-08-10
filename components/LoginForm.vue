<template>
  <div>
    <a-row
      type="flex"
      justify="center"
      align="middle"
      class="login-form__panel"
    >
      <a-col :xs="20" :sm="12" :md="10">
        <a-row type="flex" justify="center" align="middle">
          <h1>Login</h1>
        </a-row>
        <a-row type="flex" justify="center" align="middle">
          <a-form :form="form" class="login-form" @submit="checkCredentials">
            <a-form-item
              :validate-status="login.validateStatus"
              :help="login.errorMsg || loginRule"
            >
              <a-input
                ref="loginInput"
                v-decorator="[
                  'login',
                  {
                    rules: [
                      {
                        validate: validateLoginName,
                        message: 'It has to be an e-mail address!'
                      }
                    ]
                  }
                ]"
                name="login"
                :disabled="lock"
                placeholder="Username"
                @change="handleLoginChange"
              ></a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Cannot be empty!'
                      }
                    ]
                  }
                ]"
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
              <a-button
                ref="submitBtn"
                :type="!lock ? 'primary' : 'danger'"
                :icon="!lock ? 'unlock' : 'lock'"
                :disabled="lock"
                html-type="submit"
                size="large"
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
import {
  EMAIL_PATTERN,
  VALID_USERNAME,
  VALID_PASSWORD
} from '~/middleware/constants'

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      loginRule: 'Login has to be an e-mail adress',
      login: {},
      validUsername: VALID_USERNAME,
      validPassword: VALID_PASSWORD,
      lock: false
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
    handleLoginChange(e) {
      this.login = this.validateLoginName(e.target.value)
    },
    validateLoginName(name) {
      if (EMAIL_PATTERN.test(name))
        return {
          validateStatus: 'success',
          errorMsg: '✔'
        }
      return {
        validateStatus: 'error',
        errorMsg: '❌ This login is not a valid e-mail!'
      }
    },
    checkCredentials(e) {
      e.preventDefault()
      this.form.validateFields()
      if (this.lock) return
      if (
        e.target[0].value === this.validUsername &&
        e.target[1].value === this.validPassword
      ) {
        console.log('Mr. Anderson, welcome back! We missed you...')
        this.login.validateStatus = 'success'
        this.$emit('logged', {
          name: this.$refs.loginInput.value,
          ...this.login
        })
      } else {
        this.lock = true
        this.login = {
          validateStatus: 'error',
          errorMsg: 'Incorrect login or password'
        }
        setTimeout(() => {
          this.lock = false
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
.login-form__panel {
  padding: 2em;
}
.login-form {
  width: 100%;
}
</style>
