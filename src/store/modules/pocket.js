import localforage from "localforage";

localforage.config({
  name: "liangliang.poliwag"
});

const storageKey = "/pocket";
const pocket = {
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
      return new Promise((resovle, reject) => {
        localforage
          .getItem(storageKey)
          .then(data => {
            if (data) {
              commit("update", data);
            }

            resovle(data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },

    updateData({ commit }, data) {
      return new Promise((resolve, reject) => {
        localforage
          .setItem(storageKey, data)
          .then(() => {
            commit("update", data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
  }
};

export default pocket;
