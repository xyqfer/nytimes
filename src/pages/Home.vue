<template>
  <f7-page
    @page:init="onPageInit"
    :ptr="true"
    @ptr:refresh="onRefresh"
    ref="homePage"
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
      <f7-nav-title>nytimes × 🌀</f7-nav-title>
    </f7-navbar>

    <f7-list
      media-list
      class="news-list"
    >
      <f7-list-item
        v-for="item in newsList"
        :key="item.url"
        :link="`/content?name=${item.url}&title=${item.title}`"
      >
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
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
    f7NavLeft,
    f7Link,
    f7Toolbar,
    f7List,
    f7ListItem,
    f7Icon,
  } from 'framework7-vue';
  import api from '@/api';

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
    },

    data() {
      return {
        newsList: [],
        lfKey: '/list/home/nyt-cn',
      };
    },

    created() {
      this.$lf.getItem(this.lfKey)
        .then((data) => {
          if (data) {
            this.newsList = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    methods: {
      onPageInit() {
        this.$nextTick(() => {
          this.$f7.ptr.get(this.$refs.homePage.$el.querySelector('.ptr-content')).refresh();
        });
      },

      onRefresh(e, done) {
        this.getData()
          .then(() => {
            done();
          });
      },

      getData() {
        return this.$http.get(api.home)
          .then((res) => {
            if (res.success) {
              this.newsList = res.data;
              this.$lf.setItem(this.lfKey, res.data)
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
</script>

<style scoped lang="scss">

</style>
