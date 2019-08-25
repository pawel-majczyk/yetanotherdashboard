<template>
  <div>
    <aRow type="flex" justify="center" align="middle" class="login-form">
      <aCol :xs="20" :sm="12" :md="10">
        <aRow type="flex" justify="center" align="middle">
          <h1 class="login-form__title">
            Login
          </h1>
        </aRow>
        <aRow type="flex" justify="center" align="middle">
          <aForm
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
              <aInput
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
              </aInput>
            </aForm-item>
            <aForm-item>
              <aInput
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
              ></aInput>
            </aForm-item>
            <aRow type="flex" justify="space-around" align="middle">
              <aCol span="10">
                <a
                  href="#"
                  title="Click to get your login data reminded"
                  @click="handleRemindPassword"
                >
                  Password forgotten
                </a>
              </aCol>
              <aCol span="10">
                <aButton
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
                </aButton>
              </aCol>
            </aRow>
          </aForm>
        </aRow>
      </aCol>
    </aRow>
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
