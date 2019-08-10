<template>
  <div class="dashboard">
    <aLayout>
      <aLayout-header class="dashboard__header">
        <div class="dashboard__header-title">
          <router-link to="/dashboard">
            <h1><aIcon type="user" /> {{ getUserName }}</h1>
          </router-link>
        </div>
      </aLayout-header>
      <aLayout>
        <aLayout-sider
          theme="light"
          class="dashboard__sider"
          :default-collapsed="false"
        >
          <aMenu
            :default-selected-keys="['2']"
            mode="inline"
            theme="light"
            :inline-collapsed="collapsed"
          >
            <aMenu-item key="1">
              <router-link to="/dashboard/inbox">
                <aIcon type="inbox" />
                <span>Inbox</span>
              </router-link>
            </aMenu-item>
            <aMenu-item key="2">
              <router-link to="/dashboard/users">
                <aIcon type="database" />
                <span>User's Databae</span>
              </router-link>
            </aMenu-item>
            <aMenu-item key="3">
              <router-link to="/dashboard/btc-market">
                <aIcon type="area-chart" />
                <span>BTC Market</span>
              </router-link>
            </aMenu-item>
            <aMenu-item key="4" @click="handleLogout">
              <aIcon type="logout" />
              <span>Logout</span>
            </aMenu-item>
          </aMenu>
        </aLayout-sider>
        <aLayout-content>
          <router-view></router-view>
          <template v-if="isHomePage">
            <h2 class="content_title">Users:</h2>
            <UserList />
          </template>
        </aLayout-content>
      </aLayout>
    </aLayout>
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
