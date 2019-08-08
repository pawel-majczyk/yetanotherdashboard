<template>
  <div>
    <a-table :columns="columns" :data-source="usersNormalized" size="large" />
    <!-- <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => {
        return ['adam', 'robert']
      }
    }
  },
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
          title: 'Surname',
          dataIndex: 'surname'
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
    usersNormalized() {
      const normalizedArr = []
      const usedFields = ['id', 'name', 'email', 'company']
      this.users.map((entry) => {
        Object.keys(entry).forEach((key) => {
          if (!usedFields.includes(key)) delete entry[key]
          if (key === 'company') entry.companyName = entry.company.name
          if (key === 'name') {
            const [name, surname] = this.extractFirstLastName(entry)
            entry.name = name
            entry.surname = surname
          }
          entry.key = entry.id
        })
        normalizedArr.push(entry)
      })
      return normalizedArr
    }
  },
  methods: {
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
        const [, ...pureName] = user.name.split(' ')
        return pureName
      }
      return user.name.split(' ')
    }
  }
}
</script>
