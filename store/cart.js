function updateLocalStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}
export const state = () => ({
  cart: [],
  cartlength: 0,
})

export const getters = {
  productQuantity(state) {
    return (product) => {
      const item = state.cart.find((i) => i.id === product.id)
      // カートの中にクリック指定したproductをitemに入れる
      if (item) return item.quantity
      else return null
    }
  },
  cartItem(state) {
    return state.cart
  },
  cartTotal(state) {
    return state.cart.reduce((a, b) => a + b.price * b.quantity, 0)
  },
}

export const mutations = {
  addToCart(state, product) {
    const item = state.cart.find((cartItem) => cartItem.id === product.id)
    if (item) {
      item.amount++
      // クリックしたitemがカートの中にあったら+1
    } else {
      state.cart.push({ ...product, amount: 1 })
      // なかったらquantityに1を入れる
    }
    updateLocalStorage(state.cart)
  },
  removeFromCart(state, product) {
    const item = state.cart.find((cartItem) => cartItem.id === product.id)
    if (item) {
      if (item.amount > 1) {
        item.amount--
      } else {
        state.cart = state.cart.filter((i) => i.id !== product.id)
      }
    }
    updateLocalStorage(state.cart)
  },
  updateCartFromLocalStorage(state) {
    const cart = localStorage.getItem('cart')
    if (cart) {
      state.cart = JSON.parse(cart)
    }
  },
}
