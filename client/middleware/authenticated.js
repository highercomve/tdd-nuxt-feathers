export default function ({ store, redirect }) {
  if (!store.state.users.jwt) {
    return redirect('/login')
  }
}