const API_URL = 'http://localhost:3000';

const app = new Vue({
  el: '#app',
  data: {
    items: [],
    filteredItems: [],
    searchQuery: '',
    isVisibleCart: false,
    cart: [],
  },
  mounted() {
    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then((items) => {
        this.items = items;
        this.filteredItems = items;
      }),
    fetch(`${API_URL}/cart`)
      .then(response => response.json())
      .then((items) => {
        this.cart = items;
      })
  },
  computed: {
    total() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    totalItems() {
      return this.cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  },
  methods: {
    handleSearchClick() {
      // отфильтровать каталог
      const regexp = new RegExp(this.searchQuery, 'i');
      this.filteredItems = this.items.filter((item) => regexp.test(item.name));
    },
    handleCartClick() {
      this.isVisibleCart = !this.isVisibleCart;
    },
    handleDeleteClick(item) {
      if (item.quantity > 1) {
        fetch(`${API_URL}/cart/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: item.quantity - 1 }),
        })
          .then((response) => response.json())
          .then((item) => {
            const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
            Vue.set(this.cart, itemIdx, item);
          });
      } else {
        fetch(`${API_URL}/cart/${item.id}`, {
          method: 'DELETE',
        })
          .then(() => {
            this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
          });
      }
    },
    handleBuyClick(item) {
      const cartItem = this.cart.find((entry) => entry.id === item.id);
      if (cartItem) {
        // товар в корзине уже есть, нужно увеличить количество
        fetch(`${API_URL}/cart/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: cartItem.quantity + 1 }),
        })
          .then((response) => response.json())
          .then((item) => {
            const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
            Vue.set(this.cart, itemIdx, item);
          });
      } else {
        // товара в корзине еще нет, нужно добавить
        fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...item, quantity: 1 })
        })
          .then((response) => response.json())
          .then((item) => {
            this.cart.push(item);
          });
      }
    }
  }
})
