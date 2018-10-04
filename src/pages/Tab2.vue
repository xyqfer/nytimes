<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    :hide-navbar-on-scroll="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">
  
    <poliwag-navbar></poliwag-navbar>

    <poliwag-tab :current="region"></poliwag-tab>

    <f7-list
      media-list
      class="news-list">
      <f7-list-item
        v-for="item in pageData"
        swipeout
        header=" "
        :key="item.url"
        :link="formatLink(item)">

        <div slot="header" class="text-color-red">
          {{item.flyTitle}}
        </div>
        <div slot="title">
          {{item.title}}
        </div>
        <div slot="text">
          {{item.summary}}
        </div>
        <div slot="footer">
          <img 
            :src="item.img" 
            :alt="item.title"
            class="footer-img">
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

    <poliwag-fab 
      :icons="fabIcons"
      :buttons="fabButtons">
    </poliwag-fab>

  </f7-page>
</template>

<script>
import {
  f7SwipeoutActions,
  f7SwipeoutButton,
} from "framework7-vue";
import mixin from "@/mixin";

export default {
  components: {
    f7SwipeoutActions,
    f7SwipeoutButton,
  },

  mixins: [mixin],

  data() {
    return {
      region: 'te-today',
      fabIcons: ['beach_access', 'close'],
      fabButtons: [
        {
          icon: 'tonality',
          url: '/te-magazine',
        }, {
          icon: 'timelapse',
          url: '/te-gbr',
        }
      ],
    };
  },
};
</script>

<style scoped lang="scss">
  .footer-img {
    display: block;
    width: 100%;
    margin-top: 14px;
  }
</style>