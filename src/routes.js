import Home from "./pages/Home.vue";
import Today from "./pages/Today.vue";
import Content from "./pages/Content.vue";
import Content2 from "./pages/Content2.vue";
import TE from "./pages/TE.vue";
import TE2 from "./pages/TE2.vue";
import Times from "./pages/Times.vue";
import Wanqu from "./pages/Wanqu.vue";
import WanquRandom from "./pages/WanquRandom.vue";
import WanquHot from "./pages/WanquHot.vue";

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
    path: "/wanqu",
    component: Wanqu
  },
  {
    path: "/wanqu-random",
    component: WanquRandom
  },
  {
    path: "/wanqu-hot",
    component: WanquHot
  },
  {
    path: "/category/:name",
    async(routeTo, routeFrom, resolve, reject) {
      const vueComponent = () => import('./pages/Category.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default })
      });
    },
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
    path: "/menu",
    async(routeTo, routeFrom, resolve, reject) {
      const vueComponent = () => import('./pages/Menu.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default })
      });
    },
  },
  {
    path: "(.*)",
    component: NotFound
  }
];
