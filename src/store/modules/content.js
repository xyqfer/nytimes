import http from "@/utils/http";
import api from "@/utils/api";
import localforage from "localforage";

localforage.config({
  name: "liangliang.poliwag"
});

const content = {
  namespaced: true,

  state: {
    data: [],
    contentGroup: {},
    progressGroup: {}
  },

  mutations: {
    setContent(state, { url, region, data }) {
      const key = `/${url}/${region}`;
      state.contentGroup[key] = data.content;
    },

    setProgress(state, { url, region, progress }) {
      state.progressGroup[`/${url}/${region}`] = progress;
    }
  },

  actions: {
    getContent({ commit }, { url, region }) {
      const storageKey = `/content/${url}/${region}`;

      return new Promise((resolve, reject) => {
        const fetchContent = () => {
          http
            .get(
              `${api["content"]}?url=${encodeURIComponent(
                url
              )}&region=${region}`
            )
            .then(({ success, data }) => {
              if (success) {
                commit("setContent", { url, region, data });
                resolve(data);
                localforage.setItem(storageKey, data);
              } else {
                reject();
              }
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        };

        localforage
          .getItem(storageKey)
          .then(data => {
            if (data) {
              commit("setContent", { url, region, data });
              resolve(data);
            } else {
              fetchContent();
            }
          })
          .catch(err => {
            console.log(err);
            fetchContent();
          });
      });
    },

    getProgress({ commit }, { url, region }) {
      const storageKey = `/progress/${url}/${region}`;

      return new Promise((resolve, reject) => {
        localforage
          .getItem(storageKey)
          .then(data => {
            let progress = data || 0;

            commit("setProgress", { url, region, progress });
            resolve(progress);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },

    setProgress({ commit }, { url, region, progress = 0 }) {
      const storageKey = `/progress/${url}/${region}`;

      return new Promise((resolve, reject) => {
        localforage
          .setItem(storageKey, progress)
          .then(() => {
            commit("setProgress", { url, region, progress });
            resolve(progress);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },

    clearStorage({ commit }, { url, region }) {
      const contentKey = `/content/${url}/${region}`;
      const progressKey = `/progress/${url}/${region}`;

      return Promise.all([
        localforage.removeItem(contentKey),
        localforage.removeItem(progressKey)
      ]).then(() => {
        commit("setProgress", { url, region, progress: 0 });
        commit("setContent", { url, region, data: {} });
      });
    }
  }
};

export default content;
