<template>
  <div>
    <a-row type="flex" justify="center" align="middle" class="login-form">
      <a-col :xs="20" :sm="12" :md="10">
        <a-row type="flex" justify="center" align="middle">
          <h1 class="login-form__title">
            Login
          </h1>
        </a-row>
        <a-row type="flex" justify="center" align="middle">
          <a-form
            layout="vertical"
            :form="form"
            class="login-form__fields"
            :class="formSubmitFailedClass"
            @submit.prevent="handleSubmit"
          >
            <aForm-item
              :help="
                loginValidateError() ||
                  (loggingStatus === 'error' && 'Login failed')
              "
              :validate-status="loginValidateError() ? 'error' : loggingStatus"
            >
              <a-input
                id="login"
                ref="loginInput"
                v-decorator="[
                  'login',
                  {
                    rules: [
                      {
                        required: true,
                        type: 'email',
                        message: 'It has to be an e-mail address!'
                      }
                    ]
                  }
                ]"
                name="login"
                autocomplete="username"
                :disabled="isFormLocked"
                placeholder="Username"
              >
              </a-input>
            </aForm-item>
            <aForm-item>
              <a-input
                id="password"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Password cannot be empty!'
                      }
                    ]
                  }
                ]"
                autocomplete="current-password"
                placeholder="Password"
                type="password"
                :disabled="isFormLocked"
              ></a-input>
            </aForm-item>
            <a-row type="flex" justify="space-around" align="middle">
              <a-col span="10">
                <a
                  href="#"
                  title="Click to get your login data reminded"
                  @click="handleRemindPassword"
                >
                  Password forgotten
                </a>
              </a-col>
              <a-col span="10">
                <a-Button
                  :disabled="isFormLocked"
                  :type="!isFormLocked ? 'primary' : 'dashed'"
                  :icon="!isFormLocked ? 'unlock' : 'lock'"
                  html-type="submit"
                  size="large"
                  block
                  ><template v-if="loggingStatus === 'validating'">
                    Wait...<a-icon type="loading" />
                  </template>
                  <span v-else>Login</span>
                </a-Button>
              </a-col>
            </a-row>
          </a-form>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { VALID_USERNAME, VALID_PASSWORD } from '~/assets/constants'

export default {
  props: {
    loggingStatus: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      isFormLocked: false
    }
  },
  computed: {
    validData() {
      return `user: "${VALID_USERNAME}" | password: "${VALID_PASSWORD}"`
    },
    formSubmitFailedClass() {
      return this.loggingStatus === 'error' ? 'animation-shake' : ''
    }
  },
  watch: {
    loggingStatus(newStatus) {
      if (newStatus === 'validating') {
        this.isFormLocked = true
      } else {
        this.isFormLocked = false
      }
    }
  },
  mounted() {
    this.$refs.loginInput.focus()
  },
  methods: {
    loginValidateError() {
      return this.form.getFieldError('login')
    },
    async handleSubmit(e) {
      await this.form.validateFields().catch((problems) => {
        this.isFormLocked = true
        setTimeout(() => {
          this.isFormLocked = false
        }, 250)
      })
      if (this.isFormLocked) return false
      const { login, password } = this.form.getFieldsValue()
      this.$emit('loginAttempt', {
        login,
        password
      })
    },
    handleRemindPassword(e) {
      e.preventDefault()
      alert(this.validData)
    }
  }
}
</script>

<style>
.login-form__fields {
  width: 100%;
}
.login-form__title {
  text-align: center;
  flex-basis: 100%;
}
</style>
