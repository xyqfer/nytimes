<template>
  <f7-page
    class="messages-page"
    @page:init="onPageInit"
  >
    <f7-navbar
      :title="title"
      :subtitle="percent"
      back-link="返回"
    >
    </f7-navbar>

    <f7-block
      class="text-align-center"
      v-if="isLoading"
    >
      <f7-preloader></f7-preloader>
    </f7-block>

    <f7-messages
      class="news-content-list"
    >
      <f7-message
        v-for="(news, index) in bubbleData"
        :key="index"
        :type="news.type"
        :first="isFirstMessage(news, index)"
        :last="isLastMessage(news, index)"
        :tail="isTailMessage(news, index)"
      >
        <div
          slot="text"
          v-html="news.text"
        >
        </div>
        <div
          slot="footer"
          v-if="index < total - 1"
        >
          <a
            href="#"
            @click.once="nextBubble(index + 1, $event)"
            class="message-link"
          >
            Next
          </a>
        </div>
      </f7-message>
    </f7-messages>

  </f7-page>
</template>

<script>
  import {
    f7Navbar,
    f7Page,
    f7Messages,
    f7MessagesTitle,
    f7Message,
    f7Preloader,
    f7Block,
  } from 'framework7-vue';
  import api from '@/api';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Messages,
      f7MessagesTitle,
      f7Message,
      f7Preloader,
      f7Block,
    },

    data() {
      return {
        isLoading: true,
        title: '加载中...',
        newsContent: [],
        bubbleData: [],
        percent: '',
        current: 0,
        total: 0,
      };
    },

    methods: {
      onPageInit() {
        let { title, name } = this.$f7route.query;

        this.$http.get(`${api.content}?name=${name}`)
          .then((res) => {
            if (res.success) {
              this.newsContent = res.data.content.reduce((acc, item) => {
                acc.push({
                  type: 'received',
                  text: item.en,
                });

                acc.push({
                  type: 'sent',
                  text: item.zh,
                });

                return acc;
              }, []);

              this.$nextTick(() => {
                this.total = this.newsContent.length;
                this.nextBubble(0);
              });
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.isLoading = false;
            this.title = title;
          });
      },

      nextBubble(nextIndex, e) {
        this.bubbleData = this.newsContent.slice(0, nextIndex + 1);
        this.current = nextIndex + 1;

        if (e) {
          e.target.className += ' color-gray';
        }
      },

      isFirstMessage(message, index) {
        const self = this;
        const previousMessage = self.newsContent[index - 1];
        if (message.isTitle) return false;
        if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
        return false;
      },

      isLastMessage(message, index) {
        const self = this;
        const nextMessage = self.newsContent[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      },

      isTailMessage(message, index) {
        const self = this;
        const nextMessage = self.newsContent[index + 1];
        if (message.isTitle) return false;
        if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
        return false;
      },
    },

    watch: {
      current(val) {
        this.percent = `${val} / ${this.total}`;
      },
    }
  };
</script>

<style lang="scss">
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
