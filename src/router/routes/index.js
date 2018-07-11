/**
 * @file Routes
 */

export default [
  {
    path: '/',
    name: 'home',
    component: resolve => require(['../../views/home/index.vue'], resolve),
  },
  {
    path: '/article',
    component: resolve => require(['../../views/articles/index.vue'], resolve),
    children: [
      {
        path: ':id',
        name: 'article-detail',
        component: resolve => require(['../../views/articles/detail/index.vue'], resolve),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: resolve => require(['../../views/index/404.vue'], resolve),
  },
  {
    path: '*',
    redirect: '/404',
  },
]

