<template>
  <div>
    <app-header @search="handleSearchClick" @login="handleAccountClick"></app-header>
    <main>
      <slot></slot>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '../app/AppHeader.vue';
import AppFooter from '../app/AppFooter.vue';

export default {
  name: 'LayoutDefault',
  components: {
    AppHeader,
    AppFooter,
  },
  methods: {
    handleSearchClick(searchQuery) {
      this.$emit('search', searchQuery);
    },
    handleAccountClick() {
      this.$emit('login');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/main.scss';
</style>