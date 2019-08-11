<template>
  <div>
    <aTable :columns="columns" :data-source="usersNormalized" size="large" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import pickBy from 'lodash.pickby'
// import getUsers from '~/middleware/api'

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
        // {
        //   title: 'Surname',
        //   dataIndex: 'surname'
        // },
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
    users: {
      get() {
        return this.$store.state.users.userList
      },
      set(list) {
        return this.$store.commit('users/SET_USERLIST', list)
      }
    },
    usersNormalized() {
      const fieldsFilter = (value, key) => ['id', 'email'].includes(key)
      return this.users.map((user) => {
        const extractedFields = pickBy(user, fieldsFilter)
        return {
          key: user.id,
          name: this.extractFirstLastName(user)[0],
          surname: this.extractFirstLastName(user)[1],
          companyName: user.company.name,
          ...extractedFields
        }
      })
    }
  },
  async created() {
    await this.fetchUsers(this.API_URL)
  },
  methods: {
    ...mapActions({ fetchUsers: 'users/fetchUsers' }),
    extractFirstLastName(user) {
      const bannedWords = [
        'Mr.',
        'Mrs.',
        'Miss',
        'Ms.',
        'Dr',
        'Sir',
        'Lord',
        'Prof.'
      ]
      if (bannedWords.includes(user.name.split(' ')[0])) {
        const [, ...splittedName] = user.name.split(' ')
        return splittedName
      }
      return user.name.split(' ')
    }
  }
}
</script>
