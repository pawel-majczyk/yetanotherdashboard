import getUsers from '~/middleware/api'

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
  fetchUsers(state, { ctx, API_URL, resource }) {
    ctx.store.commit('SET_USERLIST', getUsers(ctx, API_URL, resource))
  }
}
