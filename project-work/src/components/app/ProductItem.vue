<template>
  <div class="products-item">
    <router-link class="product" :to="{ name: 'product-single', params: { id: item.id } }">
      <img :src="item.image" class="product-image" alt="product image">
      <div class="product-text-box">
        <p class="product-name">{{item.name}}</p>
        <p class="product-price">$ {{item.price}}</p>
      </div>
    </router-link>
    <div class="add-to-cart-box">
      <a class="add-to-cart" href="#" @click.prevent="handleBuyClick(item)">
        <img src="img/cart-white.svg" class="cart-white" alt="cart">
        Add to Cart
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products-item {
  width: 261px;
  position: relative;
  margin-bottom: 44px;
  transition: box-shadow 0.3s ease;
}
.products-item:hover {
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.16);
}
.product {
  display: block;
  text-decoration: none;
}
.products-item:hover .product-image {
  filter: brightness(50%);
}
.product-image {
  transition: filter 0.3s ease;
}
.product-text-box {
  padding: 14px;
}
.product-name {
  color: #222222;
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 12px;
  letter-spacing: 0.4px;
}
.product-price {
  color: #f16d7f;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
}
.add-to-cart-box {
  position: absolute;
  top: 98px;
  width: 261px;
  display: none;
  justify-content: center;
}
.products-item:hover .add-to-cart-box {
  display: flex;
}
.add-to-cart {
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid #ffffff;
  padding: 14px;
  text-decoration: none;
  transition: box-shadow 0.3s ease;
}
.add-to-cart:hover {
  box-shadow: 0 0 5px #ffffff;
}
.cart-white {
  display: block;
  margin-right: 8px;
}
</style>

<script>
export default {
  name: 'ProductItem',
  props: ['item'],
  methods: {
    handleBuyClick(item) {
      this.$emit('buy', item);
    }
  }
}
</script>