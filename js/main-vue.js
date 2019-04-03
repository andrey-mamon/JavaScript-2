const app = new Vue({
  el: '#app',
  data: {
    items: [],
    filteredItems: [],
    searchQuery: '',
    isVisibleCart: false
  },
  mounted() {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then((items) => {
        this.items = items;
        this.filteredItems = items;
      });
  },
  methods: {
    handleSearchClick() {
      this.filterItems(this.searchQuery);
    },
    // отфильтровать каталог
    filterItems(query) {
      const regexp = new RegExp(query, 'i');
      this.filteredItems = this.items.filter((item) => regexp.test(item.name))
    },
    handleCartClick() {
      if(this.isVisibleCart) {
        this.isVisibleCart = false;
      } else {
        this.isVisibleCart = true;
      }
    }
  }
})
