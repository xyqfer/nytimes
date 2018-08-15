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
    f7Page,
    f7Navbar,
    f7List,
    f7ListItem,
    f7Link,
  } from 'framework7-vue';
  import api from '@/api';

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
    },

    data() {
      return {
        newsList: [],
        name: '',
        title: '',
        p: 1,
        allowInfinite: true,
        showPreloader: true,
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

        return this.$http.get(`${api.category}/${name}?p=${this.p}`)
          .then((res) => {
            if (res.success) {
              if (res.data && res.data.length > 0) {
                this.newsList = this.newsList.concat(res.data);
                this.p = this.p + 1;
              } else {
                this.showPreloader = false;
                this.allowInfinite = false;
              }
            }
          }).catch((err) => {
            console.log(err);
          });
      },
    }
  };
</script>

<style lang="scss">

</style>
