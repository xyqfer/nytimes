<template>
  <f7-page
    @page:init="onPageInit"
    class="paper-page"
  >
    <f7-block
      class="text-align-center"
      v-if="isLoading">
      <f7-preloader></f7-preloader>
    </f7-block>

    <f7-block
      class="popup-block-content"
    >
      <h1>{{title}}</h1>
      <p 
        v-for="(item, index) in newsList"
        :key="index"
      >
        <span
          v-for="(word, index) in item.en.split(' ')"
          :key="index"
          @click="onWordClick"
        >
          {{word}}
        </span>
      </p>
    </f7-block>

  </f7-page>
</template>

<script>
import {
  f7View,
  f7Page,
  f7Preloader,
  f7Block,
} from "framework7-vue";
import api from "@/api";
import preference from "@/preference";

export default {
  components: {
    f7View,
    f7Page,
    f7Preloader,
    f7Block,
  },

  data() {
    return {
      title: '',
      newsList: [],
      lfKey: "",
      isLoading: true,
      region: '',
      preference: {},
    };
  },

  methods: {
    onPageInit() {
      let { name, region, title } = this.$f7route.query;
      let lfKey = `/content/${name}/${region}`;

      this.$lf
        .getItem(lfKey)
        .then(data => {
          if (data) {
            this.newsList = data.content;
            this.isLoading = false;
            this.title = title;
          } else {
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.lfKey = lfKey;
      this.region = region;
      this.preference = preference[region];
    },

    getData() {
      let { title, name } = this.$f7route.query;

      this.$http
        .get(`${api[this.preference.api]}?name=${name}`)
        .then(res => {
          if (res.success) {
            this.newsList = res.data.content;
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

    onWordClick(e) {
      e.target.classList.toggle("bg-color-yellow");
    }
  }
};
</script>

<style scoped lang="scss">
  .paper-page {
    background-color: #fff1e5;

    .navbar {
      background-color: #fff1e5;
      color: #000;
    }

    p {
      line-height: 30px;
      margin: 0;
      padding-bottom: 20px;
      color: #333;
      font-family: Georgia, serif;
      font-size: 18px;
      word-wrap: break-word;
    }
  }
</style>
