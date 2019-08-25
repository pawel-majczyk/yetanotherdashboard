import getUsers from '~/services/api'
import normalizeUsersData from '~/helpers/normalizeUsersData'
import { API_URL } from '~/assets/constants'

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
  async fetchUsers({ commit }) {
    if (this.state.users.userList.length === 0) {
      return commit(
        'SET_USERLIST',
        normalizeUsersData(await getUsers(API_URL, 'users'))
      )
    }
    console.log('Users alredy present, skipping fetch...')
    return false
  }
}
