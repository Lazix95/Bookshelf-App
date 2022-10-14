import { RouteConfig } from 'vue-router';

const collectionRoutes: Array<RouteConfig> = [
  {
    path: '/collections',
    name: 'Collections',
    component: () => import('../pages/Collections/CtrCollectionsList.vue'),
    meta: {
      title: 'Collections',
      add: true,
    },
  },
]

export default collectionRoutes;
