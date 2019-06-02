<template>
  <header class="header">
    <div class="container header-flex">
      <div class="header-left">
        <router-link to="/" class="logo"><img class="logo-img" src="img/logo.png" alt="logo"> BRAN<span
            class="logo-d">D</span></router-link>
        <form class="header-form" action="">
          <div class="browse">
            <a class="browse-link" href="catalog.html">Browse &thinsp; &#x25BE;</a>
            <div class="drop-box">
              <div class="drop-flex">
                <h3 class="drop-heading">Women</h3>
                <ul class="drop-menu">
                  <li><a class="drop-link" href="catalog.html">Dresses</a></li>
                  <li><a class="drop-link" href="catalog.html">Tops</a></li>
                  <li><a class="drop-link" href="catalog.html">Sweaters/Knits</a></li>
                  <li><a class="drop-link" href="catalog.html">Jackets/Coats</a></li>
                  <li><a class="drop-link" href="catalog.html">Blazers</a></li>
                  <li><a class="drop-link" href="catalog.html">Denim</a></li>
                  <li><a class="drop-link" href="catalog.html">Leggings/Pants</a></li>
                  <li><a class="drop-link" href="catalog.html">Skirts/Shorts</a></li>
                  <li><a class="drop-link" href="catalog.html">Accessories</a></li>
                </ul>
                <br>
                <h3 class="drop-heading">Men</h3>
                <ul class="drop-menu">
                  <li><a class="drop-link" href="catalog.html">Tees/Tank tops</a></li>
                  <li><a class="drop-link" href="catalog.html">Shirts/Polos</a></li>
                  <li><a class="drop-link" href="catalog.html">Sweaters</a></li>
                  <li><a class="drop-link" href="catalog.html">Sweatshirts/Hoodies</a></li>
                  <li><a class="drop-link" href="catalog.html">Blazers</a></li>
                  <li><a class="drop-link" href="catalog.html">Jackets/vests</a></li>
                </ul>
              </div>
            </div>
          </div>
          <search @search="handleSearchClick"></search>
        </form>
      </div>
      <div class="header-right">
        <div class="cart-box">
          <img src="img/cart.svg" class="cart" @click="handleCartClick" alt="cart">
          <cart v-if="isVisibleCart" :cart="cart" @delete="handleDeleteClick"></cart>
          <p class="cart-items-count">{{ totalItems }}</p>
        </div>
        <div class="login-box">
          <div class="button">My Account {{ currentUser.name }} &thinsp; &#x25BE;</div>
          <div class="drop-box-login">
            <ul class="drop-menu">
              <li><router-link class="drop-link" to="/login">Вход</router-link></li>
              <li><router-link class="drop-link" to="user-profile">Регистрация</router-link></li>
              <li><router-link class="drop-link" :to="{ name: 'user-profile', params: { id: currentUser.id } }">Мой профиль</router-link></li>
              <li><router-link class="drop-link" to="/login">Выход</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Search from '../app/Search.vue';
export default {
  name: 'AppHeader',
  components: {
    Search
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
.header {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.17);
  border: 1px solid #ececec;
  background-color: #ffffff;
}
.logo {
  color: #222222;
  font-size: 27px;
  font-weight: 300;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.logo-img {
  margin-right: 13px;
}
.logo-d {
  color: #f16d7f;
  font-weight: 400;
  letter-spacing: 0.68px;
}
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-form {
  display: flex;
  align-items: center;
  height: 38px;
  margin-left: 37px;
}
.header-form ::placeholder {
  color: #a4a4a4;
  font-size: 14px;
  font-weight: 300;
  /*    padding-left: 16px;*/
}
.browse {
  position: relative;
}
.browse-link {
  display: flex;
  align-items: center;
  color: #222222;
  font-size: 14px;
  height: 36px;
  font-weight: 300;
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 3px 0 0 3px;
  border: 1px solid #e6e6e6;
  background-color: #cdcdcc;
  background-image: linear-gradient(to bottom, #f9f9f9 0%, #f5f5f5 100%);
  text-decoration: none;
}
.browse:hover .drop-box {
  display: flex;
  top: 35px;
}
.drop-box, .drop-box-cart, .drop-box-login {
  border: 1px solid #ececec;
  border-radius: 5px;
  background-color: #ffffff;
  position: absolute;
  top: 50px;
  left: -10px;
  padding: 20px;
  z-index: 1;
}
.drop-box, .drop-box-login {
  display: none;
}
.drop-box:before {
  content: "";
  display: block;
  height: 14px;
  width: 14px;
  background-color: #ffffff;
  position: absolute;
  top: -8px;
  left: 31px;
  transform: rotate(45deg);
  border-top: 1px solid #ececec;
  border-left: 1px solid #ececec;
}
.drop-flex {
  margin-right: 46px;
}
.drop-flex:last-of-type {
  margin-right: 0;
}
.drop-heading {
  color: #232323;
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  border-bottom: 1px solid #e8e8e8;
  width: 235px;
  padding-bottom: 8px;
  margin-bottom: 8px;
}
.drop-menu {
  list-style-type: none;
}
.drop-link {
  color: #646464;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.35px;
  text-decoration: none;
  line-height: 28px;
  transition: color 0.3s ease;
}
.drop-link:hover {
  color: #f16d7f;
}
.header-right {
  display: flex;
  align-items: center;
}
.cart {
  margin-right: 26px;
  position: relative;
}
.cart-box, .login-box {
  position: relative;
}
.login-box:hover .drop-box-login {
  display: block;
  top: 38px;
  left: 0px;
}
</style>

