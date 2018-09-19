<template>
  <f7-page
    @page:init="onPageInit"
  >
    <f7-navbar>
      <f7-nav-title>? × 🌀</f7-nav-title>
    </f7-navbar>

    <f7-toolbar tabbar>
      <f7-link
        v-for="item in tab"
        :tab-link-active="item.name === name"
        :key="item.name"
        tab-link=""
        :href="item.link"
        :animate="false"
        :text="item.text"
      >
      </f7-link>
    </f7-toolbar>

    <f7-list
      media-list
      class="news-list"
    >
      <f7-list-item
        swipeout
        v-for="(item, index) in pockList"
        :key="index"
        :link="item.url"
      >
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
        <f7-swipeout-actions right>
          <f7-swipeout-button 
            delete
            @click="deletePocket(index)"
          >
            Delete
          </f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
import { 
  f7Page, 
  f7Navbar, 
  f7NavTitle,
  f7List, 
  f7ListItem, 
  f7Link,
  f7Toolbar,
  f7Icon,
  f7SwipeoutActions,
  f7SwipeoutButton,
} from "framework7-vue";
import tab from "@/tab";

export default {
  components: {
    f7Page, 
    f7Navbar, 
    f7NavTitle,
    f7List, 
    f7ListItem, 
    f7Link,
    f7Toolbar,
    f7Icon,
    f7SwipeoutActions,
    f7SwipeoutButton,
  },

  data() {
    return {
      name: 'pocket',
      tab: [],
      pockList: [],
      lfKey: '/pocket',
    };
  },

  created() {
    this.tab = tab;
  },

  methods: {
    onPageInit() {
      this.getData();
    },

    getData() {
      this.$lf
      .getItem(this.lfKey)
      .then(pockList => {
        if (pockList) {
          this.pockList = pockList;
        }
      })
      .catch(err => {
        console.log(err);
      });
    },

    deletePocket(index) {
      let pockList = [...this.pockList];
      pockList.splice(index, 1);

      this.$nextTick(() => {
        this.$lf.setItem(this.lfKey, pockList).then(() => {
          this.showNotificationFull();
        }).catch(err => {
          console.log(err);
        });
      });
    },

    showNotificationFull() {
      const self = this;

      if (!self.notificationFull) {
        self.notificationFull = self.$f7.notification.create({
          title: '? × 🌀',
          titleRightText: 'Now',
          text: 'Deleted',
          closeTimeout: 1200,
        });
      }
      self.notificationFull.open();
    },
  }
};
</script>

<style lang="scss">
</style>
