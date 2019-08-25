<template>
  <div>
    <aTable :columns="columns" :data-source="userList" size="large" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'E-mail',
          dataIndex: 'email'
        },
        {
          title: 'Company',
          dataIndex: 'companyName'
        }
      ]
    }
  },
  computed: {
    ...mapState('users', {
      userList: (state) => state.userList
    })
  },
  async created() {
    await this.fetchUsers(this.API_URL)
  },
  methods: {
    ...mapActions({ fetchUsers: 'users/fetchUsers' })
  }
}
</script>
