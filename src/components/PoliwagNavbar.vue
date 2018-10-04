<template>
  <f7-navbar
    :back-link="backLink ? backLink : false"
  >
    <f7-nav-left>
      <slot name="left"></slot>
    </f7-nav-left>
    <f7-nav-title>{{title}}</f7-nav-title>
    <f7-nav-right>
      <slot name="right"></slot>
    </f7-nav-right>
  </f7-navbar>
</template>

<script>
import { 
  f7Navbar,
  f7NavTitle,
  f7NavLeft,
  f7NavRight,
} from "framework7-vue";

export default {
  components: {
    f7Navbar,
    f7NavTitle,
    f7NavLeft,
    f7NavRight,
  },

  extends: f7Navbar,

  data() {
    return {
      
    };
  },

  props: {
    title: {
      type: String,
      default: 'Poliwag × 🌀',
    },
    backLink: {
      type: String,
    }
  }
};
</script>

<style scoped lang="scss">
</style>
