export default function ({ store, redirect }) {
  if (!store.state.auth.jwt) {
    return redirect('/login');
  }
}