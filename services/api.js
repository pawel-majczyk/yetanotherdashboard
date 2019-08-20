export default async function getUsers(API_URL, resource) {
  try {
    const result = await fetch(`${API_URL}${resource}`)
      .then((res) => res.json())
      .catch((err) => {
        throw err
      })
    return result
  } catch (error) {
    throw error
  }
}
