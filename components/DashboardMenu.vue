<template>
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
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      collapsed: true
    }
  },
  methods: {
    ...mapMutations({
      logUserOut: 'login/logUserOut',
      replaceUserlist: 'users/SET_USERLIST'
    }),
    handleLogout(payload) {
      this.replaceUserlist([])
      this.logUserOut()
      this.$router.push('/')
    }
  }
}
</script>
