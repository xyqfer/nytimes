<template>
  <f7-page
    @page:init="onPageInit">

    <poliwag-navbar></poliwag-navbar>

    <poliwag-tab :current="region"></poliwag-tab>

    <f7-list
      media-list
      class="news-list"
    >
      <f7-list-item
        swipeout
        v-for="(item, index) in pageData"
        :key="`${item.url}-${index}`"
        :link="item.url"
        @swipeout:deleted="deletePocket(index)"
      >
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
        <f7-swipeout-actions right>
          <f7-swipeout-button 
            delete
          >
            Delete
          </f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
import { f7SwipeoutActions, f7SwipeoutButton } from "framework7-vue";
import mixin from "@/mixin";

export default {
  components: {
    f7SwipeoutActions,
    f7SwipeoutButton
  },

  mixins: [mixin],

  data() {
    return {
      region: "pocket",
      pockList: []
    };
  },

  methods: {
    onPageInit() {
      this.getData();
    },

    getData() {
      return this.$store
        .dispatch(`${this.region}/getData`)
        .then(pockList => {
          if (pockList) {
            this.pockList = [...pockList];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    deletePocket(index) {
      let pockIndex = this.pockList.findIndex(item => {
        return item.url === this.pockList[index].url;
      });
      this.pockList.splice(pockIndex, 1);

      this.$nextTick(() => {
        this.$store
          .dispatch(`${this.region}/updateData`, this.pockList)
          .then(() => {
            this.showNotification("Deleted");
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>
