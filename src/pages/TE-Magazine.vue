<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">

    <poliwag-navbar 
      title="The Economist"
      back-link="返回"
      class="bg-color-red">
    </poliwag-navbar>

    <f7-block v-if="pageData.cover">
      <img 
        class="cover"
        :src="pageData.cover.img" 
        :alt="pageData.cover.topic">
    </f7-block>

    <f7-list
      media-list
      class="news-list">
      <f7-list-group 
        v-for="group in pageData.list"
        :key="group.title">

        <f7-list-item 
          group-title
          class="bg-color-red text-color-white"
          :title="group.title">
        </f7-list-item>

        <f7-list-item
          v-for="item in group.list"
          header=" "
          :key="item.url"
          :link="formatLink(item)">

          <div slot="header" class="text-color-red">
            {{item.flyTitle}}
          </div>
          <div slot="title">
            {{item.title}}
          </div>
        </f7-list-item>
      </f7-list-group>
    </f7-list>

  </f7-page>
</template>

<script>
import { f7ListGroup } from "framework7-vue";
import mixin from "@/mixin";

export default {
  components: {
    f7ListGroup
  },

  mixins: [mixin],

  data() {
    return {
      region: "te-magazine"
    };
  },

  methods: {
    formatLink(item) {
      return `/content?url=${encodeURIComponent(item.url)}&title=${item.title ||
        ""}&region=te`;
    }
  },

  computed: {
    pageData() {
      return this.$store.state[this.region].data;
    },

    "pageData.list"() {
      return this.$store.state[this.region].data.list.map(item => {
        item.link = this.formatLink(item);
        return item;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.cover {
  display: block;
  width: 80%;
  margin: auto;
}
</style>
