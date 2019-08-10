<template>
  <div class="users-component">
    <h2 class="content_title">Users:</h2>
    <UserList v-if="users.length" :users="users" />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import UserList from '~/components/UserList.vue'
import { API_URL } from '~/middleware/constants'
import getUsers from '~/middleware/api'

export default {
  components: { UserList },
  data() {
    return {
      API_URL,
      collapsed: true
    }
  },
  computed: {
    ...mapGetters({
      getUserName: 'login/getLoggedUserName'
    }),
    users: {
      get() {
        return this.$store.state.users.userList
      },
      set(list) {
        return this.$store.commit('users/SET_USERLIST', list)
      }
    }
  },
  async created() {
    this.users = await getUsers(this.API_URL, 'users')
  },
  methods: {
    ...mapMutations({ logUserOut: 'login/logUserOut' }),
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    handleLogout(payload) {
      this.logUserOut()
      this.$router.push('/')
    }
  },
  middleware: 'login-redirect'
}
</script>
