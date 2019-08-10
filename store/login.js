export const state = () => ({
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
  }
}
