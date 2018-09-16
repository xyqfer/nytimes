<template>
  <f7-page
    @page:init="onPageInit"
    :ptr="true"
    @ptr:refresh="onRefresh"
    ref="homePage"
    :hide-navbar-on-scroll="true"
  >
    <f7-navbar>
      <f7-nav-title>? × 🌀</f7-nav-title>
      <f7-nav-right>
        <f7-link
          popover-open=".search-input"
          icon-md="material:search">
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-toolbar tabbar>
      <f7-link
        tab-link=""
        href="/"
        :animate="false"
        text="声"
      >
      </f7-link>
      <f7-link
        tab-link=""
        href="/i21st"
        :animate="false"
        text="色"
      >
      </f7-link>
      <f7-link
        tab-link-active
        tab-link=""
        href="/wanqu"
        :animate="false"
        text="🌀"
      >
      </f7-link>
      <f7-link
        tab-link=""
        href="/te"
        :animate="false"
        text="犬"
      >
      </f7-link>
      <f7-link
        tab-link=""
        href="/te2"
        :animate="false"
        text="马"
      >
      </f7-link>
    </f7-toolbar>

    <f7-list
      media-list
      class="news-list"
    >
      <f7-list-item
        v-for="item in newsList"
        :key="item.url"
        :link="`/content2?name=${encodeURIComponent(item.url)}&title=${item.title}&region=wanqu`"
      >
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
      </f7-list-item>
    </f7-list>

    <f7-fab
      position="right-bottom"
      slot="fixed"
    >
      <f7-icon
        md="material:adjust"
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
          {{item.text}}
        </f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>

    <f7-popover
      ref="searchInput"
      class="search-input"
    >
      <f7-list>
        <f7-list-item
          :link="false"
          title="搜索"
        >
          <f7-input
            type="text"
            @keyup.enter.native="onFly"
            placeholder="请输入地址"
            clear-button
          >
          </f7-input>
        </f7-list-item>
      </f7-list>
    </f7-popover>

  </f7-page>
</template>

<script>
import {
  f7View,
  f7Panel,
  f7Page,
  f7Navbar,
  f7NavTitle,
  f7Link,
  f7Toolbar,
  f7List,
  f7ListItem,
  f7Icon,
  f7Fab,
  f7FabButtons,
  f7FabButton,
  f7NavRight,
  f7Popover,
  f7Input,
} from "framework7-vue";
import api from "@/api";

export default {
  components: {
    f7View,
    f7Panel,
    f7Page,
    f7Navbar,
    f7NavTitle,
    f7Link,
    f7Toolbar,
    f7List,
    f7ListItem,
    f7Icon,
    f7Fab,
    f7FabButtons,
    f7FabButton,
    f7NavRight,
    f7Popover,
    f7Input,
  },

  data() {
    return {
      newsList: [],
      lfKey: "/list/home/wanqu",
      fabConfig: [
        {
          text: '随机',
          url: '/wanqu-random',
        }, {
          text: '热门',
          url: '/wanqu-hot',
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
        .get(api.wanqu)
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

    onFly(e) {
      let url = e.target.value;
      this.$refs.searchInput.f7Popover.close();

      this.$f7router.navigate(`/content2?name=${encodeURIComponent(url)}&title=&region=wanqu`);
    },
  }
};
</script>

<style scoped lang="scss">
</style>
