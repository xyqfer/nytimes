<template>
  <f7-app :params="f7Params">
    <f7-statusbar></f7-statusbar>
    <f7-view
      url="/"
      :main="true"
      :push-state="true"
      :push-state-root="pushStateRoot"
      :stack-pages="true"
      class="ios-edges">
    </f7-view>
  </f7-app>
</template>
<script>
  import {
    f7App,
    f7Panel,
    f7View,
    f7Statusbar,
  } from 'framework7-vue';
  import routes from './routes';

  export default {
    components: {
      f7App,
      f7Panel,
      f7View,
      f7Statusbar,
    },

    data() {
      let theme = 'md';

      return {
        f7Params: {
          theme,
          routes,
          id: 'm.nytimes',
        },
        pushStateRoot: '/',
      };
    },
  };
</script>

<style lang="scss">
  @import "~@/assets/css/framework7.css";
  @import "~@/assets/css/app.css";

  .ios,
  .md {
    .news-list {
      margin-top: 0;

      .item-title {
        font-weight: 600;
      }
    }
  }
</style>
