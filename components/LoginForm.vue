<template>
  <div>
    <aRow type="flex" justify="center" align="middle" class="login-form">
      <aCol :xs="20" :sm="12" :md="10">
        <aRow type="flex" justify="center" align="middle">
          <h1 class="login-form__title">
            Login
            <a-icon v-if="loggingStatus === 'validating'" type="loading" />
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
              :validate-status="loginField.validateStatus"
              :help="
                loginField.validateStatus === 'success'
                  ? '✔'
                  : 'Login has to be an e-mail adress'
              "
            >
              <aInput
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
                autocomplete="username"
                :disabled="isFormLocked"
                placeholder="Username"
                @change="handleLoginChange"
              >
              </aInput>
            </aForm-item>
            <aForm-item>
              <aInput
                ref="passwordInput"
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
              ></aInput>
            </aForm-item>
            <aRow type="flex" justify="space-between" align="middle">
              <a
                href="#"
                title="Click to get your login data reminded"
                @click="handleRemindPassword"
              >
                Password forgotten
              </a>
              <aButton
                :disabled="isFormLocked"
                :type="!isFormLocked ? 'primary' : 'danger'"
                :icon="!isFormLocked ? 'unlock' : 'lock'"
                html-type="submit"
                size="large"
                >Login
              </aButton>
            </aRow>
          </aForm>
        </aRow>
      </aCol>
    </aRow>
  </div>
</template>

<script>
import {
  EMAIL_PATTERN,
  VALID_USERNAME,
  VALID_PASSWORD
} from '~/assets/constants'

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
      loginFieldValue: '',
      loginField: {
        validateStatus: '',
        value: ''
      },
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
    handleLoginChange(e) {
      this.loginFieldValue = e.target.value
      this.loginField.validateStatus = this.validateLoginName(
        this.loginFieldValue
      )
    },
    validateLoginName: (name) =>
      EMAIL_PATTERN.test(name) ? 'success' : 'error',

    async handleSubmit(e) {
      await this.form.validateFields().catch((problems) => {
        this.isFormLocked = true
        setTimeout(() => {
          this.isFormLocked = false
        }, 500)
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
  text-align: left;
  flex-basis: 100%;
}
</style>
