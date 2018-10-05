<template>
  <f7-page
    :infinite="true"
    :infinite-preloader="showPreloader"
    :hide-navbar-on-scroll="true"
    @page:init="onPageInit"
    @infinite="onInfinite">

    <poliwag-navbar>
      <template slot="right">
        <f7-link
          popover-open=".page-input2"
          icon-md="material:location_searching">
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
      ref="pageInput"
      class="page-input2"
    >
      <f7-list>
        <f7-list-item
          :link="false"
          title="页码"
        >
          <f7-input
            type="number"
            @keyup.enter.native="jumpPage"
            placeholder="1~175"
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
      region: "i21st",
      p: 1,
      allowInfinite: true,
      showPreloader: true,
      fabIcons: ["palette", "close"],
      fabButtons: [
        {
          icon: "tonality",
          url: "/times"
        },
        {
          icon: "timelapse",
          url: "/subtitle"
        }
      ]
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
        this.showPreloader = this.allowInfinite = !(this.p > this.total);
      });
    },

    getData() {
      return this.$store
        .dispatch(`${this.region}/getData`, {
          p: this.p
        })
        .then(() => {
          this.p = this.p + 1;
        })
        .catch(err => {
          console.log(err);
        });
    },

    jumpPage(e) {
      let page = +e.target.value;

      this.$refs.pageInput.f7Popover.close();
      this.p = page;
      this.$store.commit(`${this.region}/reset`);
      this.getData();
    }
  }
};
</script>
