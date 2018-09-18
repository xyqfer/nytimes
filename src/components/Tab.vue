<template>
  <f7-toolbar tabbar>
    <f7-link
      v-for="item in tab"
      :tab-link-active="item.name === name"
      :key="item.name"
      tab-link=""
      :href="item.link"
      :animate="false"
      :text="item.text"
    >
    </f7-link>
  </f7-toolbar>
</template>

<script>
import {
  f7Link,
  f7Toolbar,
} from "framework7-vue";

export default {
  components: {
    f7Link,
    f7Toolbar,
  },

  extends: f7Toolbar,

  data() {
    return {
      tab: [
        {
          name: 'home',
          link: '/',
          text: '声',
        }, {
          name: 'i21st',
          link: '/i21st',
          text: '色',
        }, {
          name: 'wanqu',
          link: '/wanqu',
          text: '🌀',
        }, {
          name: 'te',
          link: '/te',
          text: '犬',
        }, {
          name: 'pocket',
          link: '/pocket',
          text: '马',
        }
      ],
    };
  },

  props: {
    name: {
      type: String,
      required: true,
    }
  }
};
</script>

<style scoped lang="scss">
</style>
