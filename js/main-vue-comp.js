const API_URL = 'http://localhost:3000';

Vue.component('search', {
  template:`
    <div>
      <input class="search-text" type="text" v-model="searchQuery" placeholder="Search for Item..."><button
       class="search-button" @click="handleSearchClick(searchQuery)"><i class="fa fa-search"></i></button>
    </div>
  `,
  methods: {
    handleSearchClick(searchQuery) {
      this.$emit('onsearch', searchQuery);
    }
  },
  data() {
    return {
      searchQuery: '',
    };
  },
});

Vue.component('product-item', {
  props: ['item'],
  template: `
    <div class="products-item">
      <a href="#" class="product">
          <img :src="item.image" class="product-image" alt="product image">
          <div class="product-text-box">
              <p class="product-name">{{item.name}}</p>
              <p class="product-price">$ {{item.price}}</p>
          </div>
      </a>
      <div class="add-to-cart-box">
          <a class="add-to-cart" href="#" @click.prevent="handleBuyClick(item)">
              <img src="img/cart-white.svg" class="cart-white" alt="cart">
              Add to Cart
          </a>
      </div>
    </div>
  `,
  methods: {
    handleBuyClick(item) {
      this.$emit('onBuy', item);
    }
  }
});

Vue.component('products', {
  props: ['query'],
  methods: {
    handleBuyClick(item) {
      this.$emit('onbuy', item);
    },
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    filteredItems() {
      if(this.query) {
        const regexp = new RegExp(this.query, 'i');
        return this.items.filter((item) => regexp.test(item.name));
      } else {
        return this.items;
      }
    }
  },
  mounted() {
    fetch(`${API_URL}/products`)
      .then(response => response.json())
      .then((items) => {
        this.items = items;
      });
  },
  template: `
    <div class="goods">
      <product-item v-for="entry in filteredItems" :item="entry" @onBuy="handleBuyClick"></product-item>
    </div>
  `,
});

Vue.component('cart-item', {
  props: ['item'],
  template:`
    <div class="drop-box-cart-item">
      <img :src="item.image" width="72" height="85" alt="cart item">
      <div class="drop-box-cart-item-info">
        <p class="drop-box-cart-item-name">{{ item.name }}</p>
        <p class="drop-box-cart-item-stars">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </p>
        <p class="drop-box-cart-item-price">{{ item.quantity }} x $ {{ item.price }}</p>
      </div>
      <a href="#" @click="handleDeleteClick(item)"><i class="fa fa-times-circle drop-box-cart-item-del"></i></a>
    </div>
  `,
  methods: {
    handleDeleteClick(item) {
      this.$emit('ondelete', item);
    }
  }
});

Vue.component('cart', {
  props: ['newItem'],
  data() {
    return {
      cart: [],
    };
  },
  mounted() {
    fetch(`${API_URL}/cart`)
      .then(response => response.json())
      .then((items) => {
        this.cart = items;
      })
  },
  template:`
    <div class="drop-box-cart">
      <cart-item v-for="entry in cartItems" :item="entry" @ondelete="handleDeleteClick"></cart-item>
      <div class="drop-box-cart-sum">
        <p>TOTAL</p>
        <p>$ {{ total }}</p>
      </div>
      <a class="drop-box-cart-button" href="checkout.html">Checkout</a>
      <a class="drop-box-cart-button" href="shopping-cart.html">Go to cart</a>
    </div>
  `,
  computed: {
    total() {
      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    totalItems() {
      return this.cart.reduce((acc, item) => acc + item.quantity, 0);
    },
    cartItems() {
      if (this.newItem) {
        addToCart(this.newItem);
      }
      return this.cart;
    }
  },
  methods: {
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
    addToCart(item) {
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
});

const app = new Vue({
  el: '#app',
  data: {
    filterValue: '',
    isVisibleCart: false,
    newCartItem: {}
  },
  methods: {
    handleSearchClick(searchQuery) {
      this.filterValue = searchQuery;
    },
    handleCartClick() {
      this.isVisibleCart = !this.isVisibleCart;
    },
    handleBuyClick(item) {
      this.newCartItem = item;
    }
  }
})
