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
      background-color: #eee;
      background-image: url(~@/assets/img/background_1.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      .message {
        max-width: 95%;
      }

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
            margin-top: 6px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.14);
            text-transform: initial;
          }
        }

        .message-footer {
          width: 100%;
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

.message-received {
  .message-bubble {
    .message-text {
      font-family: 'medium-content-serif-font', Georgia, serif;
      font-size: 18px;
      line-height: 1.4;
    }
  }
}
</style>
