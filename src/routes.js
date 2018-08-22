import Home from './pages/Home.vue';
import Today from './pages/Today.vue';
import Category from './pages/Category.vue';
import Content from './pages/Content.vue';
import Content2 from './pages/Content2.vue';
import Menu from './pages/Menu.vue';

import NotFound from './pages/404.vue';

// Pages
export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/today',
    component: Today,
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
    path: '/content2',
    component: Content2,
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
