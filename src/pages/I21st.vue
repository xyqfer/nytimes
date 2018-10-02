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
        md="material:palette"
      ></f7-icon>
      <f7-icon
        md="material:close"
      ></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button
          v-for="item in fabConfig"
          :key="item.url"
        >
          <f7-link :href="item.url">
            <f7-icon :material="item.icon"></f7-icon>
          </f7-link>
        </f7-fab-button>
      </f7-fab-buttons>
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
  f7SwipeoutActions,
  f7SwipeoutButton,
} from "framework7-vue";
import mixin from "@/mixin";
import Tab from "@/components/Tab";

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
    f7SwipeoutActions,
    f7SwipeoutButton,
    Tab,
  },

  mixins: [mixin],

  data() {
    return {
      name: 'i21st',
      newsList: [],
      p: 1,
      allowInfinite: true,
      showPreloader: true,
      fabConfig: [
        {
          icon: 'tonality',
          url: '/times',
        }, {
          icon: 'timelapse',
          url: '/subtitles',
        }
      ],
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
        .get(`${this.api.i21st}?p=${this.p}`)
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

    formatLink(item) {
      return `/content?name=${item.url}&title=${item.title}&region=i21st`;
    },
  }
};
</script>

<style lang="scss">
</style>
