import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
class CartItem {
  constructor(item) {
    this.item = item
    this._amount = 1
  }

  get price() {
    return this.item.price * this.amount
  }

  get amount() {
    return this.amount
  }

  set amount(i) {
    if (i > 0 && i <= 5) {
      this._amount = i
    }
  }
}

// eslint-disable-next-line require-await
export default ({ store }) => {
  const cartItem = new CartItem(store)
  Vue.prototype.$cart = cartItem
  Vue.$cart = cartItem
}
