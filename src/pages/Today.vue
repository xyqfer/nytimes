<template>
  <f7-page
    @page:init="onPageInit"
    :ptr="true"
    @ptr:refresh="onRefresh"
    ref="homePage"
  >
    
    <f7-navbar
      title="Today’s Paper"
      back-link="返回"
    >
    </f7-navbar>

    <f7-list
      media-list
      class="news-list"
    >
      <f7-list-item
        swipeout
        v-for="item in newsList"
        :key="item.url"
        :link="formatLink(item)"
      >
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
        <f7-swipeout-actions right>
          <f7-swipeout-button 
            color="blue"
            close
            @click="savePocket(item)"
          >
            Save
          </f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
import {
  f7View,
  f7Panel,
  f7Page,
  f7Navbar,
  f7NavTitle,
  f7Link,
  f7List,
  f7ListItem,
  f7Icon,
  f7SwipeoutActions,
  f7SwipeoutButton,
} from "framework7-vue";
import mixin from "@/mixin";

export default {
  components: {
    f7View,
    f7Panel,
    f7Page,
    f7Navbar,
    f7NavTitle,
    f7Link,
    f7List,
    f7ListItem,
    f7Icon,
    f7SwipeoutActions,
    f7SwipeoutButton,
  },

  mixins: [mixin],

  data() {
    return {
      newsList: [],
      lfKey: "/list/home/nyt"
    };
  },

  created() {
    this.$lf
      .getItem(this.lfKey)
      .then(data => {
        if (data) {
          this.newsList = data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    onPageInit() {
      this.$nextTick(() => {
        this.$f7.ptr
          .get(this.$refs.homePage.$el.querySelector(".ptr-content"))
          .refresh();
      });
    },

    onRefresh(e, done) {
      this.getData().then(() => {
        done();
      });
    },

    getData() {
      return this.$http
        .get(this.api.today)
        .then(res => {
          if (res.success) {
            this.newsList = res.data;
            this.$lf.setItem(this.lfKey, res.data).catch(err => {
              console.log(err);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    formatLink(item) {
      return `/content2?name=${item.url}&title=${item.title}&region=nyt`;
    },
  }
};
</script>

<style scoped lang="scss">
</style>
