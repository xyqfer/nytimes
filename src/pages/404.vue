<template>
  <f7-page>
    <f7-navbar title="Not found" backLink="返回"></f7-navbar>
    <f7-block strong>
      <p>Sorry</p>
      <p>Page not found.</p>
    </f7-block>
  </f7-page>
</template>

<script>
import { f7Page, f7Navbar, f7Block } from "framework7-vue";
export default {
  components: {
    f7Page,
    f7Navbar,
    f7Block
  }
};
</script>
