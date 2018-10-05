<template>
  <f7-page
    @page:init="onPageInit"
    class="messages-page"
  >
    <f7-navbar
      back-link="返回"
    >
      <f7-nav-title>
        Theater <f7-preloader v-if="isLoading" color="white" :size="20"></f7-preloader>
      </f7-nav-title>
      <f7-nav-right style="font-size: 14px;margin-right: 16px;">
        {{percent}}
      </f7-nav-right>
    </f7-navbar>

    <f7-messages
      class="news-content-list"
    >
      <f7-message
        v-for="(news, index) in bubbleData"
        :key="index"
        :type="news.type"
        :first="true"
        :last="true"
        :tail="true"
      >
        <div 
          slot="name"
          v-if="news.type === 'received'"
        >
          {{news.meta.originIndex + 1}}楼
        </div>
        <div
          slot="text"
        >
          <template v-if="news.type === 'received'">
            <span
              v-for="(word, index) in news.text.split(' ')"
              :key="index"
              @click="onWordClick"
            >
              {{word}}
            </span>
          </template>
          <template v-else>
            {{news.text}}
          </template>
        </div>
        <div
          slot="footer"
          v-if="index < (total * 2 - 1)"
          class="display-flex justify-content-space-between align-items-flex-end"
        >
          <div v-if="news.type === 'received'"></div>
          <a
            href="#"
            @click.once="nextBubble(index + 1, news.type === 'sent' ? news.meta.originIndex + 1 : null, $event)"
            class="message-link"
          >
            Next
          </a>
          <div v-if="news.type === 'sent'"></div>
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
  f7List,
  f7ListItem,
  f7Link,
  f7NavTitle,
  f7NavRight
} from "framework7-vue";
import api from "@/api";

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Messages,
    f7MessagesTitle,
    f7Message,
    f7Preloader,
    f7Block,
    f7List,
    f7ListItem,
    f7Link,
    f7NavTitle,
    f7NavRight
  },

  data() {
    return {
      link: "",
      isLoading: true,
      newsContent: [],
      bubbleData: [],
      percent: "",
      current: 0,
      total: 0,
      lfKey: "",
      index: -1,
      progressIndex: 0,
      region: "",
      paragraph: "",
      preference: {},
      translatedText: null
    };
  },

  methods: {
    onPageInit() {
      let { name, region, index } = this.$f7route.query;
      let lfKey = `/content/${name}/${region}`;

      this.$lf
        .getItem(lfKey)
        .then(data => {
          if (data) {
            this.initData(data);
          } else {
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.link = name;
      this.index = index;
      this.lfKey = lfKey;
      this.region = region;
    },

    getData() {
      let { name } = this.$f7route.query;

      this.$http
        .get(`${api[this.preference.api]}?name=${name}`)
        .then(res => {
          if (res.success) {
            this.initData(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    initData(data) {
      this.translate(data.content[this.index].en)
        .then(resp => {
          this.newsContent = resp.content.reduce((acc, item, index) => {
            acc.push({
              type: "received",
              text: item.en,
              meta: {
                originIndex: index
              }
            });

            acc.push({
              type: "sent",
              text: item.zh,
              meta: {
                originIndex: index
              }
            });

            return acc;
          }, []);

          this.$nextTick(() => {
            this.total = this.newsContent.length / 2;
            this.nextBubble(0, 0);
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    nextBubble(nextIndex, originIndex, e) {
      this.bubbleData = this.newsContent.slice(0, nextIndex + 1);

      if (originIndex != null) {
        this.current = originIndex + 1;
      }

      this.progressIndex = nextIndex;

      if (e) {
        e.target.classList.add("color-gray");
      }
    },

    onWordClick(e) {
      e.target.classList.toggle("bg-color-yellow");
    },

    translate(text) {
      return this.$http
        .post({
          url: api.translate2,
          data: {
            text
          }
        })
        .then(res => {
          if (res.success) {
            return res.data;
          } else {
            return {};
          }
        })
        .catch(err => {
          console.log(err);
          return "";
        });
    }
  },

  watch: {
    current(val) {
      this.percent = `${val} / ${this.total}`;
    }
  }
};
</script>

<style lang="scss">
</style>
