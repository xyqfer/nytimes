<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">

    <poliwag-navbar 
      title="Subtitle"
      back-link="返回">
    </poliwag-navbar>

    <f7-list
      media-list
      class="news-list">
      <f7-list-item
        v-for="item in pageData"
        :key="item.url"
        :header="item.category"
        :link="formatLink(item)">
        <div slot="title">
          {{item.articleId}}
        </div>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
import mixin from "@/mixin";

export default {
  mixins: [mixin],

  data() {
    return {
      region: "subtitle"
    };
  },

  methods: {
    formatLink(item) {
      return `/content?url=${item.articleId}&title=${
        item.articleId
      }&region=subtitle`;
    }
  }
};
</script>
