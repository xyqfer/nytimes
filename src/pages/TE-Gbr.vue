<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">

    <poliwag-navbar 
      title="商论"
      back-link="返回"
      class="bg-color-red">
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
      region: "te-gbr"
    };
  },

  computed: {
    pageData() {
      return this.$store.state[this.region].data.map(item => {
        item.url = item.articleId;
        item.link = this.formatLink(item);
        return item;
      });
    }
  }
};
</script>
