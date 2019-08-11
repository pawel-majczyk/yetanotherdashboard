<template>
  <div class="users-component">
    <h2 class="content_title">Users:</h2>
    <UserList />
  </div>
</template>

<script>
import UserList from '~/components/UserList.vue'

export default {
  components: { UserList }
}
</script>
