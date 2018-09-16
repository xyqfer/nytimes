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
        v-for="item in newsList"
        :key="item.url"
        :link="`/content?name=${item.url}&title=${item.title}&region=nyt-cn`"
      >
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
      </f7-list-item>
    </f7-list>

    <f7-popover
      ref="pageInput"
      class="page-input"
    >
      <f7-list>
        <f7-list-item
          :link="false"
          title="页码"
        >
          <f7-input
            type="number"
            @keyup.enter.native="jumpPage"
            placeholder="1~386"
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
  f7List, 
  f7ListItem, 
  f7Link,
  f7NavRight,
  f7Popover,
  f7Input,
} from "framework7-vue";
import api from "@/api";

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
    f7Input,
  },

  data() {
    return {
      newsList: [],
      name: "",
      title: "",
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
        .get(`${api.category}/${name}?p=${this.p}`)
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
