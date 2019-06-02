import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const PageHome = () => import(/* webpack-chunk-name: "PageHome" */ './components/pages/PageHome.vue');
const PageLogin = () => import(/* webpack-chunk-name: "PageLogin" */ './components/pages/PageLogin.vue');
const PageUserProfile = () => import(/* webpack-chunk-name: "PageUserProfile" */ './components/pages/PageUserProfile.vue');
const PageProductSingle = () => import(/* webpack-chunk-name: "PageProductSingle" */ './components/pages/PageProductSingle.vue');

export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: PageHome,
    },
    {
      name: 'login',
      path: '/login',
      component: PageLogin,
    },
    {
      name: 'user-profile',
      path: '/users/:id',
      component: PageUserProfile,
      props: true,
    },
    {
      name: 'product-single',
      path: '/products/:id',
      component: PageProductSingle,
      props: true,
    }
  ],
  mode: 'history',
})