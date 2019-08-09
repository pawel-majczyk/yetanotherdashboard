<template>
  <div>
    <a-table :columns="columns" :data-source="normalizeUsers" size="large" />
  </div>
</template>

<script>
import pickBy from 'lodash.pickby'
export default {
  props: {
    users: {
      type: Array,
      default: () => []
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
    normalizeUsers() {
      const fieldsFilter = (value, key) => {
        return ['id', 'email'].includes(key)
      }
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
    // usersNormalized() {
    //   const normalizedArr = []
    //   const usedFields = ['id', 'name', 'email', 'company']
    //   this.users.map((entry) => {
    //     Object.keys(entry).forEach((key) => {
    //       if (!usedFields.includes(key)) delete entry[key]
    //       if (key === 'company') entry.companyName = entry.company.name
    //       if (key === 'name') {
    //         const [name, surname] = this.extractFirstLastName(entry)
    //         entry.name = name
    //         entry.surname = surname
    //       }
    //       entry.key = entry.id
    //     })
    //     normalizedArr.push(entry)
    //   })
    //   return normalizedArr
    // }
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
        const [, ...splittedName] = user.name.split(' ')
        return splittedName
      }
      return user.name.split(' ')
    }
  }
}
</script>
