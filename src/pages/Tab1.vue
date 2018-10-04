<template>
  <f7-page
    :ref="pageRef"
    :ptr="true"
    :hide-navbar-on-scroll="true"
    @page:init="onPageInit"
    @ptr:refresh="onRefresh">

    <poliwag-navbar>
      <template slot="left">
        <f7-link
          icon-md="material:menu"
          panel-open="left">
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

  </f7-page>
</template>

<script>
import mixin from "@/mixin";
const region = 'nyt-cn';

export default {
  mixins: [mixin],

  data() {
    return {
      region,
      pageRef: `ref-${region}`,
      fabIcons: ['adb', 'close'],
      fabButtons: [
        {
          icon: "cloud_circle",
          url: "/nyt-book"
        },
        {
          icon: "av_timer",
          url: "/nyt-today"
        }
      ]
    };
  },
};
</script>
