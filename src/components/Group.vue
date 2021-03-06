<template>
  <div class="group-wrapper">
    <div class="clipboard">
      <span class="notification" ref="notification">✔</span>
      <button @click="copyParticipants">📋</button>
      <textarea :value="participantsList" ref="participantsList" />
    </div>

    <ul class="group" ref="group">
      <li v-for="participant in group" :key="participant" v-text="participant" />
    </ul>
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
    participantsList(): string {
      return this.group.join('\t');
    },
  },

  methods: {
    copyParticipants() {
      const participantsListEl = this.$refs.participantsList as HTMLInputElement;
      participantsListEl.style.display = 'initial';
      participantsListEl.select();

      try {
        document.execCommand('copy');
        participantsListEl.style.display = 'none';

        const notification = this.$refs.notification as HTMLInputElement;
        notification.classList.add('is-visible');

        setTimeout(() => {
          notification.classList.remove('is-visible');
        }, 2000);
      } catch {
        participantsListEl.style.display = 'none';
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.group-wrapper {
  position: relative;

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

  .clipboard {
    button {
      position: absolute;
      right: 6px;
      top: 6px;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }

    .notification {
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

    textarea {
      display: none;
    }
  }
}
</style>
