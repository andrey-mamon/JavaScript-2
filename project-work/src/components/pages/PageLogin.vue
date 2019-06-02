<template>
  <div class="container">
    <form class="login" @submit.prevent="login">
      <h2>Sign in</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label>User name</label><br>
      <input class="search-text" required v-model="username" type="text" autocomplete="username" placeholder="Login"/><br>
      <label>Password</label><br>
      <input class="search-text" required v-model="password" type="password" autocomplete="current-password" placeholder="Password"/><br>
      <hr/>
      <button class="button" type="submit">LOG IN</button>
      <router-link class="button" to="user-profile">REGISTER</router-link>
    </form>
  </div>
</template>

<script>
import config from '../../../config';
const API_URL = config[process.env.NODE_ENV].api;
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    login () {
      fetch(`${API_URL}/users/?username=${this.username}&password=${this.password}`)
        .then(response => response.json())
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (users) {
      if (!users[0]) {
        this.loginFailed();
        return;
      }
      // Ответ приходит всегда. Массив пользователей, если они найдены и пусто, если что-то не так
      // Если длина массива = 0 или > 1, то выдать ошибку авторизации
      // Иначе currentUser = {id, username}
      // и внести ID в localStorage
      this.error = false;
      localStorage.currentUserId = users[0].id;
      this.$router.replace(this.$route.query.redirect || `/user-single/${users[0].id}`);
    },
    loginFailed () {
      this.error = 'Login failed!';
      delete localStorage.currentUserId;
    },
    handleLoginClick(username, password) {
      this.$emit('submit', this.username, this.password);
    },
    handleRegisterClick(item) {
      this.$emit('register', item);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/main.scss';
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
.alert {
  color: red;
}
</style>