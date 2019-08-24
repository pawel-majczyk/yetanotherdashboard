<template>
  <div>
    <transition name="router-view" mode="out-in">
      <router-view />
    </transition>
    <template v-if="isHomePage">
      <UserList />
    </template>
  </div>
</template>

<script>
import UserList from '~/components/UserList.vue'

export default {
  layout: 'dashboard',
  components: { UserList },
  computed: {
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
