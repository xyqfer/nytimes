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
          if (pockList) {
            pockList.unshift(item);
          } else {
            pockList = [item];
          }

          this.$lf.setItem(lfKey, pockList).then(() => {
            this.showNotificationFull('收藏成功');
          }).catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    showNotificationFull(text) {
      if (!this.notificationFull) {
        this.notificationFull = this.$f7.notification.create({
          title: '? × 🌀',
          titleRightText: 'now',
          text,
          closeTimeout: 1200,
        });
      }

      this.notificationFull.open();
    },
  },
};

export default mixin;
