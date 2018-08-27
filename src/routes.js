import Home from "./pages/Home.vue";
import Today from "./pages/Today.vue";
import Category from "./pages/Category.vue";
import Content from "./pages/Content.vue";
import Content2 from "./pages/Content2.vue";
import Content3 from "./pages/Content3.vue";
import Content4 from "./pages/Content4.vue";
import Content5 from "./pages/Content5.vue";
import Menu from "./pages/Menu.vue";
import TE from "./pages/TE.vue";
import TE2 from "./pages/TE2.vue";
import Times from "./pages/Times.vue";

import NotFound from "./pages/404.vue";

// Pages
export default [
  {
    path: "/",
    component: Home
  },
  {
    path: "/today",
    component: Today
  },
  {
    path: "/te",
    component: TE
  },
  {
    path: "/te2",
    component: TE2
  },
  {
    path: "/times",
    component: Times
  },
  {
    path: "/category/:name",
    component: Category
  },
  {
    path: "/content",
    component: Content
  },
  {
    path: "/content2",
    component: Content2
  },
  {
    path: "/content3",
    component: Content3
  },
  {
    path: "/content4",
    component: Content4
  },
  {
    path: "/content5",
    component: Content5
  },
  {
    path: "/menu",
    component: Menu
  },
  {
    path: "(.*)",
    component: NotFound
  }
];
