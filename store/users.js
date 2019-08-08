export const state = () => ({
  userList: []
})

export const getters = {
  getUserList(state) {
    return state.userList
  }
}
