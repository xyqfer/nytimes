<template>
  <f7-page
    @page:init="onPageInit"
    @infinite="onInfinite"
    :infinite-preloader="showPreloader"
    :infinite="true"
  >
    <f7-navbar>
      <f7-nav-title>? × 🌀</f7-nav-title>
      <f7-nav-right>
        <f7-link
          popover-open=".page-input2"
          icon-md="material:location_searching">
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
        tab-link-active
        tab-link=""
        href="/i21st"
        :animate="false"
        text="色"
      >
      </f7-link>
      <f7-link
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
        :link="`/content?name=${item.url}&title=${item.title}&region=i21st`"
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
      href="/times"
    >
      <f7-icon
        md="material:palette"
      ></f7-icon>
    </f7-fab>

    <f7-popover
      ref="pageInput"
      class="page-input2"
    >
      <f7-list>
        <f7-list-item
          :link="false"
          title="页码"
        >
          <f7-input
            type="number"
            @keyup.enter.native="jumpPage"
            placeholder="1~175"
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
  f7Page, 
  f7Navbar, 
  f7NavTitle,
  f7List, 
  f7ListItem, 
  f7Link,
  f7Toolbar,
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
    f7Page,
    f7Navbar,
    f7NavTitle,
    f7List,
    f7ListItem,
    f7Link,
    f7Toolbar,
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
      p: 1,
      allowInfinite: true,
      showPreloader: true
    };
  },

  methods: {
    onPageInit() {
      this.getData();
    },

    onInfinite() {
      if (!this.allowInfinite) return;

      this.allowInfinite = false;
      this.getData().then(() => {
        this.showPreloader = this.allowInfinite = !(this.p > this.total);
      });
    },

    getData() {
      const name = this.name;

      return this.$http
        .get(`${api.i21st}?p=${this.p}`)
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length > 0) {
              this.newsList = this.newsList.concat(res.data);
              this.p = this.p + 1;
            } else {
              this.showPreloader = false;
              this.allowInfinite = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    jumpPage(e) {
      let page = +e.target.value;

      this.$refs.pageInput.f7Popover.close();
      this.p = page;
      this.newsList = [];
      this.getData();
    },
  }
};
</script>

<style lang="scss">
</style>
