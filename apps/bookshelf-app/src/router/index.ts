import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/register',
    name: 'register',
    component: () => import('./../pages/Register/Register.vue'),

    meta: {
      view: 'EmptyView',
      publicRoute: true,
    },
  },
  {
    path: '',
    component: () => import('../pages/Books/Books.vue'),
    children: [
      {
        path: '',
        name: 'Books',
        component: () => import('../components/Books/BookList.vue'),
        meta: {
          title: 'Books',
          add: true,
        },
      },
      {
        path: '/book/:bookID',
        name: 'Books.edit',
        component: () => import('../components/Books/BookForm.vue'),
        meta: {
          title: 'Update Book',
        },
      },
      {
        path: '/book/:bookID/details',
        name: 'Books.details',
        component: () => import('../components/Books/BookDetails.vue'),
        meta: {
          title: 'Update Book',
        },
      },
      {
        path: 'add-new-book',
        name: 'Books.add',
        component: () => import('../components/Books/BookForm.vue'),
        meta: {
          title: 'Add New Book',
        },
      },
    ],
  },
];

console.log(process.env.BASE_URL);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
