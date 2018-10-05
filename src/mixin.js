import {
  f7Page,
  f7Link,
  f7Toolbar,
  f7List,
  f7ListItem,
  f7Icon,
  f7Popover,
  f7Block
} from "framework7-vue";
import PoliwagTab from "@/components/PoliwagTab";
import PoliwagFab from "@/components/PoliwagFab";
import PoliwagNavbar from "@/components/PoliwagNavbar";
import PoliwagList from "@/components/PoliwagList";

const mixin = {
  components: {
    f7Page,
    f7Link,
    f7Toolbar,
    f7List,
    f7ListItem,
    f7Icon,
    f7Popover,
    f7Block,
    PoliwagTab,
    PoliwagFab,
    PoliwagNavbar,
    PoliwagList
  },

  data() {
    return {};
  },

  methods: {
    getData() {
      return this.$store.dispatch(`${this.region}/getData`);
    },

    onPageInit() {
      this.triggerRefresh();
    },

    triggerRefresh() {
      this.$nextTick(() => {
        this.$f7.ptr
          .get(this.$refs[this.pageRef].$el.querySelector(".ptr-content"))
          .refresh();
      });
    },

    onRefresh(e, done) {
      this.getData()
        .then()
        .catch(err => console.log(err))
        .finally(done);
    },

    savePocket(obj) {
      const lfKey = "/pocket";
      let item = { ...obj, url: this.formatLink(obj) };

      this.$lf
        .getItem(lfKey)
        .then(pockList => {
          if (!pockList) {
            pockList = [];
          }

          let index = pockList.findIndex(a => {
            return a.url === item.url;
          });

          if (index === -1) {
            pockList.unshift(item);

            this.$lf
              .setItem(lfKey, pockList)
              .then(() => {
                this.showNotification("Saved");
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            this.showNotification("Duplicated");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    showNotification(text) {
      this.$f7.notification
        .create({
          title: "Poliwag × 🌀",
          titleRightText: "Now",
          text,
          closeTimeout: 1200
        })
        .open();
    },

    formatLink(item) {
      return `/content?url=${encodeURIComponent(item.url)}&title=${item.title ||
        ""}&region=${this.region}`;
    }
  },

  computed: {
    pageData() {
      return this.$store.state[this.region].data.map(item => {
        item.link = this.formatLink(item);
        return item;
      });
    },

    pageRef() {
      return `ref-${this.region}`;
    }
  }
};

export default mixin;
