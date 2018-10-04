<template>
  <f7-list
    media-list
    class="news-list"
  >
    <f7-list-item
      :swipeout="swipeout"
      v-for="(item, index) in data"
      :key="item.url"
      :link="item.link"
    >
      <div
        v-if="item.title" 
        slot="title"
      >
        {{item.title}}
      </div>

      <div 
        v-if="item.summary"
        slot="text"
      >
        {{item.summary}}
      </div>

      <f7-swipeout-actions 
        v-if="swipeout"
        right
      >
        <f7-swipeout-button 
          color="blue"
          close
          @click="onButtonClick(item, index)"
        >
          Save
        </f7-swipeout-button>
      </f7-swipeout-actions>
    </f7-list-item>
  </f7-list>
</template>

<script>
import { 
  f7List,
  f7ListItem,
  f7SwipeoutActions,
  f7SwipeoutButton,
} from "framework7-vue";

export default {
  components: {
    f7List,
    f7ListItem,
    f7SwipeoutActions,
    f7SwipeoutButton,
  },

  extends: f7List,

  data() {
    return {
      
    };
  },

  props: {
    swipeout: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    onButtonClick(item, index) {
      this.$emit('swipeout-button:click', item, index);
    },
  }
};
</script>

<style scoped lang="scss">
</style>
