<template>
  <f7-page
    @page:init="onPageInit"
    :ptr="true"
    @ptr:refresh="onRefresh"
    ref="homePage"
  >
    <f7-navbar
      title="Editors’ picks"
      back-link="返回"
      class="bg-color-red"
    >
    </f7-navbar>

    <f7-list
      media-list
      class="news-list"
    >
      <f7-list-item
        v-for="item in newsList"
        :key="item.url"
        header=" "
        :link="`/content2?name=${item.url}&title=${item.title}&region=te3`"
      >
        <div slot="header" class="text-color-red">
          {{item.flyTitle}}
        </div>
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
        <div slot="footer">
          <img 
            :src="item.img" 
            :alt="item.title"
            class="footer-img">
        </div>
      </f7-list-item>
    </f7-list>

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
  f7List,
  f7ListItem,
  f7Icon
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
    f7List,
    f7ListItem,
    f7Icon
  },

  data() {
    return {
      newsList: [],
      lfKey: "/list/home/te3"
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
        .get(api.te3)
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
    }
  }
};
</script>

<style scoped lang="scss">
  .footer-img {
    display: block;
    width: 100%;
    margin-top: 14px;
  }
</style>
