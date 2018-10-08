import Vue from "vue";
import Framework7 from "framework7/framework7.esm.bundle";
import Framework7Vue from "framework7-vue";
import localforage from "localforage";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

import "framework7/css/framework7.md.css";
import "./assets/css/app.scss";

Framework7.use(Framework7Vue);

localforage.config({
  name: "liangliang.poliwag"
});

Vue.config.productionTip = false;

Vue.prototype.$http = {
  get(config) {
    if (typeof config === "string") {
      config = {
        url: config
      };
    }

    return new Promise((resolve, reject) => {
      Framework7.request(
        Object.assign(
          {},
          {
            method: "GET",
            dataType: "json",
            cache: false,
            success: result => {
              resolve(result);
            },
            error: (xhr, status) => {
              console.log(status);
              reject(xhr, status);
            }
          },
          config
        )
      );
    });
  },

  post(config = {}) {
    return new Promise((resolve, reject) => {
      Framework7.request(
        Object.assign(
          {},
          {
            method: "POST",
            dataType: "json",
            cache: false,
            success: result => {
              resolve(result);
            },
            error: (xhr, status) => {
              console.log(status);
              reject(xhr, status);
            }
          },
          config
        )
      );
    });
  }
};

Vue.prototype.$lf = localforage;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
