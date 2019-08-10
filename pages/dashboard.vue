<template>
  <div class="dashboard">
    <a-layout>
      <a-layout-header class="dashboard__header">
        <div class="dashboard__header-title">
          <h1><a-icon type="user" /> Admin</h1>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          theme="light"
          class="dashboard__sider"
          :default-collapsed="false"
        >
          <a-menu
            :default-selected-keys="['1']"
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
          >
            <a-menu-item key="1">
              <a-icon type="inbox" />
              <span>Inbox</span>
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="pie-chart" />
              <span>Costs</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="area-chart" />
              <span>Income</span>
            </a-menu-item>
            <a-menu-item key="4" @click="handleLogout">
              <a-icon type="logout" />
              <span>Logout</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content>
          <h2 class="content_title">Users:</h2>
          <UserList v-if="users.length" :users="users"
        /></a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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

<style>
.dashboard .dashboard__header .dashboard__header-title * {
  color: #fff;
}

.dashboard__sider {
  overflow: 'auto';
  height: '100vh';
}

.content_title {
  display: block;
  text-align: center;
}
</style>
