import { RouteConfig } from 'vue-router';
import store from '../store';

const generalRoutes: Array<RouteConfig> = [
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
]

export default generalRoutes;
