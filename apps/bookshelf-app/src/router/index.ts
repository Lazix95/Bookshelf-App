import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from './../store';
import bookRoutes from './BookRoutes';
import authRoutes from './AuthRoutes';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...bookRoutes,
  ...authRoutes,

  {
    path: '/',
    name: 'landing',
    beforeEnter: async (to, from, next) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const isLoggedIn = store.getters['auth/isLoggedIn'];
      if (isLoggedIn) next({name: 'Books'});
      next();
    },
    component: () => import('./../pages/CtrLanding.vue'),
    meta: {
      view: 'EmptyView',
      publicRoute: true,
    }
  }
];

console.log(process.env.BASE_URL);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
