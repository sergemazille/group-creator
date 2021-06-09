<template>
  <div class="participant">
    <span v-text="participant" />
    <button v-text="'-'" @click="handleRemoveButtonClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    participant: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleRemoveButtonClick() {
      this.$emit('participant-removed', this.participant);
    },
  },
});
</script>

<style lang="scss" scoped>
.participant {
  display: flex;
  padding: 4px;
  border-radius: 4px;

  span {
    min-width: 80px;
    margin-right: auto;
  }

  button {
    cursor: pointer;
    color: darkred;
    border: none;
    background-color: #ebd9d9;
    border-radius: 4px;
    padding: 2px 6px;

    &:hover {
      background-color: darkred;
      color: white;
    }
  }

  &:hover {
    background-color: rgb(231, 231, 231);
  }
}
</style>
