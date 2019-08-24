import { VALID_USERNAME, VALID_PASSWORD } from '~/assets/constants'

export const state = () => ({
  loggingStatus: '',
  userLogged: false,
  userName: ''
})

export const getters = {
  isUserLoggedIn(state) {
    return state.userLogged
  },
  getLoggedUserName(state) {
    return state.userName
  }
}
export const mutations = {
  logUserIn(state, user) {
    state.userName = user.split('@')[0]
    state.userLogged = true
  },
  logUserOut(state) {
    state.userLogged = false
  },
  changeLoggingStatus(state, status) {
    state.loggingStatus = status
  }
}

export const actions = {
  async tryLoggingIn({ commit, dispatch }, credentials) {
    commit('changeLoggingStatus', 'validating')
    try {
      const validationResult = await dispatch('checkCredentials', credentials)
      commit('changeLoggingStatus', validationResult)
      commit('logUserIn', credentials.login)
    } catch (err) {
      commit('changeLoggingStatus', err.name.toLowerCase())
    }
  },
  checkCredentials(context, { login, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (login === VALID_USERNAME && password === VALID_PASSWORD) {
          resolve('success')
        } else {
          reject(new Error('invalid credentials'))
        }
      }, 800)
    })
  }
}
