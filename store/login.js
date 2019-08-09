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
  logUserIn(state /*, user */) {
    // if (user.name === 'admin@admin.com' && user.password === 'admin') {
    // state.userName = user.name
    // }
    state.userLogged = true
  },
  logUserOut(state) {
    state.userLogged = false
  }
}
