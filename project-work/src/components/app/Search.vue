<template>
  <div>
    <input class="search-text" type="text" v-model="searchQuery" placeholder="Search for Item..."><button class="search-button" @click="handleSearchClick">
      <i class="fa fa-search"></i></button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    handleSearchClick() {
      this.$emit('search', this.searchQuery);
    }
  }
}
</script>

<style lang="scss" scoped>
.search-text {
  width: 280px;
  height: 38px;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;
  outline: 0;
  padding-left: 14px;
  padding-right: 14px;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.35px;
}
.search-button {
  height: 38px;
  width: 38px;
  border: 1px solid #d9dee1;
  border-radius: 0 3px 3px 0;
  color: #a4a4a4;
  font-size: 14px;
  outline: 0;
  transition: all 0.3s ease;
}
.search-button:hover {
  background-color: #f16d7f;
  color: #f7f7f8;
}
</style>