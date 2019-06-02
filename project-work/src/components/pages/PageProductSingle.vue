<template>
  <div>
    <h2>{{product.name}} {{product.price}}</h2>
  </div>
</template>

<script>
export default {
  name: 'PageProductSingle',
  props: ['id'],
  data() {
    return {
      product: {},
    }
  },
  mounted() {
    fetch(`http://localhost:3000/products/${this.id}`)
      .then((response) => response.json())
      .then((product) => {
        this.product = product;
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
