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
        const [firstName, lastName] = this.extractFirstLastName(user)
        return {
          key: user.id,
          name: firstName,
          surname: lastName,
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
    extractFirstLastName({ name }) {
      const nameArr = name.split(' ')
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
      if (bannedWords.includes(nameArr[0])) {
        nameArr.shift()
      }
      return nameArr
    }
  }
}
</script>
