import Home from './pages/Home.vue';
import Category from './pages/Category.vue';
import Content from './pages/Content.vue';
import Menu from './pages/Menu.vue';

import NotFound from './pages/404.vue';

// Pages
export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/category/:name',
    component: Category,
  },
  {
    path: '/content',
    component: Content,
  },
  {
    path: '/menu',
    component: Menu,
  },
  {
    path: '(.*)',
    component: NotFound,
  },
];
