<template>
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
