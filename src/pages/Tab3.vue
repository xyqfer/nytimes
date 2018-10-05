<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    :hide-navbar-on-scroll="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">

    <poliwag-navbar>
      <template slot="right">
        <f7-link
          popover-open=".search-input"
          icon-md="material:voicemail">
        </f7-link>
      </template>
    </poliwag-navbar>

    <poliwag-tab :current="region"></poliwag-tab>

    <poliwag-list 
      :data="pageData"
      @swipeout-button:click="savePocket">
    </poliwag-list>

    <poliwag-fab 
      :icons="fabIcons"
      :buttons="fabButtons">
    </poliwag-fab>

    <f7-popover
      ref="searchInput"
      class="search-input"
    >
      <f7-list>
        <f7-list-item
          :link="false"
          title="搜索"
        >
          <f7-input
            type="text"
            @keyup.enter.native="onFly"
            placeholder="请输入地址"
            clear-button
          >
          </f7-input>
        </f7-list-item>
      </f7-list>
    </f7-popover>

  </f7-page>
</template>

<script>
import { f7Input } from "framework7-vue";
import mixin from "@/mixin";

export default {
  components: {
    f7Input
  },

  mixins: [mixin],

  data() {
    return {
      region: "wanqu",
      fabIcons: ["adjust", "close"],
      fabButtons: [
        {
          text: "随机",
          url: "/wanqu-random"
        },
        {
          text: "热门",
          url: "/wanqu-hot"
        }
      ]
    };
  },

  methods: {
    onFly(e) {
      let url = e.target.value;
      this.$refs.searchInput.f7Popover.close();

      this.$f7router.navigate(
        `/content?url=${encodeURIComponent(url)}&title=&region=crawl`
      );
    },

    formatLink(item) {
      return `/content?url=${encodeURIComponent(item.url)}&title=${item.title ||
        ""}&region=crawl`;
    }
  }
};
</script>
