import Tab1 from "./pages/Tab1.vue";
import Tab2 from "./pages/Tab2.vue";
import Tab3 from "./pages/Tab3.vue";
import Tab4 from "./pages/Tab4.vue";
import Tab5 from "./pages/Tab5.vue";
import TEGbr from "./pages/TE-Gbr.vue";
import TEMagazine from "./pages/TE-Magazine.vue";
import WanquRandom from "./pages/WanquRandom.vue";
import WanquHot from "./pages/WanquHot.vue";
import Content from "./pages/Content.vue";
import Content2 from "./pages/Content2.vue";
import Subtitle from "./pages/Subtitle.vue";

import NotFound from "./pages/404.vue";

// Pages
export default [
  {
    path: "/",
    component: Tab1
  },
  {
    path: "/nyt-today",
    async(routeTo, routeFrom, resolve) {
      const vueComponent = () => import('./pages/NYT-Today.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default });
      });
    },
  },
  {
    path: "/nyt-book",
    async(routeTo, routeFrom, resolve) {
      const vueComponent = () => import('./pages/NYT-Book.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default });
      });
    },
  },
  {
    path: "/te-today",
    component: Tab2
  },
  {
    path: "/te-gbr",
    component: TEGbr
  },
  {
    path: "/te-magazine",
    component: TEMagazine
  },
  {
    path: "/wanqu",
    component: Tab3
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
    path: "/i21st",
    component: Tab4
  },
  {
    path: "/times",
    async(routeTo, routeFrom, resolve) {
      const vueComponent = () => import('./pages/Times.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default });
      });
    },
  },
  {
    path: "/subtitle",
    component: Subtitle
  },
  {
    path: "/pocket",
    component: Tab5
  },
  {
    path: "/paper",
    async(routeTo, routeFrom, resolve) {
      const vueComponent = () => import('./pages/Paper.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default });
      });
    },
  },
  {
    path: "/nyt-category/:name",
    async(routeTo, routeFrom, resolve) {
      const vueComponent = () => import('./pages/NYT-Category.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default });
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
    path: "/theater",
    async(routeTo, routeFrom, resolve) {
      const vueComponent = () => import('./pages/Theater.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default });
      });
    },
  },
  {
    path: "/menu",
    async(routeTo, routeFrom, resolve) {
      const vueComponent = () => import('./pages/Menu.vue');
      vueComponent().then((vc) => {
        resolve({ component: vc.default });
      });
    },
  },
  {
    path: "(.*)",
    component: NotFound
  }
];
