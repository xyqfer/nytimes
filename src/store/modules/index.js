import localforage from "localforage";
import http from '@/utils/http';
import api from '@/utils/api';

localforage.config({
  name: "liangliang.poliwag"
});

const commonRegion = [
  'nyt-cn', 
  'nyt-today',
  'nyt-book'
];
const modules = {};

commonRegion.forEach(region => {
  modules[region] = {
    namespaced: true,

    state: {
      data: []
    },

    mutations: {
      update(state, data) {
        state.data = data;
      }
    },

    actions: {
      getData({ commit }) {
        const storageKey = `/list/${region}`;

        return new Promise((resovle, reject) => {
          localforage.getItem(storageKey)
            .then((data) => {
              if (data) {
                commit('update', data);
              }
            })
            .catch(err => console.log(err));

          http
            .get(api[region])
            .then(res => {
              if (res.success) {
                localforage.setItem(storageKey, res.data).catch(err => {
                  console.log(err);
                });
                commit('update', res.data);
                resovle();
              } else {
                reject();
              }
            })
            .catch(err => {
              console.log(err);
              reject();
            });
        });
      }
    }
  };
});

export default modules;