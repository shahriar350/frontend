export default ({ store, redirect }) => {
  if (!store.state.auth.user.seller){
    return redirect('/bongo/seller/request')
  }
}
