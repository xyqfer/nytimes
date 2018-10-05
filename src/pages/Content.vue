<template>
  <f7-page
    class="messages-page"
    @page:init="onPageInit">

    <poliwag-navbar 
      :title="title"
      :subtitle="percent"
      back-link="返回">
      <template 
        slot="right" 
        v-if="!isLoading">
        <f7-link
          popover-open=".content-menu"
          icon-md="material:menu">
        </f7-link>
      </template>
    </poliwag-navbar>

    <f7-block
      class="text-align-center"
      v-if="isLoading">
      <f7-preloader></f7-preloader>
    </f7-block>

    <f7-messages class="news-content-list">
      <f7-message
        v-for="(news, index) in bubbleData"
        :key="index"
        :type="news.type"
        :first="true"
        :last="true"
        :tail="true">
        <div 
          slot="name"
          v-if="news.type === 'received'">
          {{news.meta.originIndex + 1}}楼
        </div>
        <div slot="text">
          <template v-if="news.type === 'received'">
            <span
              v-for="(word, index) in news.text.split(' ')"
              :key="index"
              @click="onWordClick">
              {{word}}
            </span>
          </template>
          <template v-else>
            {{news.text}}
          </template>
        </div>
        <div
          slot="footer"
          v-if="index < (total * 2 - 1)">
          <f7-button 
            :href="`/theater?url=${link}&region=${region}&index=${news.meta.originIndex}`" 
            class="message-link"
            :outline="true"
            color="gray"
            v-if="index % 2 === 0">
            Theater
          </f7-button>
          <f7-button
            class="message-link"
            :outline="true"
            color="gray"
            @click.once.native="nextBubble(index + 1, news.type === 'sent' ? news.meta.originIndex + 1 : null, $event)">
            Next
          </f7-button>
        </div>
      </f7-message>

      <f7-message v-if="isTranslating"
        type="received"
        :typing="true"
        :first="true"
        :last="true"
        :tail="true">
      </f7-message>
    </f7-messages>

    <f7-popover class="content-menu">
      <f7-list>
        <f7-list-item
          title="阅读模式"
          popover-close
          :link="`/paper?url=${link}&title=${title}&region=${contentRegion}`">
        </f7-list-item>
      </f7-list>
    </f7-popover>

  </f7-page>
</template>

<script>
import {
  f7Messages,
  f7MessagesTitle,
  f7Message,
  f7Preloader,
  f7Button
} from "framework7-vue";
import http from "@/utils/http";
import api from "@/utils/api";
import mixin from "@/mixin";
const region = "content";

export default {
  components: {
    f7Messages,
    f7MessagesTitle,
    f7Message,
    f7Preloader,
    f7Button
  },

  mixins: [mixin],

  data() {
    return {
      region,
      contentRegion: "",
      isLoading: true,
      title: "加载中...",
      newsContent: [],
      bubbleData: [],
      percent: "",
      current: 0,
      total: 0,
      link: "",
      url: "",
      isTranslating: false,
      translatedText: null
    };
  },

  methods: {
    onPageInit() {
      let { url, region } = this.$f7route.query;

      this.getData({ url, region });
      this.contentRegion = region;
      this.url = url;
      this.link = encodeURIComponent(url);
    },

    getData({ url, region }) {
      let { title } = this.$f7route.query;
      let payload = {
        url,
        region
      };

      return Promise.all([
        this.$store.dispatch(`${this.region}/getContent`, payload),
        this.$store.dispatch(`${this.region}/getProgress`, payload)
      ])
        .then(() => {
          this.initData();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
          this.title = title;
        });
    },

    initData() {
      this.newsContent = this.contentData.reduce((acc, item, index) => {
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
        this.nextBubble(this.progress, Math.floor(this.progress / 2));
      });
    },

    nextBubble(nextIndex, originIndex, e) {
      let newBubbleData = this.newsContent.slice(0, nextIndex + 1);

      if (newBubbleData[nextIndex].text == null) {
        if (this.translatedText) {
          newBubbleData[nextIndex].text = this.translatedText;
          this.bubbleData = this.newsContent.slice(0, nextIndex + 1);
          this.translatedText = null;
        } else {
          this.isTranslating = true;
          this.translate({
            text: newBubbleData[nextIndex - 1].text,
            type: "all"
          })
            .then(text => {
              newBubbleData[nextIndex].text = text;
              this.bubbleData = this.newsContent.slice(0, nextIndex + 1);
            })
            .finally(() => {
              this.isTranslating = false;
            });
        }
      } else {
        this.bubbleData = newBubbleData;
      }

      if (
        nextIndex !== 0 &&
        nextIndex % 2 === 0 &&
        this.newsContent[nextIndex + 1].text == null
      ) {
        this.translate({
          text: newBubbleData[nextIndex].text,
          type: "all"
        })
          .then(text => {
            this.translatedText = text;
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (originIndex != null) {
        this.current = originIndex + 1;
      }

      this.$store.dispatch(`${this.region}/setProgress`, {
        url: this.url,
        region: this.contentRegion,
        progress: nextIndex
      });

      if (e) {
        e.target.classList.add("color-gray");
      }
    },

    onWordClick(e) {
      e.target.classList.toggle("bg-color-yellow");
    },

    translate({ text, type }) {
      return http
        .post({
          url: api.translate,
          data: {
            text,
            type
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

  computed: {
    contentData() {
      return this.$store.state[this.region].contentGroup[
        `/${this.url}/${this.contentRegion}`
      ];
    },

    progress() {
      return this.$store.state[this.region].progressGroup[
        `/${this.url}/${this.contentRegion}`
      ];
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
