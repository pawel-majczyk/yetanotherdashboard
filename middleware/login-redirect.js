export default function({ store, redirect }) {
  if (
    // sessionStorage.getItem('userLogged') ||
    !store.state.login.userLogged
  ) {
    console.log('is logged? : ' + store.state.login.userLogged)
    console.log('user not logged in, redirecting to login page...')
    redirect('302', '/login')
  } else {
    console.log('is logged? : ' + store.state.login.userLogged)
  }
}
