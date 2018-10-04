import http from '@/utils/http';
import api from '@/utils/api';

const region = 'nyt-category';
const nytCategory = {
  namespaced: true,

  state: {
    data: []
  },

  mutations: {
    update(state, data) {
      state.data = state.data.concat(data);
    },

    reset(state) {
      state.data = [];
    }
  },

  actions: {
    getData({ commit }, { name, p }) {
      return new Promise((resovle, reject) => {
        http
          .get(`${api[region]}?name=${name}&p=${p}`)
          .then(res => {
            if (res.success) {
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

export default nytCategory;
