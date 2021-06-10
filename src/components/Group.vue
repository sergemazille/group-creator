<template>
  <div class="group-wrapper">
    <span class="toaster" ref="toaster">✔</span>
    <button @click="copyParticipants">📋</button>
    <ul class="group" ref="group">
      <li v-for="participant in group" :key="participant" v-text="participant" />
    </ul>

    <textarea style="display: none" :value="groupContent" ref="groupContent" />
  </div>
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

  computed: {
    groupContent(): string {
      return this.group.join('\t');
    },
  },

  methods: {
    copyParticipants() {
      const groupContent = this.$refs.groupContent as HTMLInputElement;
      groupContent.style.display = 'initial';
      groupContent.select();

      try {
        document.execCommand('copy');
        groupContent.style.display = 'none';

        const toaster = this.$refs.toaster as HTMLInputElement;
        toaster.classList.add('is-visible');
        setTimeout(() => {
          toaster.classList.remove('is-visible');
        }, 2000);
      } catch {
        groupContent.style.display = 'none';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.group-wrapper {
  position: relative;

  button {
    position: absolute;
    right: 6px;
    top: 6px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

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

      input {
        border: none;
      }
    }

    @media screen and (max-width: 575px) {
      margin-left: 0;
      width: auto;
    }
  }

  .toaster {
    opacity: 0;
    position: fixed;
    top: 24px;
    right: 24px;
    border: 3px solid grey;
    background-color: rgb(71, 192, 71);
    border-radius: 4px;
    padding: 12px;
    font-size: 24px;
    color: white;
    transition: opacity 0.3s ease-in-out;

    &.is-visible {
      opacity: 1;
    }
  }
}
</style>
