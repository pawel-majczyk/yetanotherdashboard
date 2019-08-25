function usersNormalized(usersData) {
  return usersData.map((user) => {
    const [firstName, lastName] = extractFirstLastName(user)
    return {
      key: user.id,
      id: user.id,
      email: user.email,
      name: firstName,
      surname: lastName,
      companyName: user.company.name
    }
  })
}

function extractFirstLastName({ name }) {
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

export default usersNormalized
