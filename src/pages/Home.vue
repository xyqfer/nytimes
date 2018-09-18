<template>
  <f7-page
    @page:init="onPageInit"
    :ptr="true"
    @ptr:refresh="onRefresh"
    ref="homePage"
    :hide-navbar-on-scroll="true"
  >
    <f7-navbar>
      <f7-nav-left>
        <f7-link
          icon-ios="f7:bars"
          icon-md="material:menu"
          panel-open="left"
        >
        </f7-link>
      </f7-nav-left>
      <f7-nav-title>? × 🌀</f7-nav-title>
    </f7-navbar>

    <tab :name="name"></tab>

    <f7-list
      media-list
      class="news-list"
    >
      <f7-list-item
        swipeout
        v-for="item in newsList"
        :key="item.url"
        :link="formatLink(item)"
      >
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
        <f7-swipeout-actions right>
          <f7-swipeout-button 
            color="blue"
            close
            @click="savePocket(item)"
          >
            Save
          </f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

    <f7-fab
      position="right-bottom"
      slot="fixed"
    >
      <f7-icon
        md="material:adb"
      ></f7-icon>
      <f7-icon
        md="material:close"
      ></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button
          v-for="item in fabConfig"
          :key="item.url"
          @click="onFabClick(item.url)"
        >
          <f7-icon :material="item.icon"></f7-icon>
        </f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

  </f7-page>
</template>

<script>
import {
  f7View,
  f7Panel,
  f7Page,
  f7Navbar,
  f7NavTitle,
  f7NavLeft,
  f7Link,
  f7Toolbar,
  f7List,
  f7ListItem,
  f7Icon,
  f7Fab,
  f7FabButtons,
  f7FabButton,
  f7SwipeoutActions,
  f7SwipeoutButton,
} from "framework7-vue";
import mixin from "@/mixin";
import Tab from "@/components/Tab";

export default {
  components: {
    f7View,
    f7Panel,
    f7Page,
    f7Navbar,
    f7NavTitle,
    f7NavLeft,
    f7Link,
    f7Toolbar,
    f7List,
    f7ListItem,
    f7Icon,
    f7Fab,
    f7FabButtons,
    f7FabButton,
    f7SwipeoutActions,
    f7SwipeoutButton,
    Tab,
  },

  mixins: [mixin],

  data() {
    return {
      name: 'home',
      newsList: [],
      lfKey: "/list/home/nyt-cn",
      fabConfig: [
        {
          icon: 'cloud_circle',
          url: '/book',
        }, {
          icon: 'av_timer',
          url: '/today',
        }
      ],
    };
  },

  created() {
    this.$lf
      .getItem(this.lfKey)
      .then(data => {
        if (data) {
          this.newsList = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    onPageInit() {
      this.$nextTick(() => {
        this.$f7.ptr
          .get(this.$refs.homePage.$el.querySelector(".ptr-content"))
          .refresh();
      });
    },

    onRefresh(e, done) {
      this.getData().then(() => {
        done();
      });
    },

    getData() {
      return this.$http
        .get(this.api.home)
        .then(res => {
          if (res.success) {
            this.newsList = res.data;
            this.$lf.setItem(this.lfKey, res.data).catch(err => {
              console.log(err);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    onFabClick(url) {
      this.$f7router.navigate(url);
    },

    formatLink(item) {
      return `/content?name=${item.url}&title=${item.title}&region=nyt-cn`;
    },
  }
};
</script>

<style scoped lang="scss">
</style>
