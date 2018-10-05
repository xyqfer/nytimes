<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">

    <poliwag-navbar 
      title="Today’s Paper"
      back-link="返回">
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
      region: 'nyt-today',
    };
  },

  methods: {
    formatLink(item) {
      return `/content?url=${encodeURIComponent(item.url)}&title=${item.title}&region=nyt`;
    }
  }
};
</script>
