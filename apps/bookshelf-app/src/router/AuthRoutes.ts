import { RouteConfig } from 'vue-router';

const authRoutes: Array<RouteConfig> = [
  {
    path: '/register',
    name: 'register',
    component: () => import('./../pages/Register/Register.vue'),
    meta: {
      view: 'EmptyView',
      publicRoute: true,
    },
  },
]

export default authRoutes
