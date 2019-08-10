<template>
  <div class="dashboard">
    <a-layout>
      <a-layout-header class="dashboard__header">
        <div class="dashboard__header-title">
          <router-link to="/dashboard">
            <h1><a-icon type="user" /> {{ getUserName }}</h1>
          </router-link>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider
          theme="light"
          class="dashboard__sider"
          :default-collapsed="false"
        >
          <a-menu
            :default-selected-keys="['2']"
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
          >
            <a-menu-item key="1">
              <router-link to="/dashboard/inbox">
                <a-icon type="inbox" />
                <span>Inbox</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/dashboard/users">
                <a-icon type="database" />
                <span>User's Databae</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/dashboard/btc-market">
                <a-icon type="area-chart" />
                <span>BTC Market</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="4" @click="handleLogout">
              <a-icon type="logout" />
              <span>Logout</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
          <template v-if="isHomePage">
            <h2 class="content_title">Users:</h2>
            <UserList />
          </template>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import UserList from '~/components/UserList.vue'

export default {
  components: { UserList },
  data() {
    return {
      collapsed: true
    }
  },
  computed: {
    ...mapGetters({
      getUserName: 'login/getLoggedUserName'
    }),
    isHomePage() {
      return this.$route.fullPath === '/dashboard'
    }
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
  text-transform: capitalize;
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
