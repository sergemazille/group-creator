<template>
  <form @submit.prevent="submitForm">
    <label for="participant-input" v-text="'Ajouter un participant :'" />

    <input v-model="participantName" id="participant-input" type="text" placeholder="Bob" />
    <button :disabled="!isValidForm" v-text="'+'" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      participantName: '',
    };
  },

  methods: {
    isValidForm() {
      return this.participantName.length;
    },

    submitForm() {
      if (!this.isValidForm()) {
        return;
      }

      this.$emit('new-participant-added', this.participantName);
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
  margin-right: 4px;
}

button {
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 2px 4px;
  font-weight: bold;
  background-color: rgb(58, 148, 31);

  &:disabled {
    margin: 24px;
    background-color: lightgrey;
  }
}
</style>
