import api from "@/api";

const mixin = {
  data() {
    return {
      api: {},
    }
  },

  created() {
    this.api = api;
  },

  methods: {
    savePocket(obj) {
      const lfKey = '/pocket';
      let item = {...obj, url: this.formatLink(obj)};

      this.$lf
        .getItem(lfKey)
        .then(pockList => {
          if (!pockList) {
            pockList = [];
          }

          let index = pockList.findIndex((a) => {
            return a.url === item.url;
          });

          if (index === -1) {
            pockList.unshift(item);

            this.$lf
              .setItem(lfKey, pockList)
              .then(() => {
                this.showNotificationFull('Saved');
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.showNotificationFull('Duplicated');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    showNotificationFull(text) {
      this.$f7.notification.create({
        title: '? × 🌀',
        titleRightText: 'Now',
        text,
        closeTimeout: 1200,
      }).open();
    },
  },
};

export default mixin;
