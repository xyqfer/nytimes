<template>
  <f7-page
    @page:init="onPageInit"
    class="messages-page"
  >
    <f7-navbar
      :title="title"
      :subtitle="percent"
      back-link="返回"
    >
      <f7-nav-right v-if="!isLoading">
        <f7-link
          popover-open=".page-menu"
          icon-md="material:menu">
        </f7-link>
      </f7-nav-right>
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
        :first="true"
        :last="true"
        :tail="true"
      >
        <div 
          slot="name"
          v-if="news.meta.origin"
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
        >
          <template
            v-if="news.meta.next"
          >
            <a
              href="#"
              @click.once="nextBubble(news.meta.originIndex + 1, $event)"
              class="message-link"
            >
              Next
            </a>
          </template>
          <template
            v-else-if="news.meta.origin"
          >
            <a
              href="#"
              @click.once="translateText(news.meta.originIndex, $event)"
              class="message-link"
            >
              Translate
            </a>
          </template>
        </div>
      </f7-message>
    </f7-messages>

    <f7-message v-if="isTranslating"
      type="received"
      :typing="true"
      :first="true"
      :last="true"
      :tail="true"
    ></f7-message>

    <f7-popover
      ref="pageMenu"
      class="page-menu"
    >
      <f7-list>
        <f7-list-item
          v-if="preference.raw"
          :link="link"
          target="_blank"
          :external="true"
          title="查看原页面"
        >
        </f7-list-item>
      </f7-list>
    </f7-popover>
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
  f7NavRight,
  f7Popover,
  f7List,
  f7ListItem,
  f7Link,
} from "framework7-vue";
import api from "@/api";
import preference from "@/preference";

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Messages,
    f7MessagesTitle,
    f7Message,
    f7Preloader,
    f7Block,
    f7NavRight,
    f7Popover,
    f7List,
    f7ListItem,
    f7Link,
  },

  data() {
    return {
      link: '',
      isLoading: true,
      title: "加载中...",
      newsContent: [],
      bubbleData: [],
      percent: "",
      current: 0,
      total: 0,
      lfKey: "",
      progressKey: '',
      progressIndex: 0,
      isTranslating: false,
      region: '',
      preference: {},
      translatedText: null,
    };
  },

  methods: {
    onPageInit() {
      let { name, region } = this.$f7route.query;
      let lfKey = `/content/${name}/${region}`;
      let progressKey = `/progress/${name}/${region}`;

      this.$lf
        .getItem(progressKey)
        .then(data => {
          if (data) {
            this.progressIndex = data;
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.$lf
        .getItem(lfKey)
        .then(data => {
          if (data) {
            this.initData(data);
            this.isLoading = false;
            this.title = this.$f7route.query.title;
          } else {
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.link = name;
      this.lfKey = lfKey;
      this.progressKey = progressKey;
      this.region = region;
      this.preference = preference[region];
    },

    getData() {
      let { title, name } = this.$f7route.query;

      this.$http
        .get(`${api[this.preference.api]}?name=${name}`)
        .then(res => {
          if (res.success) {
            this.initData(res.data);

            if (this.preference.cache) {
              this.$lf.setItem(this.lfKey, res.data).catch(err => {
                console.log(err);
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
          this.title = title;
        });
    },

    initData(data) {
      this.newsContent = data.content.reduce((acc, item, index) => {
        acc.push({
          type: "received",
          text: item.en,
          meta: {
            originIndex: index,
            origin: true
          }
        });

        return acc;
      }, []);

      this.$nextTick(() => {
        this.total = this.newsContent.length;
        this.nextBubble(this.preference.cache ? this.progressIndex : 0);
      });
    },

    nextBubble(nextIndex, e) {
      this.bubbleData = this.bubbleData.concat(
        this.newsContent.slice(nextIndex, nextIndex + 1)
      );
      this.current = nextIndex + 1;

      this.progressIndex = nextIndex;
      this.$lf.setItem(this.progressKey, nextIndex).catch(err => {
        console.log(err);
      });

      if (e) {
        e.target.classList.add("color-gray");
      }

      this.translate(this.newsContent[nextIndex].text)
        .then(sentence => {
          this.translatedText = sentence;

          if (this.isTranslating) {
            this.$nextTick(() => {
              this.translateText(nextIndex);
            });
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.$nextTick(() => {
            this.isTranslating = false;
          });
        });
    },

    onWordClick(e) {
      e.target.classList.toggle("bg-color-yellow");
    },

    translateText(index, e) {
      const originIndex = index;
      let next = index !== this.newsContent.length - 1;

      if (this.translatedText) {
        this.bubbleData.push({
          type: "sent",
          text: this.translatedText,
          meta: {
            next,
            originIndex
          }
        });
        this.translatedText = null;
      } else {
        this.isTranslating = true;
      }
    },

    translate(text) {
      return this.$http
        .post({
          url: api.translate,
          data: {
            text
          }
        })
        .then(res => {
          if (res.success) {
            return res.data.text;
          } else {
            return "";
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
