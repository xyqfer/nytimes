<template>
  <f7-app :params="f7Params">
    <f7-statusbar></f7-statusbar>
    <f7-panel left cover>
      <f7-view
        url="/menu/"
        links-view=".view-main"
      ></f7-view>
    </f7-panel>
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
import { f7App, f7Panel, f7View, f7Statusbar } from "framework7-vue";
import routes from "./routes";

export default {
  components: {
    f7App,
    f7Panel,
    f7View,
    f7Statusbar
  },

  data() {
    let theme = "md";

    return {
      f7Params: {
        theme,
        routes,
        id: "liangliang.poliwag"
      },
      pushStateRoot: "/"
    };
  },

  created() {
    this.pushStateRoot = process.env.VUE_APP_BASE_URL;
  }
};
</script>
