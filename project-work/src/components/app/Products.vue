<template>
  <div class="goods">
    <product-item
      v-for="entry in filteredItems"
      :key="entry.id"
      :item="entry"
      @buy="handleBuyClick"
    >
    </product-item>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';
import config from '../../../config';
const API_URL = config[process.env.NODE_ENV].api;
export default {
  name: 'Products',
  components: {
    ProductItem,
  },
  props: ['query'],
  data() {
    return {
      items: [],
    };
  },
  methods: {
    handleBuyClick(item) {
      this.$emit('buy', item);
    },
  },
  computed: {
    filteredItems() {
      if (this.query) {
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
  }
}
</script>

<style lang="scss" scoped>
  .goods {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 50px;
  }
</style>
