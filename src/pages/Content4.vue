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
  f7Block
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
    f7Block
  },

  data() {
    return {
      isLoading: true,
      title: "加载中...",
      newsContent: [],
      bubbleData: [],
      percent: "",
      current: 0,
      total: 0,
      lfKey: "",
      isTranslating: false
    };
  },

  methods: {
    onPageInit() {
      let lfKey = `/content/${this.$f7route.query.name}/nyt`;

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
      this.lfKey = lfKey;
    },

    getData() {
      let { title, name } = this.$f7route.query;

      this.$http
        .get(`${api.teContent2}?name=${name}`)
        .then(res => {
          if (res.success) {
            this.initData(res.data);
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
        this.nextBubble(0);
      });
    },

    nextBubble(nextIndex, e) {
      this.bubbleData = this.bubbleData.concat(
        this.newsContent.slice(nextIndex, nextIndex + 1)
      );
      this.current = nextIndex + 1;

      if (e) {
        e.target.classList.add("color-gray");
      }
    },

    onWordClick(e) {
      e.target.classList.toggle("bg-color-yellow");
    },

    translateText(index, e) {
      const { text } = this.newsContent[index];
      const originIndex = index;

      this.isTranslating = true;
      this.translate(text)
        .then(sentence => {
          let next = originIndex !== this.newsContent.length - 1;

          this.bubbleData.push({
            type: "sent",
            text: sentence,
            meta: {
              next,
              originIndex
            }
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          if (e) {
            e.target.classList.add("color-gray");
          }

          this.isTranslating = false;
        });
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
