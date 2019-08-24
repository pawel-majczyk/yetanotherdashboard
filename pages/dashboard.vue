<template>
  <div class="base-container dashboard">
    <aLayout>
      <aLayout-header class="dashboard__header">
        <div class="dashboard__header-title">
          <router-link to="/">
            <h1><aIcon type="user" /> {{ getUserName }}</h1>
          </router-link>
        </div>
      </aLayout-header>
      <aLayout>
        <aLayout-sider
          theme="light"
          class="dashboard__sider"
          breakpoint="md"
          collapsed-width="80"
          :default-collapsed="false"
        >
          <DashboardMenu />
        </aLayout-sider>
        <aLayout-content class="dashboard__router-view-content">
          <transition name="router-view" mode="out-in">
            <router-view />
          </transition>
          <template v-if="isHomePage">
            <UserList />
          </template>
        </aLayout-content>
      </aLayout>
    </aLayout>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DashboardMenu from '~/components/DashboardMenu.vue'
import UserList from '~/components/UserList.vue'

export default {
  components: { UserList, DashboardMenu },
  computed: {
    ...mapGetters({
      getUserName: 'login/getLoggedUserName'
    }),
    isHomePage() {
      return this.$route.fullPath === '/dashboard'
    }
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  },
  middleware: 'login-redirect'
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
  color: red;
}
</style>
