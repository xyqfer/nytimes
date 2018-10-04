<template>
  <f7-page
    class="messages-page"
    @page:init="onPageInit">

    <poliwag-navbar 
      :title="title"
      back-link="返回">
      <template 
        slot="right" 
        v-if="!isLoading">
        <f7-link
          popover-open=".page-menu1"
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
          <f7-link 
            :href="`/content3?name=${link}&region=${region}&index=${news.meta.originIndex}`" 
            class="message-link"
            v-if="index % 2 === 0"
          >
            Theater
          </f7-link>
          <f7-link
            href="#"
            @click.once.native="nextBubble(index + 1, news.type === 'sent' ? news.meta.originIndex + 1 : null, $event)"
            class="message-link"
          >
            Next
          </f7-link>
        </div>
      </f7-message>
    </f7-messages>

    <f7-popover
      class="page-menu1"
    >
      <f7-list>
        <f7-list-item
          :link="`/paper?name=${link}&title=${title}&region=${region}`"
          title="阅读模式"
          popover-close
        >
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
} from "framework7-vue";
import mixin from "@/mixin";

export default {
  components: {
    f7Messages,
    f7MessagesTitle,
    f7Message,
    f7Preloader,
  },

  mixins: [mixin],

  data() {
    return {
      region: 'content',
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
      region: '',
      link: '',
    };
  },

  methods: {
    onPageInit() {
      let { url, region } = this.$f7route.query;
      let lfKey = `/content/${url}/${region}`;
      let progressKey = `/progress/${url}/${region}`;

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

      this.lfKey = lfKey;
      this.progressKey = progressKey;
      this.region = region;
      this.link = encodeURIComponent(name);
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
        this.nextBubble(this.progressIndex, Math.floor(this.progressIndex / 2));
      });
    },

    nextBubble(nextIndex, originIndex, e) {
      this.bubbleData = this.newsContent.slice(0, nextIndex + 1);

      if (originIndex != null) {
        this.current = originIndex + 1;
      }

      this.progressIndex = nextIndex;
      this.$lf.setItem(this.progressKey, nextIndex).catch(err => {
        console.log(err);
      });

      if (e) {
        e.target.classList.add("color-gray");
      }
    },

    onWordClick(e) {
      e.target.classList.toggle("bg-color-yellow");
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
