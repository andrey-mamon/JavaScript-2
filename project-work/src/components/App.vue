<template>
  <layout-default @search="handleSearchClick" @login="handleAccountClick">
    <router-view
      :query="filterValue"
      :isVisibleLogin="isVisibleLogin"
      @submit="handleLoginClick"
      @buy="handleBuyClick"
    />
  </layout-default>
</template>

<script>
import LayoutDefault from './layout/LayoutDefault.vue';
import config from '../../config';
const API_URL = config[process.env.NODE_ENV].api;
export default {
  name: 'App',
  components: {
    LayoutDefault,
  },
  data() {
    return {
      currentUserId: '',
      currentUser: {
        id: '',
        username: ''
      },
      filterValue: '',
      cart: [],
      isVisibleCart: false,
      isVisibleLogin: true,
      errorAlert: false
    }
  },
  mounted() {
    // Получить из localStorage ID текущего пользователя
    if (localStorage.currentUserId) {
      this.currentUserId = localStorage.currentUserId;
      this.currentUser.id = localStorage.currentUserId;
    }
    // Получить с сервера имя пользователя по ID
    // Если данные есть, то занести их в объект currentUser {id, username}
    // username отобразить на кнопке Аккаунта

    // Получить только товары текущего пользователя
    fetch(`${API_URL}/users/${this.currentUserId}/cart`)
      .then(response => response.json())
      .then((items) => {
        this.cart = items;
      })
      .catch((error) => {
        this.errorAlert = true;
      });
  },
  methods: {
    login() {
      // Отобразить окно ввода учетных данных
      // handleLoginClick(username, password)
    },
    handleSearchClick(searchQuery) {
      this.filterValue = searchQuery;
    },
    handleCartClick() {
      this.isVisibleCart = !this.isVisibleCart;
    },
    handleAccountClick() {
      alert("Login");
      this.isVisibleLogin = !this.isVisibleLogin;
    },
    handleBuyClick(item) {
      alert("Buy");
    },
    handleLoginClick(username, password) {
      // alert("Login Click");
      console.log(username, password);
      // Проверка данных текущего пользователя
      fetch(`${API_URL}/users/?username=${username}&password=${password}`)
        .then(response => response.json())
        .then((items) => {
          console.log(items);
          console.log(items[0].id);
          // Ответ приходит всегда. Массив пользователей, если они найдены и пусто, если что-то не так
          // Если длина массива = 0 или > 1, то выдать ошибку авторизации
          // Иначе currentUser = {id, username}
          // и внести ID в localStorage
          this.currentUserId = items[0].id;
          localStorage.currentUserId = this.currentUserId;
        })
        .then(() => {
          console.log(this.currentUserId);
        })
        .then(() => {
          // getCart();
          fetch(`${API_URL}/users/${this.currentUserId}/cart`)
            .then(response => response.json())
            .then((items) => {
              this.cart = items;
            })
            .catch((error) => {
              this.errorAlert = true;
            });
            })
            .catch((error) => {
              this.errorAlert = true;
        }); 
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/main.scss';
</style>
