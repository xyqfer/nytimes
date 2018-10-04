<template>
  <f7-page
    @page:init="onPageInit"
    @infinite="onInfinite"
    :infinite-preloader="showPreloader"
    :infinite="true"
  >

    <poliwag-navbar 
      :title="title"
      back-link="返回">
      <template slot="right">
        <f7-link
          popover-open=".page-input"
          icon-md="material:location_searching">
        </f7-link>
      </template>
    </poliwag-navbar>

    <poliwag-list 
      :data="pageData"
      @swipeout-button:click="savePocket">
    </poliwag-list>

    <f7-popover
      class="page-input"
    >
      <f7-list>
        <f7-list-item
          :link="false"
          title="乱序模式"
        >
          <f7-toggle 
            color="blue"
            @toggle:change="onToggleChange"
          ></f7-toggle>
        </f7-list-item>
      </f7-list>
    </f7-popover>

  </f7-page>
</template>

<script>
import { 
  f7Toggle,
} from "framework7-vue";
import mixin from "@/mixin";

export default {
  created() {
    this.name = this.$f7route.params.name;
    this.title = this.$f7route.query.title;
  },

  components: {
    f7Toggle,
  },

  mixins: [mixin],

  data() {
    return {
      region: 'nyt-category',
      name: "",
      title: "",
      p: 1,
      allowInfinite: true,
      showPreloader: true,
      maxPage: 386,
      isRandom: false,
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
      return this.$store.dispatch(`${this.region}/getData`, {
        p: this.p,
        name: this.name
      })
        .then(() => {
          this.p = this.isRandom ? this.getRandomPage() : this.p + 1;
        })
        .catch(err => {
          console.log(err);
        });
    },

    onToggleChange(isRandom) {
      this.isRandom = isRandom;
      this.$store.commit(`${this.region}/reset`);
      this.p = isRandom ? this.getRandomPage() : 1;
      
      if (!this.allowInfinite) return;

      this.allowInfinite = false;
      this.getData().then(() => {
        this.allowInfinite = true;
      });
    },

    getRandomPage() {
      return Math.floor(1 + Math.random() * this.maxPage);
    },
  }
};
</script>
