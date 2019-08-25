<template>
  <a-layout class="base-container dashboard">
    <a-layout-header class="dashboard__header">
      <header class="dashboard__header-title">
        <router-link slot="header" to="/">
          <h1><a-icon type="user" /> Welcome, {{ getUserName }}</h1>
        </router-link>
      </header>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        theme="light"
        class="dashboard__sider"
        breakpoint="md"
        collapsed-width="80"
        :default-collapsed="false"
      >
        <DashboardMenu />
      </a-layout-sider>
      <a-layout-content class="dashboard__router-view-content">
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardMenu from '~/components/DashboardMenu.vue'

export default {
  components: { DashboardMenu },
  computed: {
    ...mapGetters({
      getUserName: 'login/getLoggedUserName'
    })
  }
}
</script>

<style>
.dashboard .dashboard__header .dashboard__header-title * {
  text-transform: capitalize;
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

.dashboard__router-view-content {
  padding: 1em;
  color: indigo;
}
</style>
