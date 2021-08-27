import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/register',
    name: 'register',
    component: () => import('./../pages/Register/Register.vue'),

    meta: {
      publicRoute: true,
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home/Home.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
