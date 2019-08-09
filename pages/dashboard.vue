<template>
  <div>
    <a-layout>
      <a-layout-header>Admin</a-layout-header>
      <a-layout>
        <a-layout-sider>Menu</a-layout-sider>
        <a-layout-content>
          <h2>Users:</h2>
          <UserList v-if="users.length" :users="users"
        /></a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import UserList from '~/components/UserList.vue'
import { API_URL } from '~/middleware/constants'
import getUsers from '~/middleware/api'

export default {
  components: { UserList },
  data() {
    return {
      API_URL
    }
  },
  computed: {
    users: {
      get() {
        return this.$store.state.users.userList
      },
      set(list) {
        return this.$store.commit('users/SET_USERLIST', list)
      }
    }
  },
  middleware: 'login-redirect',
  async created() {
    // this.$store.dispatch('users/fetchUsers', {
    //   ctx: this,
    //   API_URL: this.API_URL,
    //   resource: 'users'
    // })
    this.users = await getUsers(this.API_URL, 'users')
  }
}
</script>
