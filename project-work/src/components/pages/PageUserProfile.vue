<template>
  <div>
    <h2>{{user.name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'PageUserProfile',
  props: ['id'],
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    fetch(`http://localhost:3000/users/${this.id}`)
      .then((response) => response.json())
      .then((user) => {
        this.user = user;
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
