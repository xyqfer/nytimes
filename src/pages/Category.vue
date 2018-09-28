<template>
  <f7-page
    @page:init="onPageInit"
    @infinite="onInfinite"
    :infinite-preloader="showPreloader"
    :infinite="true"
  >
    <f7-navbar
      :title="title"
      back-link="返回"
    >
      <f7-nav-right>
        <f7-link
          popover-open=".page-input"
          icon-md="material:location_searching">
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

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

    <f7-popover
      class="page-input"
    >
      <f7-list>
        <f7-list-item
          :link="false"
          title="乱序模式"
        >
          <f7-toggle 
            color="blue"
            @toggle:change="onToggleChange"
          ></f7-toggle>
        </f7-list-item>
      </f7-list>
    </f7-popover>

  </f7-page>
</template>

<script>
import { 
  f7Page, 
  f7Navbar, 
  f7List, 
  f7ListItem, 
  f7Link,
  f7NavRight,
  f7Popover,
  f7SwipeoutActions,
  f7SwipeoutButton,
  f7Toggle,
} from "framework7-vue";
import mixin from "@/mixin";

export default {
  created() {
    this.name = this.$f7route.params.name;
    this.title = this.$f7route.query.title;
  },

  components: {
    f7Page,
    f7Navbar,
    f7List,
    f7ListItem,
    f7Link,
    f7NavRight,
    f7Popover,
    f7SwipeoutActions,
    f7SwipeoutButton,
    f7Toggle,
  },

  mixins: [mixin],

  data() {
    return {
      newsList: [],
      name: "",
      title: "",
      p: 1,
      allowInfinite: true,
      showPreloader: true,
      maxPage: 386,
      isRandom: false,
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
        this.allowInfinite = true;
      });
    },

    getData() {
      const name = this.name;

      return this.$http
        .get(`${this.api.category}/${name}?p=${this.p}`)
        .then(res => {
          if (res.success) {
            if (res.data && res.data.length > 0) {
              this.newsList = this.newsList.concat(res.data);
              this.p = this.isRandom ? this.getRandomPage() : this.p + 1;
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

    onToggleChange(isRandom) {
      this.isRandom = isRandom;
      this.newsList = [];
      this.p = isRandom ? this.getRandomPage() : 1;
      
      if (!this.allowInfinite) return;

      this.allowInfinite = false;
      this.getData().then(() => {
        this.allowInfinite = true;
      });
    },

    getRandomPage() {
      return Math.floor(1 + Math.random() * this.maxPage);
    },

    formatLink(item) {
      return `/content?name=${item.url}&title=${item.title}&region=nyt-cn`;
    },
  }
};
</script>

<style lang="scss">
</style>
