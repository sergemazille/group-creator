<template>
  <div class="group-count">
    <label for="group-count" v-text="'Nombre de groupes à créer :'" />
    <input id="group-count" type="number" min="1" step="1" v-model.number="groupCount" @input="handleGroupCountUpdated" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export const DEFAULT_GROUP_COUNT = 3;

export default defineComponent({
  data() {
    return {
      groupCount: DEFAULT_GROUP_COUNT,
    };
  },

  methods: {
    handleGroupCountUpdated() {
      this.$emit('groups-count-updated', this.groupCount);
    },
  },
});
</script>

<style lang="scss" scoped>
label {
  display: block;
  margin-bottom: 4px;
}

input {
  border-radius: 4px;
  height: 1.2rem;
  width: 60px;
}
</style>
