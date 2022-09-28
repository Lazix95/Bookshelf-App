import { RouteConfig } from 'vue-router';

const bookRoutes: Array<RouteConfig> = [
  {
    path: '/books/:bookID/details',
    name: 'Books.details',
    component: () => import('../pages/Books/CtrBookDetails.vue'),
    meta: {
      title: 'Book Details',
      edit: true,
      delete: true,
    },
  },

  {
    path: '/books',
    name: 'Books',
    component: () => import('../pages/Books/CtrBookList.vue'),
    meta: {
      title: 'Books',
      add: true,
    },
  },

  {
    path: '/books/:bookID',
    name: 'Books.edit',
    component: () => import('../pages/Books/CtrBookForm.vue'),
    meta: {
      title: 'Update Book',
    },
  },

  {
    path: '/books/add-new-book',
    name: 'Books.add',
    component: () => import('../pages/Books/CtrBookForm.vue'),
    meta: {
      title: 'Add New Book',
    },
  },
]

export default bookRoutes;
