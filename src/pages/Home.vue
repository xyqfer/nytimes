<template>
  <f7-page
    @page:init="onPageInit"
  >
    <f7-navbar>
      <f7-nav-left>
        <f7-link
          icon-ios="f7:bars"
          icon-md="material:menu">
        </f7-link>
      </f7-nav-left>
      <f7-nav-title>nytimes × 🌀</f7-nav-title>
    </f7-navbar>

    <f7-block
      class="text-align-center"
      v-if="isLoading">
      <f7-preloader></f7-preloader>
    </f7-block>

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
    f7Page,
    f7Navbar,
    f7NavTitle,
    f7NavLeft,
    f7Link,
    f7BlockTitle,
    f7Toolbar,
    f7List,
    f7ListItem,
    f7Icon,
    f7Block,
    f7Preloader,
  } from 'framework7-vue';
  import api from '@/api';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavTitle,
      f7NavLeft,
      f7Link,
      f7BlockTitle,
      f7Toolbar,
      f7List,
      f7ListItem,
      f7Icon,
      f7Block,
      f7Preloader,
    },

    data() {
      return {
        isLoading: true,
        newsList: [],
      };
    },

    methods: {
      onPageInit() {
        this.$http.get(api.home)
          .then((res) => {
            if (res.success) {
              this.newsList = res.data;
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
    },
  };
</script>

<style scoped lang="scss">

</style>
