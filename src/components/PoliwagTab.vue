<template>
  <f7-toolbar tabbar>
    <f7-link
      v-for="tab in tabs"
      :tab-link-active="tab.name === current"
      :key="tab.name"
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
          name: "home",
          link: "/",
          text: "声"
        },
        {
          name: "i21st",
          link: "/i21st",
          text: "色"
        },
        {
          name: "wanqu",
          link: "/wanqu",
          text: "🌀"
        },
        {
          name: "te",
          link: "/te",
          text: "犬"
        },
        {
          name: "pocket",
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
