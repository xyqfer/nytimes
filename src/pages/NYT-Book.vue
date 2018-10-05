<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">
    
    <poliwag-navbar 
      title="Books"
      back-link="返回">
      <template slot="right">
        <f7-link
          href="https://www.nytimes.com/books/best-sellers/combined-print-and-e-book-nonfiction/"
          target="_blank"
          icon-md="material:all_out"
          :external="true">
        </f7-link>
      </template>
    </poliwag-navbar>

    <poliwag-list 
      :data="pageData"
      @swipeout-button:click="savePocket">
    </poliwag-list>

  </f7-page>
</template>

<script>
import mixin from "@/mixin";

export default {
  mixins: [mixin],

  data() {
    return {
      region: 'nyt-book',
    };
  },

  methods: {
    formatLink(item) {
      return `/content?url=${encodeURIComponent(item.url)}&title=${item.title}&region=nyt`;
    }
  }
};
</script>
