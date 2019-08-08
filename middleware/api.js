export default async function getUsers(context, API_URL, resource) {
  try {
    const result = await fetch(`${API_URL}${resource}`)
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })
    context[resource] = result
  } catch (error) {
    return ['Unable to fetch users']
  }
}
