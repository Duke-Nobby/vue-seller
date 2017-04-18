import Vue from 'vue';
import Router from 'vue-router';
import goods from "@/components/goods/goods";
import rating from "@/components/rating/rating";
import seller from "@/components/seller/seller";
import VueResource from 'vue-resource';

Vue.use(Router);
Vue.use(VueResource);

export default new Router({
  linkActiveClass: "active",
  routes: [
    {
      path: '/',
      component: goods
    },
    {
      path: '/goods',
      name: "goods",
      component: goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    {
      path: '/rating',
      rating: 'rating',
      component: rating
    },

  ]
})
