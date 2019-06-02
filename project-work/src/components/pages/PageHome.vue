<template>
  <div class="container">
    <products :query="query" @buy="handleBuyClick"></products>
  </div>
</template>

<script>
import Products from '../app/Products.vue';
import config from '../../../config';
const API_URL = config[process.env.NODE_ENV].api;
export default {
  name: 'PageHome',
  components: {
    Products,
  },
  props: ['query', 'isVisibleLogin'],
  data() {
    return {
      items: [],
    };
  },
  methods: {
    handleBuyClick(item) {
      this.$emit('buy', item);
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
  @import '../../assets/main.scss';
</style>
