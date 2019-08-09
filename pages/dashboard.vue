<template>
  <div>
    <a-layout>
      <a-layout-header>Admin</a-layout-header>
      <a-layout>
        <a-layout-sider>Menu</a-layout-sider>
        <a-layout-content>
          <h2>Users:</h2>
          <UserList v-if="users.length" :users="users" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import getUsers from '../middleware/api'
import UserList from '~/components/UserList.vue'
import API_URL from '~/middleware/constants'

export default {
  components: { UserList },
  data() {
    return {
      users: [],
      API_URL
    }
  },
  middleware: 'login-redirect',
  created() {
    getUsers(this, this.$data.API_URL, 'users')
  },
  methods: {
    getters: getUsers
  }
}
</script>
