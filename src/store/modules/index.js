import localforage from "localforage";
import http from '@/utils/http';
import api from '@/utils/api';
import i21st from './i21st';
import nytCategory from './nyt-category';
import pocket from './pocket';

localforage.config({
  name: "liangliang.poliwag"
});

const regions = [
  'nyt-cn', 
  'nyt-today',
  'nyt-book',
  'te-gbr',
  'te-today',
  'te-magazine',
  'wanqu',
  'wanqu-hot',
  'wanqu-random',
  'times',
  'subtitle'
];
const specialRegions = ['te-magazine'];
const modules = {};

regions.forEach(region => {
  modules[region] = {
    namespaced: true,

    state: {
      data: specialRegions.includes(region) ? {} : []
    },

    mutations: {
      update(state, data) {
        state.data = data;
      }
    },

    actions: {
      getData({ commit }) {
        const storageKey = `/page/${region}`;

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

modules['i21st'] = i21st;
modules['nyt-category'] = nytCategory;
modules['pocket'] = pocket;

export default modules;