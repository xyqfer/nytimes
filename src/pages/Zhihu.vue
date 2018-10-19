<template>
  <f7-page
    :infinite="true"
    :infinite-preloader="true"
    @page:init="onPageInit"
    @infinite="onInfinite">

    <poliwag-navbar title="Poliwag × 🐈"></poliwag-navbar>

    <div 
      v-for="(item, index) in content"
      :key="index">
      <div v-html="item.content" class="content-container"></div>  
    </div>

  </f7-page>
</template>

<script>
import { f7Input } from "framework7-vue";
import http from "@/utils/http";
import mixin from "@/mixin";

export default {
  mixins: [mixin],

  data() {
    return {
      p: 1,
      allowInfinite: true,
      sort: "default",
      content: []
    };
  },

  methods: {
    onPageInit() {
      this.getData();
    },

    onInfinite() {
      if (!this.allowInfinite) return;

      this.allowInfinite = false;
      this.getData().then(() => {
        this.allowInfinite = true;
      });
    },

    getData() {
      const { id } = this.$f7route.query;
      return http
        .get(
          `${process.env.VUE_APP_HOST}/api/v1/zhihu/question/${id}?sort=${
            this.sort
          }&page=${this.p}`
        )
        .then(({ success, data }) => {
          if (success) {
            this.content = this.content.concat(data);
            this.p = this.p + 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  /deep/ img,
  /deep/ iframe {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
