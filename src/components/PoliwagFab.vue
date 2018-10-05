<template>
  <f7-fab
    position="right-bottom"
    slot="fixed"
    :href="href ? href : false"
  >
    <f7-icon
      v-for="icon in icons"
      :key="icon"
      :md="`material:${icon}`"
    ></f7-icon>
    <f7-fab-buttons 
      v-if="buttons.length > 0"
      position="top"
    >
      <f7-fab-button
        v-for="button in buttons"
        :key="button.icon"
      >
        <f7-link :href="button.url">
          <f7-icon 
            v-if="button.icon"
            :material="button.icon"
          ></f7-icon>
          <template v-if="button.text">
            {{button.text}}
          </template>
        </f7-link>
      </f7-fab-button>
    </f7-fab-buttons>
  </f7-fab>
</template>

<script>
import {
  f7Fab,
  f7FabButtons,
  f7FabButton,
  f7Icon,
  f7Link
} from "framework7-vue";

export default {
  components: {
    f7Fab,
    f7FabButtons,
    f7FabButton,
    f7Icon,
    f7Link
  },

  extends: f7Fab,

  data() {
    return {};
  },

  props: {
    href: {
      type: String
    },
    icons: {
      type: Array,
      default: () => []
    },
    buttons: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">
</style>
