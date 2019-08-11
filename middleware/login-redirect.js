export default function({ store, redirect }) {
  if (!store.state.login.userLogged) {
    console.log('user not logged in, redirecting to login page...')
    redirect('302', '/')
  } else {
  }
}
