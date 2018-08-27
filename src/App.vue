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
        id: "m.nytimes"
      },
      pushStateRoot: "/"
    };
  },

  created() {
    this.pushStateRoot = process.env.VUE_APP_BASE_URL;
  }
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
      white-space: initial;
    }

    .item-text {
      max-height: initial;
      display: block;
    }
  }
}

.ios,
.md {
  .view {
    .messages-page {
      background: initial;
      background-image: url(~@/assets/img/background_1.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      .messages-content {
        background: initial;

        .news-content-list {
          background: initial;

          .message-received {
            .message-bubble {
              background-color: #fff;
            }
          }

          .message-link {
            display: block;
            margin-top: 5px;
          }
        }
      }
    }
  }
}

.ios {
  .theme-dark {
    .view {
      .messages-page {
        .messages-content {
          .message-received {
            .message-bubble {
              background-color: #333;
            }
          }
        }
      }
    }
  }
}

.md {
  .theme-dark {
    .view {
      .messages-page {
        .messages-content {
          .message-received {
            .message-bubble {
              background-color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
