<template>
  <f7-toolbar tabbar>
    <f7-link
      v-for="tab in tabs"
      :tab-link-active="tab.region === current"
      :key="tab.region"
      tab-link=""
      :href="tab.link"
      :animate="false"
      :text="tab.text"
    >
    </f7-link>
  </f7-toolbar>
</template>

<script>
import { f7Link, f7Toolbar } from "framework7-vue";

export default {
  components: {
    f7Link,
    f7Toolbar
  },

  extends: f7Toolbar,

  data() {
    return {
      tabs: [
        {
          region: "nyt-cn",
          link: "/",
          text: "声"
        },
        {
          region: "te-today",
          link: "/te-today",
          text: "色"
        },
        {
          region: "wanqu",
          link: "/wanqu",
          text: "🌀"
        },
        {
          region: "sciam",
          link: "/sciam",
          text: "犬"
        },
        {
          region: "pocket",
          link: "/pocket",
          text: "马"
        }
      ]
    };
  },

  props: {
    current: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
</style>
