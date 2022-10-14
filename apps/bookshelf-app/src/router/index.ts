import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import bookRoutes from './BookRoutes';
import authRoutes from './AuthRoutes';
import collectionRoutes from './CollectionRoutes';
import generalRoutes from './GeneralRoutes';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...bookRoutes,
  ...authRoutes,
  ...collectionRoutes,
  ...generalRoutes
];

console.log(process.env.BASE_URL);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
