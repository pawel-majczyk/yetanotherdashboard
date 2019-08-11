import getUsers from '~/middleware/api'
import { API_URL } from '~/middleware/constants'

export const state = () => ({
  userList: []
})

export const mutations = {
  SET_USERLIST(state, payload) {
    state.userList = payload
  }
}
export const getters = {
  userList: (state) => state.userList
}
export const actions = {
  async fetchUsers() {
    if (this.state.users.userList.length === 0) {
      return this.commit('users/SET_USERLIST', await getUsers(API_URL, 'users'))
    }
    console.log('Users alredy present, skipping fetch...')
    return false
  }
}
