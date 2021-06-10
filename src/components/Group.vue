<template>
  <ul class="group">
    <li v-for="participant in group" :key="participant" v-text="participant" />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    group: {
      type: Array,
      default: [] as string[],
    },
  },
});
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;

  &.group {
    margin-left: 60px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    width: 200px;
  }

  li {
    margin-bottom: 2px;
  }

  @media screen and (max-width: 575px) {
    margin-left: 0;
    width: auto;
  }
}
</style>
