// import { API } from 'aws-amplify'

function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}
export const state = () => ({
  cart: [],
  orders: [],
  cartlength: 0,
})

export const mutations = {
  addToCart(state, product) {
    const item = state.cart.find((cartItem) => cartItem.id === product.id)
    if (item) {
      item.amount += 1
      // クリックしたitemがカートの中にあったら+1
    } else {
      state.cart.push({ ...product, amount: 1 })
    }
    // cartをJSONのparseに入れる？
    updateLocalStorage(state.cart)
  },
  removeFromCart(state, product) {
    const item = state.cart.find((cartItem) => cartItem.id === product.id)
    if (item) {
      if (item.amount > 1) {
        item.amount -= 1
      } else {
        state.cart = state.cart.filter((i) => i.id !== product.id)
      }
    }
  },
}
